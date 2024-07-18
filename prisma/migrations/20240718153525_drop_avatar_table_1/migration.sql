-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '';

-- Copy over existing data
UPDATE "Profile" SET "avatarUrl" = a.url FROM "Avatar" a WHERE "Profile".id = a."profileId";
