import { getCollection } from "astro:content";

export async function GET(context) {
    const posts = await getCollection('post');

    // add all other pages
    const pages = [
        { url: "/" },
        { url: "/all/" },
    ];

    let items = []

    for (const page of pages) {
        items += `
      <url>
        <loc>https://mladafrontavcera.cz${page.url}</loc>
      </url>
    `;
    }

    items += posts.map((post) => {
        const pubDate = new Date(post.data.publishedAt).toISOString();

        return `
      <url>
        <loc>https://mladafrontavcera.cz/posts/${post.slug}/</loc>
        <news:news>
          <news:publication>
            <news:name>Mladá Fronta Včera</news:name>
            <news:language>cs</news:language>
          </news:publication>
          <news:publication_date>${pubDate}</news:publication_date>
          <news:title>${post.data.title}</news:title>
        </news:news>
        <lastmod>${pubDate}</lastmod>
      </url>
    `;
    }).join("");



    return new Response(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
              
        ${items}
      </urlset>`, {
        headers: {
            "Content-Type": "application/xml"
        }
    });
}
