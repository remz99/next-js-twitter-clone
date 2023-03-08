-- AlterTable
ALTER TABLE "tweets" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "tweets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
