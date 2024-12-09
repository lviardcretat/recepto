/*
  Warnings:

  - Added the required column `icon` to the `Allergen` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Allergen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Allergen_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Allergen" ("createdById", "created_at", "id", "name", "updated_at") SELECT "createdById", "created_at", "id", "name", "updated_at" FROM "Allergen";
DROP TABLE "Allergen";
ALTER TABLE "new_Allergen" RENAME TO "Allergen";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
