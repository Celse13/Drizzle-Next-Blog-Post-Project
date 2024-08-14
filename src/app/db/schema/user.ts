import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import {post} from "@/app/db/schema/post";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
    id: serial('id').notNull().primaryKey(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    password: varchar('password', { length: 255}).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    createAt: timestamp('create_at', { mode: 'string'}).notNull().defaultNow(),
    updateAt: timestamp('update-At', { mode: 'string'}).notNull().defaultNow()
});


export const userRelations = relations(user, ({ many }) => ({
    posts: many(post)
}))
