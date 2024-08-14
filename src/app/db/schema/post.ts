import { pgTable, serial, integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { user} from "@/app/db/schema/user";
import { category} from "@/app/db/schema/category";
import {postTags} from "@/app/db/schema/postTags";
import {comment} from "@/app/db/schema/comment";
import {relations} from "drizzle-orm";

export const post = pgTable('post', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .notNull()
        .references(() => user.id),
    title: varchar('title',{ length: 255}).notNull(),
    shortDescription: text('short_description'),
    content: text('content').notNull(),
    categoryId: integer("category_id")
        .references(() => category.id)
        .notNull(),
    createAt: timestamp('create_at', {mode: 'string'}).notNull(),
    updateAt: timestamp('update_at', {mode: 'string'}).notNull().defaultNow(),
});


export const postRelations = relations(post, ({ one, many }) => ({
    user: one(user, {
        fields: [post.userId],
        references: [user.id]
    }),
    tags: many(postTags),
    comments: many(comment),
    category: one(category, {
        fields: [post.categoryId],
        references: [category.id]
    })
}));
