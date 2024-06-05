-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_walletId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "walletId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
