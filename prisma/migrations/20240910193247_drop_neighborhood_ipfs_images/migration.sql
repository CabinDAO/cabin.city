/*
  Warnings:

  - You are about to drop the column `bannerImageIpfsHash` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `ipfsHash` on the `LocationMediaItem` table. All the data in the column will be lost.
  - Made the column `cfId` on table `LocationMediaItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "bannerImageIpfsHash";

-- AlterTable
ALTER TABLE "LocationMediaItem" DROP COLUMN "ipfsHash",
ALTER COLUMN "cfId" SET NOT NULL;
