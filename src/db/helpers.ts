import { db } from "./index.ts";
import { users, documents, chatSessions, chatMessages } from "./schema.ts";
import { eq, and } from "drizzle-orm";

/**
 * Safely registers or fetches a user from PostgreSQL based on their Firebase Auth UID.
 * Uses upsert to avoid race conditions.
 */
export async function getOrCreateUser(uid: string, email: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database upsert user failed:", error);
    throw new Error("រក្សាទុកព័ត៌មានអ្នកប្រើប្រាស់បរាជ័យ (Failed to sync user)", { cause: error });
  }
}

/**
 * Saves or updates a chat session and its nested messages.
 */
export async function saveOrUpdateChatSession(
  userId: number,
  session: {
    id: string;
    topicTitle: string;
    date: string;
    messages: {
      role: string;
      content: string;
      timestamp: string | Date;
    }[];
  }
) {
  try {
    // 1. Upsert session
    await db
      .insert(chatSessions)
      .values({
        id: session.id,
        userId,
        topicTitle: session.topicTitle,
        date: session.date,
      })
      .onConflictDoUpdate({
        target: chatSessions.id,
        set: {
          topicTitle: session.topicTitle,
          date: session.date,
        },
      });

    // 2. Delete existing messages
    await db.delete(chatMessages).where(eq(chatMessages.sessionId, session.id));

    // 3. Insert new messages
    if (session.messages.length > 0) {
      await db.insert(chatMessages).values(
        session.messages.map((m) => ({
          sessionId: session.id,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.timestamp),
        }))
      );
    }

    return true;
  } catch (error) {
    console.error("Database save chat session failed:", error);
    throw new Error("រក្សាទុកប្រវត្តិនៃការជជែកបរាជ័យ (Failed to save chat history)", { cause: error });
  }
}

/**
 * Fetches all chat sessions and their nested messages belonging to a user ID.
 */
export async function getUserChatSessions(userId: number) {
  try {
    const sessions = await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, userId))
      .orderBy(chatSessions.createdAt);

    const result = [];
    for (const s of sessions) {
      const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, s.id))
        .orderBy(chatMessages.timestamp);

      result.push({
        id: s.id,
        topicTitle: s.topicTitle,
        date: s.date,
        messages: messages.map((m) => ({
          id: m.id.toString(),
          role: m.role as "user" | "model" | "system",
          content: m.content,
          timestamp: m.timestamp,
        })),
      });
    }

    return result;
  } catch (error) {
    console.error("Database fetch chat sessions failed:", error);
    throw new Error("ទាញយកប្រវត្តិនៃការជជែកបរាជ័យ (Failed to fetch chat sessions)", { cause: error });
  }
}

/**
 * Deletes a chat session owned by the specified user.
 */
export async function deleteUserChatSession(userId: number, sessionId: string) {
  try {
    const result = await db
      .delete(chatSessions)
      .where(and(eq(chatSessions.id, sessionId), eq(chatSessions.userId, userId)))
      .returning();

    if (result.length === 0) {
      throw new Error("រកមិនឃើញប្រវត្តិនៃការជជែកដែលត្រូវលុបទេ (Chat session not found or access denied)");
    }

    return true;
  } catch (error) {
    console.error("Database delete chat session failed:", error);
    throw new Error("លុបប្រវត្តិនៃការជជែកបរាជ័យ (Failed to delete chat session)", { cause: error });
  }
}

/**
 * Fetches all documents belonging to a user ID.
 */
export async function getUserDocuments(userId: number) {
  try {
    const result = await db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId))
      .orderBy(documents.createdAt); // Order as desired, or sort on backend/frontend

    return result;
  } catch (error) {
    console.error("Database fetch documents failed:", error);
    throw new Error("ទាញយកឯកសារពីម៉ាស៊ីនមេបរាជ័យ (Failed to fetch documents)", { cause: error });
  }
}

/**
 * Saves a new document/note for a specific user.
 */
export async function saveUserDocument(
  userId: number,
  doc: {
    name: string;
    type: string;
    fileType: string;
    size: number;
    content: string;
  }
) {
  try {
    const result = await db
      .insert(documents)
      .values({
        userId,
        name: doc.name,
        type: doc.type,
        fileType: doc.fileType,
        size: doc.size,
        content: doc.content,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database save document failed:", error);
    throw new Error("រក្សាទុកឯកសារទៅម៉ាស៊ីនមេបរាជ័យ (Failed to save document)", { cause: error });
  }
}

/**
 * Deletes a document owned by the specified user.
 */
export async function deleteUserDocument(userId: number, docId: number) {
  try {
    const result = await db
      .delete(documents)
      .where(and(eq(documents.id, docId), eq(documents.userId, userId)))
      .returning();

    if (result.length === 0) {
      throw new Error("រកមិនឃើញឯកសារដែលត្រូវលុបទេ (Document not found or access denied)");
    }

    return true;
  } catch (error) {
    console.error("Database delete document failed:", error);
    throw new Error("លុបឯកសារពីម៉ាស៊ីនមេបរាជ័យ (Failed to delete document)", { cause: error });
  }
}
