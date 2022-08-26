/*
  Warnings:

  - Made the column `sender` on table `notification_email` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipient` on table `notification_email` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notification_email" ALTER COLUMN "sender" SET NOT NULL,
ALTER COLUMN "recipient" SET NOT NULL;
