/*
  Warnings:

  - You are about to drop the `gamelist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "gamelist";

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
CREATE UNIQUE INDEX "Games_gameId_key" ON "Games"("gameId");
