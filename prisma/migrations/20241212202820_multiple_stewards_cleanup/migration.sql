/*
  Warnings:

  - You are about to drop the column `stewardId` on the `Location` table. All the data in the column will be lost.

*/

-- Migrate all existing stewards into the new LocationSteward table
-- INSERT INTO "LocationSteward" ("locationId", "profileId", "updatedAt")
-- SELECT "id", "stewardId", now()
-- FROM "Location"
-- WHERE "stewardId" IS NOT NULL;

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_stewardId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "stewardId";