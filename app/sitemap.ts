import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kineticperformans.com'
  const blogUrls = blogPosts.map(post => ({
    url: `${base}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...blogUrls,
  ]
}
