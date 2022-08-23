-- CreateTable
CREATE TABLE "GameSecurity" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSecurity_pkey" PRIMARY KEY ("id")
);
