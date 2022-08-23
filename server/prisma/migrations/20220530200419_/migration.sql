/*
  Warnings:

  - You are about to drop the column `robloxUsername` on the `Buyers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Buyers_robloxUsername_key";

-- AlterTable
ALTER TABLE "Buyers" DROP COLUMN "robloxUsername";
