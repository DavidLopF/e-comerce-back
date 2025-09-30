/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Images";

-- DropTable
DROP TABLE "public"."Product";

-- CreateTable
CREATE TABLE "public"."stores" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "description" TEXT,
    "slogan" TEXT,
    "logo" TEXT,
    "favicon" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "discount" INTEGER DEFAULT 0,
    "priceCents" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "category" TEXT,
    "storeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."store_configs" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "theme" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "seo" JSONB NOT NULL,
    "checkout" JSONB NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."hero_slides" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "imageUrlMobile" TEXT,
    "ctaText" TEXT,
    "ctaLink" TEXT,
    "ctaStyle" TEXT NOT NULL DEFAULT 'primary',
    "secondaryCtaText" TEXT,
    "secondaryCtaLink" TEXT,
    "secondaryCtaStyle" TEXT,
    "alignment" TEXT NOT NULL DEFAULT 'left',
    "backgroundColor" TEXT,
    "textColor" TEXT,
    "overlay" BOOLEAN NOT NULL DEFAULT false,
    "overlayOpacity" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."menu_items" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT,
    "badge" TEXT,
    "parentId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."social_media" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipping_methods" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "priceCents" INTEGER NOT NULL DEFAULT 0,
    "estimatedDays" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipping_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."store_admins" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "passwordHash" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."config_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "theme" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "seo" JSONB NOT NULL,
    "checkout" JSONB NOT NULL,
    "category" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_slug_key" ON "public"."stores"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "stores_domain_key" ON "public"."stores"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "products_storeId_slug_key" ON "public"."products"("storeId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "store_configs_storeId_key" ON "public"."store_configs"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_storeId_platform_key" ON "public"."social_media"("storeId", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "store_admins_email_key" ON "public"."store_admins"("email");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store_configs" ADD CONSTRAINT "store_configs_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hero_slides" ADD CONSTRAINT "hero_slides_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_items" ADD CONSTRAINT "menu_items_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."menu_items" ADD CONSTRAINT "menu_items_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."menu_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."social_media" ADD CONSTRAINT "social_media_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipping_methods" ADD CONSTRAINT "shipping_methods_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_methods" ADD CONSTRAINT "payment_methods_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."store_admins" ADD CONSTRAINT "store_admins_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
