import { db } from "./index.ts";
import { users, documents } from "./schema.ts";
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
