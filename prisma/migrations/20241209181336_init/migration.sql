/*
  Warnings:

  - Made the column `createdById` on table `FoodType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipesCategoryId` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `RecipesCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdById` on table `Season` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "MealType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "MealType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FoodType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "FoodType_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FoodType" ("createdById", "created_at", "id", "name", "updated_at") SELECT "createdById", "created_at", "id", "name", "updated_at" FROM "FoodType";
DROP TABLE "FoodType";
ALTER TABLE "new_FoodType" RENAME TO "FoodType";
CREATE TABLE "new_Ingredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "foodTypeId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "icon" TEXT,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Ingredient_foodTypeId_fkey" FOREIGN KEY ("foodTypeId") REFERENCES "FoodType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ingredient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ingredient" ("createdById", "created_at", "foodTypeId", "icon", "id", "name", "seasonId", "updated_at") SELECT "createdById", "created_at", "foodTypeId", "icon", "id", "name", "seasonId", "updated_at" FROM "Ingredient";
DROP TABLE "Ingredient";
ALTER TABLE "new_Ingredient" RENAME TO "Ingredient";
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "peopleNumber" INTEGER NOT NULL,
    "cookingTime" DATETIME,
    "preparationTime" DATETIME,
    "restTime" DATETIME,
    "description" TEXT,
    "tips" TEXT,
    "recipesCategoryId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Recipe_recipesCategoryId_fkey" FOREIGN KEY ("recipesCategoryId") REFERENCES "RecipesCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("cookingTime", "createdById", "created_at", "description", "id", "name", "peopleNumber", "preparationTime", "recipesCategoryId", "restTime", "tips", "updated_at") SELECT "cookingTime", "createdById", "created_at", "description", "id", "name", "peopleNumber", "preparationTime", "recipesCategoryId", "restTime", "tips", "updated_at" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE TABLE "new_RecipesCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "mealTypeId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "RecipesCategory_mealTypeId_fkey" FOREIGN KEY ("mealTypeId") REFERENCES "MealType" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "RecipesCategory_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RecipesCategory" ("createdById", "created_at", "id", "name", "updated_at") SELECT "createdById", "created_at", "id", "name", "updated_at" FROM "RecipesCategory";
DROP TABLE "RecipesCategory";
ALTER TABLE "new_RecipesCategory" RENAME TO "RecipesCategory";
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Season_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("createdAt", "createdById", "end", "id", "name", "start", "updatedAt") SELECT "createdAt", "createdById", "end", "id", "name", "start", "updatedAt" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE TABLE "new_Sequence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Sequence_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sequence_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sequence" ("createdById", "created_at", "description", "id", "recipeId", "title", "updated_at") SELECT "createdById", "created_at", "description", "id", "recipeId", "title", "updated_at" FROM "Sequence";
DROP TABLE "Sequence";
ALTER TABLE "new_Sequence" RENAME TO "Sequence";
CREATE TABLE "new_Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortForm" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Unit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Unit" ("createdAt", "createdById", "id", "name", "shortForm", "updatedAt") SELECT "createdAt", "createdById", "id", "name", "shortForm", "updatedAt" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "recipeCreatedNumber" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'User',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_User" ("created_at", "email", "firstname", "id", "lastname", "password", "picture", "recipeCreatedNumber", "role", "updated_at") SELECT "created_at", "email", "firstname", "id", "lastname", "password", "picture", "recipeCreatedNumber", "role", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Ustensil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Ustensil_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ustensil" ("createdById", "created_at", "id", "name", "updated_at") SELECT "createdById", "created_at", "id", "name", "updated_at" FROM "Ustensil";
DROP TABLE "Ustensil";
ALTER TABLE "new_Ustensil" RENAME TO "Ustensil";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
