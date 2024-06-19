export default function robots() {
    return {
      rules: [
        {
          userAgent: 'Googlebot',
          allow: '/',
        },
        {
          userAgent: 'Googlebot-Mobile',
          allow: '/',
        },
        {
          userAgent: 'bingbot',
          allow: '/',
        },
        {
          userAgent: 'Slurp',
          allow: '/',
        },
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    }
  }
  