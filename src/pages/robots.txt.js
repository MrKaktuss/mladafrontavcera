export async function GET(context) {

    return new Response(`User-agent: *
Allow: /
Sitemap: https://mladafrontavcera.cz/sitemap-index.xml`);
}
