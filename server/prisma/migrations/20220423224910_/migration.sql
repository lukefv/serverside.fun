/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `Games` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId]` on the table `Games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobId` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "jobId" TEXT NOT NULL,
ADD COLUMN     "placeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Games_placeId_key" ON "Games"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Games_jobId_key" ON "Games"("jobId");
