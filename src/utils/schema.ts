export const generateSchema = (tool: { title: string; slug: string; ai_summary: string; how_to_steps: { name: string; text: string }[] }) => {
  const baseUrl = "https://bentoflow.pro";
  
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "operatingSystem": "Web",
    "applicationCategory": "DesignApplication",
    "description": tool.ai_summary,
    "url": `${baseUrl}/tools/${tool.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${baseUrl}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": `${baseUrl}/tools/${tool.slug}`
      }
    ]
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${tool.title}`,
    "description": `A step-by-step guide on using the ${tool.title} for bento grid generation.`,
    "step": tool.how_to_steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "itemListElement": [{
        "@type": "HowToDirection",
        "text": step.text
      }]
    }))
  };

  return [softwareApp, breadcrumb, howTo];
};
