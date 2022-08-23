/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_subscriptionId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "subscriptionId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "usedTrial" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Buyers" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "purchaseIdentifier" TEXT NOT NULL,
    "warningCount" INTEGER NOT NULL DEFAULT 0,
    "paymentMethod" TEXT NOT NULL DEFAULT E'',
    "expires" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "robloxId" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Buyers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scripts" (
    "id" SERIAL NOT NULL,
    "robloxName" TEXT NOT NULL,
    "script" TEXT NOT NULL DEFAULT E'',
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whitelistId" INTEGER NOT NULL,

    CONSTRAINT "Scripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_discordId_key" ON "Buyers"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_purchaseIdentifier_key" ON "Buyers"("purchaseIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "Games_gameId_key" ON "Games"("gameId");
