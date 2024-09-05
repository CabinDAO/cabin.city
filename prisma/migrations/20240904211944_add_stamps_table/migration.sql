CREATE TABLE "Stamp" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stamp_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProfileStamp" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" INTEGER NOT NULL,
    "stampId" INTEGER NOT NULL,

    CONSTRAINT "ProfileStamp_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProfileStamp_profileId_stampId_key" ON "ProfileStamp"("profileId", "stampId");

ALTER TABLE "ProfileStamp" ADD CONSTRAINT "ProfileStamp_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProfileStamp" ADD CONSTRAINT "ProfileStamp_stampId_fkey" FOREIGN KEY ("stampId") REFERENCES "Stamp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- migrate badge specs to stamps
INSERT INTO "Stamp" ("id", "createdAt", "updatedAt", name) SELECT "id", "createdAt", "updatedAt", "name" FROM "BadgeSpec";

-- connect badges to profiles from badge data
INSERT INTO "ProfileStamp" ("createdAt", "stampId", "profileId") SELECT b."createdAt", b."specId", p.id FROM "Badge" b inner join "Profile" p on p."walletId" = b."walletId";


ALTER TABLE "Activity" ADD COLUMN "profileStampId" INTEGER;
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_profileStampId_fkey" FOREIGN KEY ("profileStampId") REFERENCES "ProfileStamp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TYPE "ActivityType" ADD VALUE 'StampAdded';
