/*
  Warnings:

  - You are about to drop the column `permission` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Staff', 'Management', 'Owner');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "permission",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'User';
