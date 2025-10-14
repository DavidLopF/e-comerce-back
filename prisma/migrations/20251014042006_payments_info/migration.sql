/*
  Warnings:

  - You are about to drop the column `icon` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `payments` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "icon",
DROP COLUMN "type",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentMethod" TEXT NOT NULL;
