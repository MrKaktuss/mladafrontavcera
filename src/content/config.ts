import { z, defineCollection } from 'astro:content';

export const postSchema = z.object({
    title: z.string(),
    author: z.string(),
    image: z.string(),
    publishedAt: z.date(),
})

const postCollection = defineCollection({
    type: 'content',
    schema: postSchema
});

export const collections = {
    'post': postCollection,
};