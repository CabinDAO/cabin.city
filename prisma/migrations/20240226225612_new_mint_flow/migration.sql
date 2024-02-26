/*
  Warnings:

  - You are about to drop the column `agreedToCOC` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `agreedToTerms` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `offerId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inviteId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inviteId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inviteCode]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('Crypto', 'CreditCard');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_offerId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_profileId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "agreedToCOC",
DROP COLUMN "agreedToTerms",
DROP COLUMN "offerId",
DROP COLUMN "profileId",
ADD COLUMN     "inviteId" INTEGER;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "inviteCode" TEXT,
ADD COLUMN     "inviteId" INTEGER;

-- CreateTable
CREATE TABLE "Invite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "inviterId" INTEGER NOT NULL,
    "cartId" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "privyDID" TEXT,
    "citizenshipGrantTx" TEXT,
    "citizenshipTxConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invite_externId_key" ON "Invite"("externId");

-- CreateIndex
CREATE UNIQUE INDEX "Invite_cartId_key" ON "Invite"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_inviteId_key" ON "Cart"("inviteId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_inviteId_key" ON "Profile"("inviteId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_inviteCode_key" ON "Profile"("inviteCode");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "Invite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
