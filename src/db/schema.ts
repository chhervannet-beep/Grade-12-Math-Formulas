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
  chatSessions: many(chatSessions),
}));

// Define relationships for the 'documents' table
export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
}));

// Define 'chat_sessions' table to store chat sessions
export const chatSessions = pgTable("chat_sessions", {
  id: text("id").primaryKey(), // String session id (e.g. timestamp or uuid)
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  topicTitle: text("topic_title").notNull(),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define 'chat_messages' table to store messages within sessions
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id")
    .references(() => chatSessions.id, { onDelete: "cascade" })
    .notNull(),
  role: text("role").notNull(), // 'user', 'model', or 'system'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

// Define relationships for 'chat_sessions' table
export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [chatSessions.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

// Define relationships for 'chat_messages' table
export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));
