const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arxsoftwares.com"

export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
  ]
}
