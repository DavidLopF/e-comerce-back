/*
  Warnings:

  - You are about to drop the column `description` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reference]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payments" DROP COLUMN "description",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reference" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_reference_key" ON "public"."payments"("reference");
