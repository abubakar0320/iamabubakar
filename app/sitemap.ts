import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://iamabubakar.site'
  
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/services',
    '/contact',
    '/privacy',
    '/terms',
    '/trademarks',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : (route === '/projects' ? 'weekly' : 'monthly') as any,
    priority: route === '' ? 1 : (route === '/projects' ? 0.9 : 0.8),
  }))

  return staticRoutes
}
