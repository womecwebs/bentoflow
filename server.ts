import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import serverless from "serverless-http";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

import crypto from "crypto";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

dotenv.config();

const app = express();

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window as any);

const PROJECTS_DIR = path.join(process.cwd(), "user_projects");

// Middleware to sanitize inputs
const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = DOMPurify.sanitize(req.body[key]);
      }
    });
  }
  next();
};

// Ensure projects directory exists
async function ensureProjectsDir() {
  try {
    await fs.access(PROJECTS_DIR);
  } catch {
    await fs.mkdir(PROJECTS_DIR, { recursive: true });
  }
}
ensureProjectsDir();

// Initialize Supabase Admin Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

// Helper to check if a key is a placeholder or empty
const isValidKey = (key: string) =>
  key && key.length > 20 && key.startsWith("eyJ");

if (!supabaseUrl || !isValidKey(supabaseServiceKey)) {
  console.warn(
    "⚠️ Supabase credentials missing or invalid in server.ts. Database features will be limited.",
  );
}

const supabase = createClient(
  supabaseUrl,
  isValidKey(supabaseServiceKey)
    ? supabaseServiceKey
    : "invalid-key-placeholder",
);

// Middleware to verify Supabase Auth Token
const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!supabaseUrl || !isValidKey(supabaseServiceKey)) {
    console.warn(
      "⚠️ Supabase credentials missing. Using mock user for development.",
    );
    (req as any).user = {
      id: "00000000-0000-0000-0000-000000000000",
      email: "demo@example.com",
    };
    return next();
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    (req as any).user = user;
    next();
  } catch (err) {
    console.error("Auth verification failed:", err);
    return res
      .status(401)
      .json({ error: "Authentication service unavailable" });
  }
};

