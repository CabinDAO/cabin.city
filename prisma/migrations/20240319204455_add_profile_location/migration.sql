-- CreateTable
CREATE TABLE "ProfileAddress" (
    "profileId" INTEGER NOT NULL,
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

    CONSTRAINT "ProfileAddress_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileAddress_profileId_key" ON "ProfileAddress"("profileId");

-- AddForeignKey
ALTER TABLE "ProfileAddress" ADD CONSTRAINT "ProfileAddress_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
