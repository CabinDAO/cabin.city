-- CreateEnum
CREATE TYPE "CitizenshipStatus" AS ENUM ('VouchRequested', 'Vouched', 'Verified');

-- CreateEnum
CREATE TYPE "ProfileContactFieldType" AS ENUM ('Email', 'Website', 'Discord', 'Farcaster', 'Twitter', 'Instagram', 'Telegram', 'Lens', 'LinkedIn');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('Caretaker', 'Builder', 'Gatherer', 'Naturalist', 'Creator', 'Resident');

-- CreateEnum
CREATE TYPE "RoleLevel" AS ENUM ('Apprentice', 'Artisan', 'Custodian');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Outpost', 'Neighborhood');

-- CreateEnum
CREATE TYPE "LocationMediaCategory" AS ENUM ('Sleeping', 'Working', 'Features');

-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('PaidColiving', 'Residency', 'CabinWeek');

-- CreateEnum
CREATE TYPE "OfferPriceInterval" AS ENUM ('FlatFee', 'Hourly', 'Daily', 'Weekly', 'Monthly');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Paid', 'Error');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('Text', 'ProfileCreated', 'RoleAdded', 'BadgeAdded', 'CitizenshipVerified', 'LocationPublished', 'OfferCreated', 'VouchRequested');

-- CreateEnum
CREATE TYPE "BlockSyncType" AS ENUM ('CabinToken', 'Hats', 'Otterspace');

-- CreateEnum
CREATE TYPE "BlockSyncStatus" AS ENUM ('Pending', 'Successful', 'Failed');

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "faunaId" TEXT,
    "address" CHAR(42) NOT NULL,
    "cabinTokenBalance" DECIMAL(78,18) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hat" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "faunaId" TEXT,
    "hatsProtocolId" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "imageUri" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Hat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletHat" (
    "id" SERIAL NOT NULL,
    "walletId" INTEGER NOT NULL,
    "hatId" INTEGER NOT NULL,

    CONSTRAINT "WalletHat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "faunaId" TEXT,
    "otterspaceBadgeId" TEXT NOT NULL,
    "walletId" INTEGER NOT NULL,
    "specId" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeSpec" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "faunaId" TEXT,
    "otterspaceSpecId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "BadgeSpec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "privyDID" TEXT NOT NULL,
    "walletId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "mailingListOptIn" BOOLEAN,
    "isProfileSetupFinished" BOOLEAN NOT NULL DEFAULT false,
    "isProfileSetupDismissed" BOOLEAN NOT NULL DEFAULT false,
    "voucherId" INTEGER,
    "citizenshipStatus" "CitizenshipStatus",
    "citizenshipTokenId" INTEGER,
    "citizenshipMintedAt" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "profileId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "contractAddress" CHAR(42),
    "network" TEXT,
    "title" TEXT,
    "tokenId" TEXT,
    "tokenUri" TEXT,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "ProfileContactField" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" INTEGER NOT NULL,
    "type" "ProfileContactFieldType" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ProfileContactField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" INTEGER NOT NULL,
    "walletHatId" INTEGER,
    "type" "RoleType" NOT NULL,
    "level" "RoleLevel" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bannerImageIpfsHash" TEXT NOT NULL,
    "caretakerId" INTEGER NOT NULL,
    "caretakerEmail" TEXT,
    "sleepCapacity" INTEGER NOT NULL,
    "internetSpeedMbps" INTEGER NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "locationId" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "formattedAddress" TEXT,
    "streetNumber" TEXT,
    "route" TEXT,
    "routeShort" TEXT,
    "locality" TEXT,
    "admininstrativeAreaLevel1" TEXT,
    "admininstrativeAreaLevel1Short" TEXT,
    "country" TEXT,
    "countryShort" TEXT,
    "postalCode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "LocationVote" (
    "profileId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "LocationVote_pkey" PRIMARY KEY ("profileId","locationId")
);

