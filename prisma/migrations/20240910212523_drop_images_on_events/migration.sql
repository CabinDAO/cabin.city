/*
  Warnings:

  - You are about to drop the column `imageIpfsHash` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the `OfferMediaItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OfferMediaItem" DROP CONSTRAINT "OfferMediaItem_offerId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "imageIpfsHash";

-- DropTable
DROP TABLE "OfferMediaItem";
