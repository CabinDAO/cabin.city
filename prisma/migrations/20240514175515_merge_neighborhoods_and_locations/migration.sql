/*
  Warnings:

  - You are about to drop the column `caretakerEmail` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `caretakerId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `internetSpeedMbps` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `sleepCapacity` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `Neighborhood` table. If the table is not empty, all the data it contains will be lost.

*/

DELETE FROM "Location" where "publishedAt" is null;
UPDATE "Location" set type = 'Outpost';

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_neighborhoodId_fkey";
ALTER TABLE "Profile" DROP COLUMN "neighborhoodId";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_caretakerId_fkey";

ALTER TABLE "Location" RENAME COLUMN "caretakerId" to "stewardId";
ALTER TABLE "Location" ALTER COLUMN "stewardId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "caretakerEmail",
DROP COLUMN "internetSpeedMbps",
DROP COLUMN "publishedAt",
DROP COLUMN "sleepCapacity";

-- DropTable
DROP TABLE "Neighborhood";


-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_stewardId_fkey" FOREIGN KEY ("stewardId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
