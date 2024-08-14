import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import {post} from "@/app/db/schema/post";
import { relations } from 'drizzle-orm';

export const category = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255}).notNull().unique()
});

export const categoryRelations = relations(category, ({ many }) => ({
    posts: many(post)
}))
