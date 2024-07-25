/*
  Warnings:

  - You are about to drop the column `postalCode` on the `ProfileAddress` table. All the data in the column will be lost.
  - You are about to drop the column `route` on the `ProfileAddress` table. All the data in the column will be lost.
  - You are about to drop the column `routeShort` on the `ProfileAddress` table. All the data in the column will be lost.
  - You are about to drop the column `streetNumber` on the `ProfileAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfileAddress" DROP COLUMN "postalCode",
DROP COLUMN "route",
DROP COLUMN "routeShort",
DROP COLUMN "streetNumber";
