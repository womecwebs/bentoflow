import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'software';
  canonical?: string;
  schema?: any;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = 'https://picsum.photos/seed/bentoflow/1200/630',
  ogType = 'website',
  canonical,
  schema
}) => {
  const fullTitle = `${title} | BentoFlow Pro`;
  const siteUrl = 'https://bentoflow.pro';
  const currentUrl = window.location.href;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    
    // Open Graph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:url', currentUrl, true);
    updateMeta('og:type', ogType, true);
    updateMeta('og:site_name', 'BentoFlow Pro', true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);

    // Canonical
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical || currentUrl);

    // Schema.org JSON-LD
    if (schema) {
      let script = document.querySelector('script[type="application/ld+json"]#page-schema');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'page-schema');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    return () => {
      // Cleanup schema if needed on unmount
      const script = document.querySelector('script[type="application/ld+json"]#page-schema');
      if (script) script.textContent = '';
    };
  }, [fullTitle, description, keywords, ogImage, ogType, canonical, schema, currentUrl]);

  return null;
};

// Common Schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BentoFlow Pro",
  "url": "https://bentoflow.pro",
  "logo": "https://bentoflow.pro/logo.png",
  "sameAs": [
    "https://twitter.com/bentoflow",
    "https://github.com/bentoflow"
  ]
};

export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "BentoFlow Grid Builder",
  "operatingSystem": "Web",
  "applicationCategory": "DesignApplication",
  "description": "The ultimate AI-powered Bento grid builder for modern web designers.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};
