import { pgTable, integer, serial, primaryKey } from 'drizzle-orm/pg-core';
import { post } from "@/app/db/schema/post";
import { tag } from "@/app/db/schema/tag";
import {relations} from "drizzle-orm";

export const postTags = pgTable('post_to_tag', {
    postId: integer('post_id')
        .references(() => post.id)
        .notNull(),
    tagId: integer('tag_id')
        .references(() => tag.id)
        .notNull()
},
    (table) => ({
        pk: primaryKey(table.postId, table.tagId),
    })
);

export const postTagsRelations = relations(postTags, ({  one }) => ({
    tag: one(tag,{
        fields: [postTags.tagId],
        references: [tag.id]
    }),
    post: one(post, {
        fields: [postTags.postId],
        references: [post.id]
    })
}))
