const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arxsoftwares.com"

export default function Robot() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
