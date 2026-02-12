-- CreateTable
CREATE TABLE "produk" (
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
    "distributorId" TEXT,
    "brandId" TEXT,
    "kategoriId" TEXT NOT NULL,
    CONSTRAINT "produk_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "distributor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "produk_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "kategori" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produk_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brand" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "penjualan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kode_penjualan" TEXT NOT NULL,
    "metode_bayar" TEXT NOT NULL DEFAULT 'CASH',
    "jumlahtotal" INTEGER NOT NULL,
    "status_penjualan" TEXT NOT NULL DEFAULT 'SELESAI',
    "nilai_diskon" INTEGER,
    "persen_diskon" DECIMAL,
    "keterangan" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "penjualan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PenjualanDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "penjualanId" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PenjualanDetail_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "penjualan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pembelian" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kode_pembelian" TEXT NOT NULL,
    "metode_bayar" TEXT NOT NULL DEFAULT 'TRANSFER',
    "jumlahtotal" INTEGER NOT NULL,
    "status_pembelian" TEXT NOT NULL DEFAULT 'DIPESAN',
    "biaya_kirim" INTEGER,
    "userId" TEXT NOT NULL,
    "distributorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "pembelian_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "distributor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "pembelian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PembelianDetail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pembelianId" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PembelianDetail_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "produk" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PembelianDetail_pembelianId_fkey" FOREIGN KEY ("pembelianId") REFERENCES "pembelian" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kategori" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama_kategori" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama_brand" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "distributor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama_distributor" TEXT NOT NULL,
    "email_distributor" TEXT,
    "alamat_distributor" TEXT,
    "notelp_distributor" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "jurnal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "akun" TEXT NOT NULL,
    "debit" DECIMAL NOT NULL,
    "kredit" DECIMAL NOT NULL,
    "keterangan" TEXT,
    "sumber" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "jurnal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "role" TEXT,
    "tipe" TEXT NOT NULL DEFAULT 'user',
    "banned" BOOLEAN DEFAULT false,
    "banReason" TEXT,
    "banExpires" DATETIME,
    "notelp" TEXT,
    "alamat" TEXT
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" DATETIME,
    "refreshTokenExpiresAt" DATETIME,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "jwks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "expiresAt" DATETIME
);

-- CreateIndex
CREATE INDEX "produk_nama_produk_barcode_idx" ON "produk"("nama_produk", "barcode");

-- CreateIndex
CREATE UNIQUE INDEX "penjualan_kode_penjualan_key" ON "penjualan"("kode_penjualan");

-- CreateIndex
CREATE INDEX "penjualan_kode_penjualan_idx" ON "penjualan"("kode_penjualan");

-- CreateIndex
CREATE UNIQUE INDEX "pembelian_kode_pembelian_key" ON "pembelian"("kode_pembelian");

-- CreateIndex
CREATE INDEX "pembelian_kode_pembelian_idx" ON "pembelian"("kode_pembelian");

-- CreateIndex
CREATE UNIQUE INDEX "kategori_nama_kategori_key" ON "kategori"("nama_kategori");

-- CreateIndex
CREATE INDEX "kategori_nama_kategori_idx" ON "kategori"("nama_kategori");

-- CreateIndex
CREATE UNIQUE INDEX "brand_nama_brand_key" ON "brand"("nama_brand");

-- CreateIndex
CREATE INDEX "brand_nama_brand_idx" ON "brand"("nama_brand");

-- CreateIndex
CREATE INDEX "distributor_nama_distributor_idx" ON "distributor"("nama_distributor");

-- CreateIndex
CREATE INDEX "jurnal_kode_idx" ON "jurnal"("kode");

-- CreateIndex
CREATE INDEX "jurnal_userId_idx" ON "jurnal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_name_email_key" ON "user"("name", "email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
