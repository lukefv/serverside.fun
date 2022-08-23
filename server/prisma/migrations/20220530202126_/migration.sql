/*
  Warnings:

  - A unique constraint covering the columns `[robloxUsername]` on the table `Buyers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Buyers" ADD COLUMN     "robloxUsername" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_robloxUsername_key" ON "Buyers"("robloxUsername");
