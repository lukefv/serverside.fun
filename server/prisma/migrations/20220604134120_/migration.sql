/*
  Warnings:

  - Added the required column `placeId` to the `LoggedScripts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoggedScripts" ADD COLUMN     "placeId" TEXT NOT NULL;
