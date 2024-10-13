import rss from '@astrojs/rss';
import {getCollection} from "astro:content";
import MarkdownIt from 'markdown-it';
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context) {
    const posts = await getCollection('post');
    return rss({
        // `<title>` field in output xml
        title: 'Mladá Fronta Včera',
        // `<description>` field in output xml
        description: 'Školní bulvár, o kterém radši nikdo neslyšel. Vznikl jako legitimní konkurent Gybonovinám.\n',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: posts.map((post) => {
            const content = sanitizeHtml(parser.render(post.body), {
                allowedTags: []
            });
            return {
                title: post.data.title,
                link: "https://mladafrontavcera.cz/posts/" + post.slug + "/",
                description: `Napsal ${post.data.author}, ${post.data.publishedAt.toLocaleDateString("cs-cz")}. ${content.substring(0, 130)}...`,
                content: content,
                pubDate: post.date,
            }
        }),
        // (optional) inject custom xml
        customData: `<language>cs-cz</language>`,
    });
}