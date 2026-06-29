import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define 'users' table linking to Firebase Auth UID
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase Auth UID
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define 'documents' table to store files/notes on Cloud SQL
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'note' or 'file'
  fileType: text("file_type").notNull(),
  size: integer("size").notNull(),
  content: text("content").notNull(), // Markdown or Base64 file string
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relationships for the 'users' table
export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
}));

// Define relationships for the 'documents' table
export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));
