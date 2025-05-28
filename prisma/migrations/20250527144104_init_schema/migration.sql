/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `exchangeMethod` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "imageUrl",
ADD COLUMN     "exchangeMethod" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Listing_userId_idx" ON "Listing"("userId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
