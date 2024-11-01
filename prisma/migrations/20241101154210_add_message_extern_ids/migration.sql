/*
  Warnings:

  - A unique constraint covering the columns `[externId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "externId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Message_externId_key" ON "Message"("externId");
