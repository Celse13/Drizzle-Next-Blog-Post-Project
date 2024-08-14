import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import {postTags} from "@/app/db/schema/postTags";
import {relations} from "drizzle-orm";

export const tag = pgTable('tag', {
   id: serial('id').primaryKey(),
   name: varchar('name', { length: 255}).notNull().unique()
});

export const tagRelations = relations(tag, ({ many }) => ({
   postToTag: many(postTags)
}));
