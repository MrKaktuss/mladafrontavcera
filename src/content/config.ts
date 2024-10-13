import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        author: z.string(),
        image: image(),
        publishedAt: z.date(),
    })
});

export const collections = {
    'post': postCollection,
};