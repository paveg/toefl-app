/*
  Warnings:

  - Added the required column `lexicalCategory` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "lexicalCategory" TEXT NOT NULL
);
INSERT INTO "new_Word" ("id", "level", "meaning", "word") SELECT "id", "level", "meaning", "word" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