-- CreateTable
CREATE TABLE "LocationMediaItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipfsHash" TEXT NOT NULL,
    "category" "LocationMediaCategory" NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "LocationMediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "type" "OfferType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "priceInterval" "OfferPriceInterval" NOT NULL,
    "applicationUrl" TEXT NOT NULL,
    "imageIpfsHash" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferMediaItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "offerId" INTEGER NOT NULL,
    "ipfsHash" TEXT NOT NULL,

    CONSTRAINT "OfferMediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "offerId" INTEGER NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "agreedToCOC" BOOLEAN NOT NULL DEFAULT false,
    "agreedToTerms" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL,
    "stripePaymentIntentClientSecret" TEXT,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "profileId" INTEGER NOT NULL,
    "text" TEXT,
    "badgeId" INTEGER,
    "roleId" INTEGER,
    "roleTransactionId" TEXT,
    "citizenshipTokenId" INTEGER,
    "locationId" INTEGER,
    "offerId" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityReaction" (
    "profileId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityReaction_pkey" PRIMARY KEY ("profileId","activityId")
);

-- CreateTable
CREATE TABLE "BlockSyncAttempt" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "BlockSyncType" NOT NULL,
    "startBlock" DECIMAL(9,0) NOT NULL,
    "endBlock" DECIMAL(9,0) NOT NULL,
    "status" "BlockSyncStatus" NOT NULL,
    "failedAttemptCount" INTEGER NOT NULL,

    CONSTRAINT "BlockSyncAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_faunaId_key" ON "Wallet"("faunaId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_address_key" ON "Wallet"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Hat_faunaId_key" ON "Hat"("faunaId");

-- CreateIndex
CREATE UNIQUE INDEX "Hat_hatsProtocolId_key" ON "Hat"("hatsProtocolId");

-- CreateIndex
CREATE UNIQUE INDEX "WalletHat_walletId_hatId_key" ON "WalletHat"("walletId", "hatId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_faunaId_key" ON "Badge"("faunaId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_otterspaceBadgeId_key" ON "Badge"("otterspaceBadgeId");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_walletId_specId_key" ON "Badge"("walletId", "specId");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeSpec_faunaId_key" ON "BadgeSpec"("faunaId");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeSpec_otterspaceSpecId_key" ON "BadgeSpec"("otterspaceSpecId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_externId_key" ON "Profile"("externId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_privyDID_key" ON "Profile"("privyDID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_walletId_key" ON "Profile"("walletId");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_profileId_key" ON "Avatar"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_walletHatId_key" ON "Role"("walletHatId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_profileId_type_key" ON "Role"("profileId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Location_externId_key" ON "Location"("externId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_locationId_key" ON "Address"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "LocationMediaItem_locationId_category_ipfsHash_key" ON "LocationMediaItem"("locationId", "category", "ipfsHash");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_externId_key" ON "Offer"("externId");

-- CreateIndex
CREATE UNIQUE INDEX "OfferMediaItem_offerId_ipfsHash_key" ON "OfferMediaItem"("offerId", "ipfsHash");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_externId_key" ON "Cart"("externId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_stripePaymentIntentClientSecret_key" ON "Cart"("stripePaymentIntentClientSecret");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_externId_key" ON "Activity"("externId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_key_key" ON "Activity"("key");

-- CreateIndex
CREATE INDEX "BlockSyncAttempt_type_status_idx" ON "BlockSyncAttempt"("type", "status");

-- AddForeignKey
ALTER TABLE "WalletHat" ADD CONSTRAINT "WalletHat_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletHat" ADD CONSTRAINT "WalletHat_hatId_fkey" FOREIGN KEY ("hatId") REFERENCES "Hat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_specId_fkey" FOREIGN KEY ("specId") REFERENCES "BadgeSpec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileContactField" ADD CONSTRAINT "ProfileContactField_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_walletHatId_fkey" FOREIGN KEY ("walletHatId") REFERENCES "WalletHat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_caretakerId_fkey" FOREIGN KEY ("caretakerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationVote" ADD CONSTRAINT "LocationVote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationVote" ADD CONSTRAINT "LocationVote_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationMediaItem" ADD CONSTRAINT "LocationMediaItem_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferMediaItem" ADD CONSTRAINT "OfferMediaItem_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "Badge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityReaction" ADD CONSTRAINT "ActivityReaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityReaction" ADD CONSTRAINT "ActivityReaction_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
