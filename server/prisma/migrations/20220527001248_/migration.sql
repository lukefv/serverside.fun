-- CreateEnum
CREATE TYPE "WhitelistType" AS ENUM ('NORMAL', 'PREMIUM');

-- AlterTable
ALTER TABLE "Buyers" ADD COLUMN     "type" "WhitelistType" NOT NULL DEFAULT E'NORMAL';
