import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*?template=', '/*?filter='],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'GeminiBot',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot'
        ],
        allow: '/',
        disallow: ['/api/', '/*?template=', '/*?filter='],
      }
    ],
    sitemap: 'https://bentoflow-pro.vercel.app/sitemap.xml',
  };
}
