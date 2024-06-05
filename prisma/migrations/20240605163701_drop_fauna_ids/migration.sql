/*
  Warnings:

  - You are about to drop the column `faunaId` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `faunaId` on the `BadgeSpec` table. All the data in the column will be lost.
  - You are about to drop the column `faunaId` on the `Hat` table. All the data in the column will be lost.
  - You are about to drop the column `faunaId` on the `Wallet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Badge_faunaId_key";

-- DropIndex
DROP INDEX "BadgeSpec_faunaId_key";

-- DropIndex
DROP INDEX "Hat_faunaId_key";

-- DropIndex
DROP INDEX "Wallet_faunaId_key";

-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "faunaId";

-- AlterTable
ALTER TABLE "BadgeSpec" DROP COLUMN "faunaId";

-- AlterTable
ALTER TABLE "Hat" DROP COLUMN "faunaId";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "faunaId";
