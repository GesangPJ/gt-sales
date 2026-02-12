// Script membuat akun admin

import { auth } from "@/lib/auth"

async function registerAdmin1(){
    const ADMIN_EMAIL = "admin@email.com"
    const ADMIN_PASSWORD = "admin12345678"
    const ADMIN_NAME = "Admin test 01"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"admin",
            },
        })

        const newAdmin = result.user

        console.log("Admin 1 berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT ADMIN 1:");
        console.error(error.message);
    }
}
async function registerAdmin2(){
    const ADMIN_EMAIL = "admin2@email.com"
    const ADMIN_PASSWORD = "admin12345678"
    const ADMIN_NAME = "Admin test 02"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"admin",
            },
        })

        const newAdmin = result.user

        console.log("Admin 2 berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT ADMIN 2:");
        console.error(error.message);
    }
}

registerAdmin1()
registerAdmin2()


