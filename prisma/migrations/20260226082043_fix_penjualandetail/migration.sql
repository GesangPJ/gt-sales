-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PenjualanDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "penjualanId" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PenjualanDetail_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "produk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PenjualanDetail_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "penjualan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PenjualanDetail" ("createdAt", "harga", "id", "jumlah", "penjualanId", "produkId", "total", "updatedAt") SELECT "createdAt", "harga", "id", "jumlah", "penjualanId", "produkId", "total", "updatedAt" FROM "PenjualanDetail";
DROP TABLE "PenjualanDetail";
ALTER TABLE "new_PenjualanDetail" RENAME TO "PenjualanDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
