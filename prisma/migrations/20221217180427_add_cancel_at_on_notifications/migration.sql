/*
  Warnings:

  - Added the required column `canceledAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canceledAt" DATETIME NOT NULL
);
INSERT INTO "new_Notification" ("category", "content", "createdAt", "id", "readAt", "recipientId") SELECT "category", "content", "createdAt", "id", "readAt", "recipientId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE INDEX "Notification_recipientId_idx" ON "Notification"("recipientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
