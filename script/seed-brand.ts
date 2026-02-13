// Seed data brand

import prisma from "@/lib/prisma"

async function SeedBrand(){

    try{
        const data_brand = await prisma.brand.createMany({
            data:[
                { nama_brand: "Apple"},
                { nama_brand: "Samsung"},
                { nama_brand: "Sony"  },
                { nama_brand: "LG"  },
                { nama_brand: "Dell"  },
                { nama_brand: "HP"  },
                { nama_brand: "Asus"  },
                { nama_brand: "Acer"  },
                { nama_brand: "Microsoft"  },
                { nama_brand: "Lenovo"  },
                { nama_brand: "Bitdefender"  },
                { nama_brand: "Norton"  },
                { nama_brand: "Kaspersky"  },
                { nama_brand: "Indomie"  },
                { nama_brand: "Mie Sedap"  },
                { nama_brand: "Mayora"  },
                { nama_brand: "GarudaFood"  },
                { nama_brand: "Corsair"  },
                { nama_brand: "Logitech"  },
                { nama_brand: "Razer"  },
                { nama_brand: "SteelSeries"  },
                { nama_brand: "Maspion"  },
                { nama_brand: "Polytron"  },
                { nama_brand: "Cosmos"  },
                { nama_brand: "Philips"  },
                { nama_brand: "Panasonic"  },
                { nama_brand: "Toshiba"  },
                { nama_brand: "Sharp"  },
                { nama_brand: "Canon"  },
                { nama_brand: "Nikon"  },
                { nama_brand: "Epson" },
                { nama_brand: "MSI"  },
                { nama_brand: "Gigabyte"  },
                { nama_brand: "ASRock"  },
                { nama_brand: "Zotac",  },
                { nama_brand: "Seagate",  },
                { nama_brand: "Western Digital" },
                { nama_brand: "Coca-Cola" },
                { nama_brand: "Pepsi"  },
                { nama_brand: "Sprite"  },
                { nama_brand: "Fanta"  },
                { nama_brand: "Intel" },
                { nama_brand: "AMD"  },
                { nama_brand: "Nvidia"  },
                { nama_brand: "LianLi"  },
                { nama_brand: "Supermicro"  },
                { nama_brand: "Moza Racing"  },
                { nama_brand: "Thrustmaster"  },
                { nama_brand: "Gskill"  },
                { nama_brand: "SanDisk"  },
                { nama_brand: "Kingston"  },
                { nama_brand: "Seasonic"  },
                { nama_brand: "Cooler Master"  },
                { nama_brand: "Adata"  },
                { nama_brand: "Tp-link" },
                { nama_brand: "D-Link" },
                { nama_brand: "Netgear" },
                { nama_brand: "Linksys"  },
                { nama_brand: "Ubiquiti"  },
                { nama_brand: "Huawei"  },
                { nama_brand: "Cisco"  },
                { nama_brand: "Xiaomi"  },
                { nama_brand: "Oppo"  },
                { nama_brand: "Vivo"  },
                { nama_brand: "Realme"  },
                { nama_brand: "OnePlus"  },
            ]
        })
        console.log("Seeding brand selesai:", data_brand)

    }catch(error){
        console.error(error)
    }finally{
        await prisma.$disconnect()
    }
}

SeedBrand()


