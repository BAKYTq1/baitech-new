export const dynamic = "force-static"
export default function sitemap() {
  const now = new Date()

  return [
    { url: "https://baitech.kg", priority: 1.0, changeFrequency: "weekly", lastModified: now },
    { url: "https://baitech.kg/about", priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: "https://baitech.kg/catalog", priority: 0.95, changeFrequency: "daily", lastModified: now },
    { url: "https://baitech.kg/solution", priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { url: "https://baitech.kg/solution/sistemy-bezopasnosti/videonablyudenie", priority: 0.95, changeFrequency: "weekly", lastModified: now },
    { url: "https://baitech.kg/solution/sistemy-bezopasnosti/skud", priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { url: "https://baitech.kg/catalog/cameras", priority: 0.95, changeFrequency: "daily", lastModified: now },
    { url: "https://baitech.kg/catalog/computers", priority: 0.85, changeFrequency: "daily", lastModified: now },
    { url: "https://baitech.kg/catalog/phones", priority: 0.85, changeFrequency: "daily", lastModified: now },
    { url: "https://baitech.kg/catalog/networking", priority: 0.85, changeFrequency: "daily", lastModified: now },
    { url: "https://baitech.kg/catalog/monitors", priority: 0.85, changeFrequency: "daily", lastModified: now },
    { url: "https://baitech.kg/terms", priority: 0.4, changeFrequency: "yearly", lastModified: now },
    { url: "https://baitech.kg/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: now },
  ]
}
