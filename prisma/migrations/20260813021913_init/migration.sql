-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "pricingMode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "notes" TEXT,
    "weightGrams" REAL,
    "purity" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "purchasePrice" INTEGER NOT NULL,
    "purchaseDate" DATETIME NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Asset_category_idx" ON "Asset"("category");
