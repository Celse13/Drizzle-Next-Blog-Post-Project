import { AnyPgColumn, pgTable, serial, integer, text, timestamp, varchar } from 'drizzle-orm/pg-core';


import { user} from "@/app/db/schema/user";
import { post } from "@/app/db/schema/post";
import {relations} from "drizzle-orm";

export const comment = pgTable('comment', {
    id: serial("id").primaryKey(),
    parentId: integer('parent_id')
        .references((): AnyPgColumn => comment.id),
    userId: integer('user_id')
        .references(() => user.id)
        .notNull(),
    content: text('content').notNull(),
    postId: integer('post_id')
        .references(() => user.id),
    createAt: timestamp('created_at', {mode: 'string'})
        .notNull().defaultNow(),
    updateAt: timestamp('updated_at', {mode: 'string'})
        .notNull().defaultNow()

});

export const commentRelations = relations(comment, ({ one }) => ({
    user: one(user, {
        fields: [comment.userId],
        references: [user.id]
    }),
    post: one(post, {
        fields: [comment.postId],
        references: [post.id]
    }),
}));
