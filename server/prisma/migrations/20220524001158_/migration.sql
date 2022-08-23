/*
  Warnings:

  - You are about to drop the column `action` on the `Activity` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Activity_ipAddress_key";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "action";
