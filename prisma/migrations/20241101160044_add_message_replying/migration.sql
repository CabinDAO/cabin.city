/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `externId` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "inReplyToId" INTEGER,
ALTER COLUMN "externId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_inReplyToId_fkey" FOREIGN KEY ("inReplyToId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
