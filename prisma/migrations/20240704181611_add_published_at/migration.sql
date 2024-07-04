-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "publishedAt" TIMESTAMP(3);
UPDATE "Location" SET "publishedAt" = "createdAt";