async function startServer() {
  const PORT = 3000;

  app.use(express.json());
  app.use(sanitizeMiddleware);

  // Security Headers (Clickjacking & XSS)
  app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // API: Project Persistence
  app.get("/api/projects", authenticateUser, async (req, res) => {
    const userId = (req as any).user.id;
    const userDir = path.join(PROJECTS_DIR, userId);

    try {
      await fs.access(userDir);
      const files = await fs.readdir(userDir);
      const projects = await Promise.all(
        files
          .filter((f) => f.endsWith(".json"))
          .map(async (f) => {
            const content = await fs.readFile(path.join(userDir, f), "utf-8");
            const data = JSON.parse(content);
            return {
              id: f.replace(".json", ""),
              name: data.name,
              description: data.description,
              updatedAt: (await fs.stat(path.join(userDir, f))).mtime,
            };
          }),
      );
      res.json(projects);
    } catch {
      res.json([]);
    }
  });

  app.get("/api/projects/:id", authenticateUser, async (req, res) => {
    const userId = (req as any).user.id;
    const projectId = req.params.id;
    const filePath = path.join(PROJECTS_DIR, userId, `${projectId}.json`);

    try {
      const content = await fs.readFile(filePath, "utf-8");
      res.json(JSON.parse(content));
    } catch {
      res.status(404).json({ error: "Project not found" });
    }
  });

  app.post("/api/projects", authenticateUser, async (req, res) => {
    const userId = (req as any).user.id;
    const project = req.body;
    const projectId = project.id || Date.now().toString();
    const userDir = path.join(PROJECTS_DIR, userId);

    try {
      // Check 2-site limit for non-pro users
      if (supabaseUrl && isValidKey(supabaseServiceKey)) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("sites_created, is_pro")
          .eq("id", userId)
          .single();

        if (profile && profile.sites_created >= 2 && !profile.is_pro) {
          return res.status(403).json({
            error: "Limit reached",
            message:
              "You have reached the limit of 2 websites for free accounts. Please upgrade to Pro to create more.",
          });
        }
      }

      await fs.mkdir(userDir, { recursive: true });
      const filePath = path.join(userDir, `${projectId}.json`);
      await fs.writeFile(
        filePath,
        JSON.stringify({ ...project, id: projectId }, null, 2),
      );
      res.json({ success: true, id: projectId });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to save project" });
    }
  });

  app.delete("/api/projects/:id", authenticateUser, async (req, res) => {
    const userId = (req as any).user.id;
    const projectId = req.params.id;
    const filePath = path.join(PROJECTS_DIR, userId, `${projectId}.json`);

    try {
      await fs.unlink(filePath);
      res.json({ success: true });
    } catch {
      res.status(404).json({ error: "Project not found" });
    }
  });

  // API: GitHub Sync Placeholder
  app.post("/api/github/sync", authenticateUser, async (req, res) => {
    // In a real app, this would use GitHub API with user's OAuth token
    res.json({
      success: true,
      message: "Project synced to GitHub (Simulated)",
    });
  });

  // API: Real ClickPesa Payment for Marketplace Templates
  // app.post("/api/payments/clickpesa", authenticateUser, async (req, res) => {
  //   const { itemId, amount } = req.body;
  //   const userId = (req as any).user.id;
  //   const userEmail = (req as any).user.email;

  //   if (!userId || !itemId) {
  //     return res.status(400).json({
  //       success: false,
  //       error: "Missing user_id or item_id. Please ensure you are logged in.",
  //     });
  //   }

  //   try {
  //     const clientId = process.env.CLICKPESA_CLIENT_ID;
  //     const apiKey = process.env.CLICKPESA_API_KEY;
  //     const environment = process.env.CLICKPESA_ENVIRONMENT || "sandbox";
  //     const appUrl = process.env.APP_URL || "http://localhost:3000";

  //     const CLICKPESA_BASE_URL =
  //       environment === "production"
  //         ? "https://api.clickpesa.com"
  //         : "https://api.sandbox.clickpesa.com";

  //     if (!clientId || !apiKey) {
  //       return res.status(400).json({
  //         error:
  //           "ClickPesa API credentials missing. Enable them in your .env file.",
  //       });
  //     }

  //     // 1. Create a real Checkout Link
  //     const response = await axios.post(
  //       `${CLICKPESA_BASE_URL}/v1/checkout/links`,
  //       {
  //         client_id: clientId,
  //         amount: amount || 10.0,
  //         currency: "USD",
  //         description: `BentoFlow Template Purchase: ${itemId}`,
  //         allowed_methods: ["card", "mobile_money", "bank_transfer"],
  //         return_url: `${appUrl}/marketplace?payment=success`,
  //         cancel_url: `${appUrl}/marketplace`,
  //         webhook_url: `${appUrl}/api/webhooks/clickpesa`,
  //         metadata: {
  //           userId,
  //           templateId: itemId, // This is crucial for the webhook to know what was bought
  //           type: "template_purchase",
  //           email: userEmail,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${apiKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     const checkoutUrl =
  //       response.data?.hosted_checkout_url ||
  //       response.data?.checkout_url ||
  //       response.data?.url;

  //     if (!checkoutUrl) {
  //       throw new Error("ClickPesa failed to return a checkout URL.");
  //     }

  //     // 2. Return the URL to the frontend. DO NOT insert into Supabase here.
  //     res.json({
  //       success: true,
  //       checkout_url: checkoutUrl,
  //     });
  //   } catch (error: any) {
  //     // THIS IS THE MOST IMPORTANT LOG
  //     console.error("--- CLICKPESA ERROR DETAIL ---");
  //     console.error("Status:", error.response?.status);
  //     console.error("Data:", JSON.stringify(error.response?.data, null, 2));
  //     console.error("Message:", error.message);

  //     res.status(500).json({
  //       success: false,
  //       error:
  //         error.response?.data?.message || "Failed to connect to ClickPesa.",
  //     });
  //   }
  // });
  // app.post("/api/payments/clickpesa", authenticateUser, async (req, res) => {
  //   try {
  //     const { itemId, amount } = req.body;
  //     const userId = (req as any).user.id;
  //     const userEmail = (req as any).user.email;

  //     if (!itemId) {
  //       return res.status(400).json({ error: "Item ID is required" });
  //     }

  //     // 1. Determine Environment
  //     const isSandbox = process.env.CLICKPESA_ENVIRONMENT !== "production";
  //     const CLICKPESA_BASE_URL = isSandbox
  //       ? "https://api.sandbox.clickpesa.com"
  //       : "https://api.clickpesa.com";

  //     const clientId = process.env.CLICKPESA_CLIENT_ID;
  //     const apiKey = process.env.CLICKPESA_API_KEY;
  //     const appUrl = process.env.VITE_APP_URL || "http://localhost:3000"; // Use frontend URL

  //     // 2. Validate Credentials locally before calling API
  //     if (!clientId || !apiKey) {
  //       console.error("CRITICAL: ClickPesa Credentials missing in .env");
  //       return res
  //         .status(500)
  //         .json({ error: "Payment gateway not configured" });
  //     }

  //     console.log(
  //       `Initiating ${isSandbox ? "SANDBOX" : "PROD"} payment for ${itemId}...`,
  //     );

  //     // 3. Call ClickPesa
  //     const response = await axios.post(
  //       `${CLICKPESA_BASE_URL}/v1/checkout/links`,
  //       {
  //         client_id: clientId,
  //         amount: Number(amount) || 1.0, // Ensure amount is a number
  //         currency: "USD", // Change to TZS if your account is TZS-only
  //         description: `Template Purchase: ${itemId}`,
  //         allowed_methods: ["card", "mobile_money"],
  //         return_url: `${appUrl}/marketplace?payment=success`,
  //         cancel_url: `${appUrl}/marketplace`,
  //         webhook_url: `${appUrl}/api/webhooks/clickpesa`,
  //         metadata: {
  //           userId,
  //           templateId: itemId,
  //           email: userEmail,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${apiKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     // Log this to your terminal so you can see exactly what ClickPesa sends
  //     console.log("ClickPesa Response Data:", response.data);

  //     res.json({
  //       success: true,
  //       checkout_url: response.data.url || response.data.checkout_url,
  //     });
  //   } catch (error: any) {
  //     // THIS IS THE KEY: Look at your terminal/console for this output!
  //     console.error("--- CLICKPESA API ERROR ---");
  //     if (error.response) {
  //       console.error("Status:", error.response.status);
  //       console.error("Data:", JSON.stringify(error.response.data, null, 2));
  //     } else {
  //       console.error("Message:", error.message);
  //     }
  //     console.error("---------------------------");

  //     res.status(500).json({
  //       success: false,
  //       error:
  //         error.response?.data?.message || "Failed to connect to ClickPesa.",
  //     });
  //   }
  // });
  // --- REPLACE YOUR EXISTING /api/payments/clickpesa ROUTE WITH THIS ---
  // app.post("/api/payments/clickpesa", authenticateUser, async (req, res) => {
  //   try {
  //     const { itemId, amount, currency } = req.body;
  //     const userId = (req as any).user.id;
  //     const userEmail = (req as any).user.email;

  //     if (!itemId) {
  //       return res.status(400).json({ error: "Item ID is required" });
  //     }

  //     const isSandbox = process.env.CLICKPESA_ENVIRONMENT !== "production";
  //     const CLICKPESA_BASE_URL = isSandbox
  //       ? "https://api.sandbox.clickpesa.com"
  //       : "https://api.clickpesa.com";

  //     const clientId = process.env.CLICKPESA_CLIENT_ID;
  //     const apiKey = process.env.CLICKPESA_API_KEY;
  //     const appUrl = process.env.VITE_APP_URL || "http://localhost:3000";

  //     if (!clientId || !apiKey) {
  //       return res
  //         .status(500)
  //         .json({ error: "ClickPesa keys missing in .env" });
  //     }

  //     console.log(
  //       `[ClickPesa] Creating checkout for ${itemId} (${isSandbox ? "SANDBOX" : "PROD"})`,
  //     );

  //     const response = await axios.post(
  //       `${CLICKPESA_BASE_URL}/v1/checkout/links`,
  //       {
  //         client_id: clientId,
  //         amount: Number(amount) || 1.0,
  //         currency: currency || "USD",
  //         description: `Template Purchase: ${itemId}`,
  //         allowed_methods: ["card", "mobile_money"],
  //         return_url: `${appUrl}/marketplace?payment=success`,
  //         cancel_url: `${appUrl}/marketplace`,
  //         webhook_url: `${appUrl}/api/webhooks/clickpesa`,
  //         metadata: {
  //           userId,
  //           templateId: itemId,
  //           email: userEmail,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${apiKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     // --- CRITICAL FIX: EXTRACING THE URL ---
  //     // We check every possible field where ClickPesa might hide the link
  //     const checkoutUrl =
  //       response.data.url ||
  //       response.data.checkout_url ||
  //       (response.data.data ? response.data.data.url : null) ||
  //       response.data.hosted_checkout_url;

  //     if (!checkoutUrl) {
  //       console.error("--- CLICKPESA MISSING URL ERROR ---");
  //       console.log(
  //         "Full Response from ClickPesa:",
  //         JSON.stringify(response.data, null, 2),
  //       );
  //       return res.status(500).json({
  //         success: true, // The API call worked
  //         error:
  //           "API succeeded but no URL was found in response. Check server logs.",
  //       });
  //     }

  //     console.log("Checkout URL generated successfully:", checkoutUrl);

  //     res.json({
  //       success: true,
  //       checkout_url: checkoutUrl,
  //     });
  //   } catch (error: any) {
  //     console.error("--- CLICKPESA API ERROR ---");
  //     if (error.response) {
  //       console.error("Data:", JSON.stringify(error.response.data, null, 2));
  //     } else {
  //       console.error("Message:", error.message);
  //     }
  //     res.status(500).json({
  //       success: false,
  //       error:
  //         error.response?.data?.message || "Failed to connect to ClickPesa.",
  //     });
  //   }
  // });

  app.post("/api/payments/clickpesa", authenticateUser, async (req, res) => {
    const { itemId, amount, currency } = req.body;
    const userId = (req as any).user.id;
    const userEmail = (req as any).user.email;

    // Manually clean the environment string
    const env = (process.env.CLICKPESA_ENVIRONMENT || "sandbox")
      .trim()
      .toLowerCase();

    // Hardcode the URLs directly to avoid any concatenation errors
    const finalUrl =
      env === "production"
        ? "https://api.clickpesa.com/v1/checkout/links"
        : "https://api.sandbox.clickpesa.com/v1/checkout/links";

    console.log(`[ClickPesa] DEBUG - Target URL: "${finalUrl}"`);
    console.log(`[ClickPesa] DEBUG - Environment detected: "${env}"`);

    try {
      const response = await axios({
        method: "post",
        url: finalUrl,
        data: {
          client_id: process.env.CLICKPESA_CLIENT_ID?.trim(),
          amount: Number(amount),
          currency: currency || "TZS",
          description: `Template Purchase: ${itemId}`,
          allowed_methods: ["card", "mobile_money"],
          return_url: `${process.env.VITE_APP_URL}/marketplace?payment=success`,
          cancel_url: `${process.env.VITE_APP_URL}/marketplace`,
          metadata: {
            userId: String(userId),
            templateId: String(itemId),
            email: userEmail,
          },
        },
        headers: {
          // Ensure "Bearer " has exactly one space and no extra characters
          Authorization: `Bearer ${process.env.CLICKPESA_API_KEY?.trim()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // ... rest of your response handling code

      // Extract the checkout URL from the response
      const checkoutUrl = response.data?.url || response.data?.checkout_url;

      if (checkoutUrl) {
        return res.json({ success: true, checkout_url: checkoutUrl });
      } else {
        console.error("--- DATA RECEIVED BUT NO URL ---", response.data);
        return res.status(500).json({
          success: false,
          error:
            "API returned status OK but no checkout link. Check API permissions.",
        });
      }
    } catch (error: any) {
      console.error(
        "[ClickPesa] API Error:",
        error.response?.data || error.message,
      );
      return res
        .status(500)
        .json({ success: false, error: "Payment initialization failed" });
    }
  });

  // API: Initiate Pro Upgrade Payment via ClickPesa
  app.post("/api/payments/upgrade-pro", authenticateUser, async (req, res) => {
    const userId = (req as any).user.id;
    const userEmail = (req as any).user.email;

    try {
      const clientId = process.env.CLICKPESA_CLIENT_ID;
      const apiKey = process.env.CLICKPESA_API_KEY;
      const environment = process.env.CLICKPESA_ENVIRONMENT || "sandbox";
      const appUrl = process.env.APP_URL || "http://localhost:3000";

      const CLICKPESA_BASE_URL =
        environment === "production"
          ? "https://api.clickpesa.com"
          : "https://api.sandbox.clickpesa.com";

      if (!clientId || !apiKey) {
        return res.status(400).json({
          error:
            "ClickPesa API credentials (CLICKPESA_CLIENT_ID or CLICKPESA_API_KEY) are missing. Please add them to the 'Secrets' panel in AI Studio to enable real payments.",
        });
      }

      // Call ClickPesa Checkout Link API
      const response = await axios.post(
        `${CLICKPESA_BASE_URL}/v1/checkout/links`,
        {
          client_id: clientId,
          amount: 15.0,
          currency: "USD",
          description: `BentoFlow Pro Lifetime Upgrade for ${userEmail}`,
          return_url: `${appUrl}/generator?payment=success`,
          cancel_url: `${appUrl}/generator`,
          webhook_url: `${appUrl}/api/webhooks/clickpesa`,
          metadata: {
            userId,
            type: "pro_upgrade",
            email: userEmail,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      // ClickPesa API might return the URL in different fields depending on version
      const checkoutUrl =
        response.data?.hosted_checkout_url ||
        response.data?.checkout_url ||
        response.data?.url;

      if (!checkoutUrl) {
        console.error(
          "ClickPesa API response missing checkout URL:",
          response.data,
        );
        // Fallback to a demo URL if the API call "succeeded" but returned no URL
        return res.json({
          checkout_url: "https://clickpesa.com/demo-checkout",
          note: "API returned success but no checkout URL was found in response.",
        });
      }

      res.json({ checkout_url: checkoutUrl });
    } catch (error: any) {
      console.error(
        "ClickPesa Pro Upgrade Error:",
        error.response?.data || error.message,
      );
      res.status(500).json({ error: "Failed to initiate Pro upgrade payment" });
    }
  });

  // API: ClickPesa Webhook with Verification
  app.post("/api/webhooks/clickpesa", async (req, res) => {
    const event = req.body;
    const apiKey = process.env.CLICKPESA_API_KEY;
    const webhookSecret = process.env.CLICKPESA_WEBHOOK_SECRET;
    const environment = process.env.CLICKPESA_ENVIRONMENT || "sandbox";

    const CLICKPESA_BASE_URL =
      environment === "production"
        ? "https://api.clickpesa.com"
        : "https://api.sandbox.clickpesa.com";

    // 1. Verify Checksum if secret is provided
    const signature = req.headers["x-clickpesa-signature"];
    if (webhookSecret && signature) {
      const hash = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (hash !== signature) {
        console.warn("ClickPesa Webhook: Invalid signature detected.");
        return res.status(401).send("Unauthorized: Invalid signature");
      }
    } else if (webhookSecret) {
      console.warn(
        "ClickPesa Webhook: Secret configured but signature missing from headers.",
      );
      return res.status(401).send("Unauthorized: Signature missing");
    }

    // 2. Basic event type check
    if (event.type === "PAYMENT_RECEIVED" || event.status === "completed") {
      const paymentId = event.id || event.payment_id || event.data?.id;
      const metadata = event.metadata || event.data?.metadata || {};
      const { userId, type, templateId } = metadata;

      if (!paymentId || !userId) {
        return res.status(400).send("Missing required metadata");
      }

      try {
        // 3. VERIFICATION: Call ClickPesa API to verify this payment actually happened
        // This prevents webhook spoofing even if checksum is not used
        if (apiKey) {
          const verifyResponse = await axios.get(
            `${CLICKPESA_BASE_URL}/v1/payments/${paymentId}`,
            {
              headers: { Authorization: `Bearer ${apiKey}` },
            },
          );

          if (verifyResponse.data.status !== "completed") {
            console.warn(
              `Payment ${paymentId} verification failed: Status is ${verifyResponse.data.status}`,
            );
            return res.status(400).send("Payment not completed");
          }
        } else {
          console.warn(
            "Skipping ClickPesa verification: API Key missing. Webhook might be insecure.",
          );
        }

        // 3. Update Database
        if (type === "pro_upgrade") {
          const { error } = await supabase
            .from("profiles")
            .update({ is_pro: true })
            .eq("id", userId);

          if (error) throw error;
          console.log(`User ${userId} upgraded to Pro successfully.`);
        } else if (templateId) {
          const { error } = await supabase
            .from("purchases")
            .insert([{ user_id: userId, template_id: templateId }]);

          if (error && error.code !== "23505") throw error;

          // Also update designer balance if it's a marketplace sale
          const { data: template } = await supabase
            .from("community_grids")
            .select("user_id, price")
            .eq("id", templateId)
            .single();

          if (template && template.user_id) {
            // Add 80% of sale to designer balance (20% platform fee)
            const designerCut = template.price * 0.8;
            await supabase.rpc("increment_balance", {
              user_id: template.user_id,
              amount: designerCut,
            });
          }

          console.log(
            `Payment successful for user ${userId} and template: ${templateId}`,
          );
        }
      } catch (err: any) {
        console.error("Webhook processing error:", err.message);
        return res.status(500).send("Internal server error");
      }
    }

    res.status(200).send("OK");
  });

  // API: Payouts, Purchases, etc.

  // Auth Callback for OAuth
  app.get("/auth/callback", async (req, res) => {
    const { code } = req.query;
    const appUrl = process.env.APP_URL || "http://localhost:3000";

    if (code) {
      // In a real app, Supabase handles the code exchange if using their standard flow.
      // We just need to redirect back to the app with the session.
      // For AI Studio iframe, we redirect to the app root.
      return res.redirect(`${appUrl}/?code=${code}`);
    }

    res.redirect(appUrl);
  });

  // API: Request Payout
  app.post("/api/payouts/request", authenticateUser, async (req, res) => {
    const userId = (req as any).user.id;

    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("balance, email")
        .eq("id", userId)
        .single();

      if (profileError || !profile) throw new Error("Profile not found");

      if (profile.balance < 50) {
        return res.status(400).json({ error: "Minimum payout is $50" });
      }

      // In a real app, we would create a payout record and notify admins
      // For now, we'll just log it and reset balance (simulating a processed payout)
      console.log(
        `Payout requested for user ${userId} (${profile.email}): $${profile.balance}`,
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          balance: 0,
          last_payout_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) throw updateError;

      res.json({
        success: true,
        message: "Payout request received and is being processed.",
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API: Check Purchase Status (Equivalent to Server Action)
  app.get("/api/purchases/check", authenticateUser, async (req, res) => {
    const { templateId } = req.query;
    const userId = (req as any).user.id;

    if (!templateId) {
      return res.status(400).json({ error: "Template ID required" });
    }

    if (!isValidKey(supabaseServiceKey)) {
      return res.json({ purchased: false, note: "Supabase not configured" });
    }

    let { data, error } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", userId)
      .eq("template_id", templateId)
      .maybeSingle();

    if (
      error &&
      error.message?.includes('column "template_id" does not exist')
    ) {
      // Fallback to item_id
      const { data: fallbackData, error: fallbackError } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", userId)
        .eq("item_id", templateId)
        .maybeSingle();

      data = fallbackData;
      error = fallbackError;
    }

    if (error) {
      console.error("Supabase Select Error:", error.message);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ purchased: !!data });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

// 1. Initialize the server routes
startServer()
  .then(() => {
    console.log("Routes initialized successfully");
  })
  .catch((err) => {
    console.error("Failed to initialize routes:", err);
  });

// 2. This allows Netlify to run your express app as a function
// It must stay outside the function at the bottom
export const handler = serverless(app);
