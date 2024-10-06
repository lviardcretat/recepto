-- CreateTable
CREATE TABLE "RecipeCategory" (
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
    "recipeCategoryId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Recipe_recipeCategoryId_fkey" FOREIGN KEY ("recipeCategoryId") REFERENCES "RecipeCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("cookingTime", "createdById", "created_at", "description", "id", "name", "peopleNumber", "preparationTime", "restTime", "tips", "updated_at") SELECT "cookingTime", "createdById", "created_at", "description", "id", "name", "peopleNumber", "preparationTime", "restTime", "tips", "updated_at" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
