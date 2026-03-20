import React from 'react';

interface StructuredDataProps {
  tool: {
    title: string;
    slug: string;
    ai_summary: string;
    seo_description?: string;
    faq_list: { q: string; a: string }[];
  };
}

export const StructuredData: React.FC<StructuredDataProps> = ({ tool }) => {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "operatingSystem": "Web",
    "applicationCategory": "DesignApplication",
    "description": tool.seo_description || tool.ai_summary,
    "url": `https://bentoflow.pro/tools/${tool.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faq_list.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bentoflow.pro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://bentoflow.pro/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": `https://bentoflow.pro/tools/${tool.slug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(softwareApp)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqPage)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumb)}
      </script>
    </>
  );
};
