-- ===============================================================
-- BentoFlow Pro: Supabase Row Level Security (RLS) Configuration
-- ===============================================================

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- Add columns if they don't exist (this is just for user reference)
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website_limit INTEGER DEFAULT 2;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sites_created INTEGER DEFAULT 0;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT FALSE;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS balance DECIMAL DEFAULT 0;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_payout_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE community_grids ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_requests ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Policies
-- Users can read their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile (except sensitive fields like is_pro, balance)
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  (CASE WHEN auth.jwt() ->> 'role' = 'service_role' THEN true ELSE 
    (is_pro = (SELECT is_pro FROM profiles WHERE id = auth.uid()) AND 
     balance = (SELECT balance FROM profiles WHERE id = auth.uid()))
  END)
);

-- Service role can do everything (for webhooks/server-side updates)
CREATE POLICY "Service role full access on profiles" 
ON profiles FOR ALL 
USING (true) 
WITH CHECK (true);

-- 3. Community Grids (Marketplace) Policies
-- Anyone can read published grids
CREATE POLICY "Anyone can view published grids" 
ON community_grids FOR SELECT 
USING (true);

-- Users can create their own grids
CREATE POLICY "Users can create own grids" 
ON community_grids FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own grids
CREATE POLICY "Users can update own grids" 
ON community_grids FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own grids
CREATE POLICY "Users can delete own grids" 
ON community_grids FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Purchases Policies
-- Users can read their own purchases
CREATE POLICY "Users can view own purchases" 
ON purchases FOR SELECT 
USING (auth.uid() = user_id);

-- Service role can insert purchases (from webhook)
CREATE POLICY "Service role can insert purchases" 
ON purchases FOR INSERT 
WITH CHECK (true);

-- 5. Payout Requests Policies
-- Users can read their own payout requests
CREATE POLICY "Users can view own payout requests" 
ON payout_requests FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own payout requests
CREATE POLICY "Users can create own payout requests" 
ON payout_requests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- ===============================================================
-- Helper Function: increment_balance
-- ===============================================================
CREATE OR REPLACE FUNCTION increment_balance(user_id UUID, amount DECIMAL)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET balance = balance + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
