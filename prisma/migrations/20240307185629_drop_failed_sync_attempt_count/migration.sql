/*
  Warnings:

  - You are about to drop the column `failedAttemptCount` on the `BlockSyncAttempt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlockSyncAttempt" DROP COLUMN "failedAttemptCount";
