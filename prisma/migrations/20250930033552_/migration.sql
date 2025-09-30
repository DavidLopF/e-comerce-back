/*
  Warnings:

  - You are about to drop the column `category` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId,slug,categoryId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."products_storeId_slug_key";

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_storeId_slug_categoryId_key" ON "public"."products"("storeId", "slug", "categoryId");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
