/*
  Warnings:

  - You are about to drop the column `discordId` on the `Buyers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `usedTrial` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Scripts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[robloxId]` on the table `Buyers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Buyers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Buyers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Buyers_discordId_key";

-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Buyers" DROP COLUMN "discordId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "robloxId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "email",
DROP COLUMN "usedTrial",
ADD COLUMN     "profilePicture" TEXT NOT NULL;

-- DropTable
DROP TABLE "Scripts";

-- CreateTable
CREATE TABLE "Trials" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedScripts" (
    "id" TEXT NOT NULL,
    "robloxId" TEXT NOT NULL,
    "script" TEXT NOT NULL DEFAULT E'',
    "gameId" TEXT NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoggedScripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicScripts" (
    "id" TEXT NOT NULL,
    "robloxId" TEXT NOT NULL,
    "script" TEXT NOT NULL DEFAULT E'',
    "gameId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posterId" INTEGER NOT NULL,

    CONSTRAINT "PublicScripts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trials_userId_key" ON "Trials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_robloxId_key" ON "Buyers"("robloxId");

-- CreateIndex
CREATE UNIQUE INDEX "Buyers_userId_key" ON "Buyers"("userId");

-- CreateIndex
CREATE INDEX "fdg34" ON "Buyers"("userId");

-- AddForeignKey
ALTER TABLE "Trials" ADD CONSTRAINT "fk_1979" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Buyers" ADD CONSTRAINT "fk_15" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LoggedScripts" ADD CONSTRAINT "fk_342" FOREIGN KEY ("buyerId") REFERENCES "Buyers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PublicScripts" ADD CONSTRAINT "fk_45634" FOREIGN KEY ("posterId") REFERENCES "Buyers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
