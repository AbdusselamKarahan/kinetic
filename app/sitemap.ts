import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data'

const TR_MONTHS: Record<string, number> = {
  'ocak': 0, 'şubat': 1, 'subat': 1, 'mart': 2, 'nisan': 3, 'mayıs': 4, 'mayis': 4,
  'haziran': 5, 'temmuz': 6, 'ağustos': 7, 'agustos': 7, 'eylül': 8, 'eylul': 8,
  'ekim': 9, 'kasım': 10, 'kasim': 10, 'aralık': 11, 'aralik': 11,
}

function parseDate(input: string): Date {
  const native = new Date(input)
  if (!isNaN(native.getTime())) return native
  const m = input.trim().toLowerCase().match(/^(\d{1,2})\s+([a-zçğıöşü]+)\s+(\d{4})$/i)
  if (m) {
    const day = parseInt(m[1], 10)
    const month = TR_MONTHS[m[2]]
    const year = parseInt(m[3], 10)
    if (month !== undefined) return new Date(Date.UTC(year, month, day))
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kineticperformans.com'
  const blogUrls = blogPosts.map(post => ({
    url: `${base}/blog/${post.id}`,
    lastModified: parseDate(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...blogUrls,
  ]
}
