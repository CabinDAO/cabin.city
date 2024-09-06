/*
  Warnings:

  - The values [BadgeAdded] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `badgeId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `gotSotn2024Badge` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BadgeSpec` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('Text', 'ProfileCreated', 'RoleAdded', 'StampAdded', 'CitizenshipVerified', 'LocationPublished', 'OfferCreated', 'VouchRequested');
ALTER TABLE "Activity" ALTER COLUMN "type" TYPE "ActivityType_new" USING ("type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
COMMIT;

ALTER TABLE "Activity" DROP CONSTRAINT "Activity_badgeId_fkey";
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_specId_fkey";
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_walletId_fkey";

ALTER TABLE "Activity" DROP COLUMN "badgeId";
ALTER TABLE "Profile" DROP COLUMN "gotSotn2024Badge";

DROP TABLE "Badge";
DROP TABLE "BadgeSpec";
