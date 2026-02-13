// Seed data distributor

import prisma from "@/lib/prisma"

async function seedDistributor(){

    try{

        const data_distributor = await prisma.distributor.createMany({
            data:[
                {
                    nama_distributor:"PRABU 28",
                    email_distributor:"sales@prabu28.com",
                    alamat_distributor:"BSD",
                    notelp_distributor:"021-69696969",
                },
                {
                    nama_distributor:"Multipro",
                    email_distributor:"sales@multipro.co.id",
                },
                {
                    nama_distributor:"Jaya Utama Santikah",
                    email_distributor:"sales@jayasantika.com",
                },
            ]
        })

        console.log("Berhasil seed distributor", data_distributor)


    }catch(error:any){
        console.error(error)
    }finally{
        await prisma.$disconnect()
    }
}

seedDistributor()
