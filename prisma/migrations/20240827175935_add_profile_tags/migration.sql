-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
