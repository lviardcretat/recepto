/*
  Warnings:

  - You are about to drop the column `recipesNumber` on the `RecipesCategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RecipesCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdById" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "RecipesCategory_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RecipesCategory" ("id", "name") SELECT "id", "name" FROM "RecipesCategory";
DROP TABLE "RecipesCategory";
ALTER TABLE "new_RecipesCategory" RENAME TO "RecipesCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
