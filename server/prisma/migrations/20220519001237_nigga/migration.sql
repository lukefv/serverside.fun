/*
  Warnings:

  - You are about to drop the column `gameId` on the `PublicScripts` table. All the data in the column will be lost.
  - You are about to drop the column `robloxId` on the `PublicScripts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicScripts" DROP CONSTRAINT "fk_45634";

-- AlterTable
ALTER TABLE "PublicScripts" DROP COLUMN "gameId",
DROP COLUMN "robloxId",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "thumbnailImage" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "PrivateScripts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "script" TEXT NOT NULL DEFAULT E'',
    "thumbnailImage" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posterId" INTEGER NOT NULL,

    CONSTRAINT "PrivateScripts_pkey" PRIMARY KEY ("id")
);
