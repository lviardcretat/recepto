/*
  Warnings:

  - You are about to drop the `RecipeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `recipeCategoryId` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RecipeCategory";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RecipesCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "recipesNumber" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "peopleNumber" INTEGER NOT NULL,
    "cookingTime" DATETIME,
    "preparationTime" DATETIME,
    "restTime" DATETIME,
    "description" TEXT,
    "tips" TEXT,
    "recipesCategoryId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Recipe_recipesCategoryId_fkey" FOREIGN KEY ("recipesCategoryId") REFERENCES "RecipesCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("cookingTime", "createdById", "created_at", "description", "id", "name", "peopleNumber", "preparationTime", "restTime", "tips", "updated_at") SELECT "cookingTime", "createdById", "created_at", "description", "id", "name", "peopleNumber", "preparationTime", "restTime", "tips", "updated_at" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
