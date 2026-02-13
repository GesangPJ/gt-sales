/*
  Warnings:

  - You are about to drop the column `jenis` on the `kategori` table. All the data in the column will be lost.
  - Added the required column `jenis_kategori` to the `kategori` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kategori" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama_kategori" TEXT NOT NULL,
    "jenis_kategori" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_kategori" ("createdAt", "id", "isActive", "nama_kategori", "updatedAt") SELECT "createdAt", "id", "isActive", "nama_kategori", "updatedAt" FROM "kategori";
DROP TABLE "kategori";
ALTER TABLE "new_kategori" RENAME TO "kategori";
CREATE UNIQUE INDEX "kategori_nama_kategori_key" ON "kategori"("nama_kategori");
CREATE INDEX "kategori_nama_kategori_idx" ON "kategori"("nama_kategori");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
