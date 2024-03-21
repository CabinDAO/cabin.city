-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "neighborhoodId" INTEGER;

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "externId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Neighborhood_externId_key" ON "Neighborhood"("externId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

insert into "Neighborhood" ("updatedAt", "externId", name, lat, lng) values
  (now(), 'nh_Lc7wrvaEPQi5HkJa4dkz', 'Spy Pond (Arlington, MA)',42.4153925,-71.1564729),
  (now(), 'nh_o2vvJ8GqssgwZkCgbsyR', 'Larkspur, CA', 37.9340915, -122.5352539),
  (now(), 'nh_K1dMbVevuru4bjg6qTM2', 'North Boulder Park (Boulder, CO)',40.0149856,-105.2705456),
  (now(), 'nh_qNTBU2qRCumbEDByjvkJ', 'Oakland, CA',37.8043514,-122.2711639),
  (now(), 'nh_gGF8U2mUqabusg8HhjPi', 'Eden Forest Collective (Ojai, CA)',34.4480495,-119.242889),
  (now(), 'nh_c8vEaJEJDnyKfbs5BADY', 'Curiosity Courtyard (Venice, CA)', 33.9850469, -118.4694832);
