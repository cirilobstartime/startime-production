import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://startime.sa'

  // for AR and EN
  const locales = ['en', 'ar'] as const

  const pages = [
    '',
    'discover',
    'portfolio',
    'solutions',
    'triple-s-arena',
    'join-us',
    'contact',
  ]

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },

    ...locales.flatMap((locale) =>
      pages.map((page) => {
        const changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] =
          page === '' ? 'daily' : 'weekly'

        return {
          url: `${baseUrl}/${locale}${page ? `/${page}` : ''}`,
          lastModified: new Date(),
          changeFrequency,
          priority: page === '' ? 1 : 0.8,
          alternates: {
            languages: {
              en: `${baseUrl}/en${page ? `/${page}` : ''}`,
              ar: `${baseUrl}/ar${page ? `/${page}` : ''}`,
            },
          },
        }
      })
    ),
  ]

  return sitemap
}