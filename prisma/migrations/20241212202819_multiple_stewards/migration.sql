-- CreateTable
CREATE TABLE "LocationSteward" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "LocationSteward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationSteward_locationId_profileId_key" ON "LocationSteward"("locationId", "profileId");

-- AddForeignKey
ALTER TABLE "LocationSteward" ADD CONSTRAINT "LocationSteward_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationSteward" ADD CONSTRAINT "LocationSteward_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
