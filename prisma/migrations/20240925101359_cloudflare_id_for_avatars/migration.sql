
-- ALTER TABLE "Profile" RENAME COLUMN "avatarUrl" TO "avatarCfId";

ALTER TABLE "Profile" ADD COLUMN "avatarCfId" TEXT NOT NULL DEFAULT '';

UPDATE "Profile"
SET "avatarCfId" = SUBSTRING("avatarUrl" FROM 'https://imagedelivery.net/[^/]+/([^/]+)/')
WHERE "avatarUrl" LIKE 'https://imagedelivery.net/%';