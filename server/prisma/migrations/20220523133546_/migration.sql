-- CreateTable
CREATE TABLE "SnitchLogs" (
    "id" TEXT NOT NULL,
    "discordName" TEXT NOT NULL DEFAULT E'',
    "discordId" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posterId" INTEGER NOT NULL,

    CONSTRAINT "SnitchLogs_pkey" PRIMARY KEY ("id")
);
