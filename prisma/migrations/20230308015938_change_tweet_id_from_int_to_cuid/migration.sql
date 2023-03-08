/*
  Warnings:

  - The primary key for the `tweets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tweets" DROP CONSTRAINT "tweets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tweets_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tweets_id_seq";
