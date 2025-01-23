/*
  Warnings:

  - The primary key for the `_AllergenToRecipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_MealTypeToRecipesCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_RecipeToUstensil` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_AllergenToRecipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_MealTypeToRecipesCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_RecipeToUstensil` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_AllergenToRecipe" DROP CONSTRAINT "_AllergenToRecipe_AB_pkey";

-- AlterTable
ALTER TABLE "_MealTypeToRecipesCategory" DROP CONSTRAINT "_MealTypeToRecipesCategory_AB_pkey";

-- AlterTable
ALTER TABLE "_RecipeToUstensil" DROP CONSTRAINT "_RecipeToUstensil_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_AllergenToRecipe_AB_unique" ON "_AllergenToRecipe"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealTypeToRecipesCategory_AB_unique" ON "_MealTypeToRecipesCategory"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToUstensil_AB_unique" ON "_RecipeToUstensil"("A", "B");
