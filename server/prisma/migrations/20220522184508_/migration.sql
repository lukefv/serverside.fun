-- CreateTable
CREATE TABLE "PendingScripts" (
    "id" SERIAL NOT NULL,
    "robloxId" TEXT NOT NULL,
    "script" TEXT NOT NULL,

    CONSTRAINT "PendingScripts_pkey" PRIMARY KEY ("id")
);
