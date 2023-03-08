/*
  Warnings:

  - Added the required column `userId` to the `tweets` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `tweets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
