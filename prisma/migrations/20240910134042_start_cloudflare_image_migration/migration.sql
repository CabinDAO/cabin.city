/*
  Warnings:

  - A unique constraint covering the columns `[locationId,category,cfId]` on the table `LocationMediaItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LocationMediaItem_locationId_category_ipfsHash_key";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "bannerImageCfId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "bannerImageIpfsHash" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LocationMediaItem" ADD COLUMN     "cfId" TEXT,
ALTER COLUMN "ipfsHash" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LocationMediaItem_locationId_category_cfId_key" ON "LocationMediaItem"("locationId", "category", "cfId");
