/*
  Warnings:

  - You are about to drop the column `distributorId` on the `produk` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama_produk" TEXT NOT NULL,
    "barcode" TEXT,
    "harga_jual" INTEGER NOT NULL,
    "harga_beli" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "keterangan" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "brandId" TEXT,
    "kategoriId" TEXT NOT NULL,
    CONSTRAINT "produk_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "kategori" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produk_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "produk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produk" ("barcode", "brandId", "createdAt", "harga_beli", "harga_jual", "id", "isActive", "kategoriId", "keterangan", "nama_produk", "stok", "updatedAt", "userId") SELECT "barcode", "brandId", "createdAt", "harga_beli", "harga_jual", "id", "isActive", "kategoriId", "keterangan", "nama_produk", "stok", "updatedAt", "userId" FROM "produk";
DROP TABLE "produk";
ALTER TABLE "new_produk" RENAME TO "produk";
CREATE INDEX "produk_nama_produk_barcode_idx" ON "produk"("nama_produk", "barcode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
