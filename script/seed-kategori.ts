// Seed Kategori

import prisma  from "@/lib/prisma"

async function SeedKategori(){

    try{
        const kategori = await prisma.kategori.createMany({
            data:[
                {
                    nama_kategori: "Beras",
                    jenis_kategori: "SEMBAKO",
                },
                {
                    nama_kategori: "Minyak Goreng",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Telur",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Tepung",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Mie Instant",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Garam",
                    jenis_kategori: "SEMBAKO",
                   
                },
                {
                    nama_kategori: "Gula Pasir",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Kopi",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Minuman Susu",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Susu Bubuk",
                    jenis_kategori: "SEMBAKO",
                   
                },
                {
                    nama_kategori: "Minuman Ringan",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Makanan Ringan",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Cokelat",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori: "Detergent",
                    jenis_kategori: "SEMBAKO",
                   
                },
                {
                    nama_kategori: "Sabun Mandi",
                    jenis_kategori: "SEMBAKO",
                    
                },
                {
                    nama_kategori:"CPU",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                 {
                    nama_kategori:"Smartphone",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                 {
                    nama_kategori:"Smart TV",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                 {
                    nama_kategori:"Kulkas",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                 {
                    nama_kategori:"Mesin Cuci",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                 {
                    nama_kategori:"Laptop",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                {
                    nama_kategori:"Mouse",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                {
                    nama_kategori:"Keyboard",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                {
                    nama_kategori:"Monitor",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
                {
                    nama_kategori:"VGA Card",
                    jenis_kategori: "ELEKTRONIK",
                    
                },
            ]
        })

        console.log(`Seed Data Kategori berhasil`, kategori)

    }catch(error: any){
        console.error(`Error seed kategori`, error)
    }finally{
        await prisma.$disconnect
    }
}

SeedKategori().catch((e)=>{
    console.error(e)
    process.exit(1)
})


