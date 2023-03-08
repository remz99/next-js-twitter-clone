/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tweet";

-- CreateTable
CREATE TABLE "tweets" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);
