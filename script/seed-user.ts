// Script seed akun user

import { auth } from "@/lib/auth"

async function registerUser(){
    const ADMIN_EMAIL = "user@email.com"
    const ADMIN_PASSWORD = "user12345678"
    const ADMIN_NAME = "User test 01"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"user",
            },
        })

        const newAdmin = result.user

        console.log("Akun User berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT AKUN 1:");
        console.error(error.message);
    }
}

async function registerUser2(){
    const ADMIN_EMAIL = "user2@email.com"
    const ADMIN_PASSWORD = "user12345678"
    const ADMIN_NAME = "User test 02"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"user",
            },
        })

        const newAdmin = result.user

        console.log("Akun User 2 berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT AKUN 2:");
        console.error(error.message);
    }
}

async function registerUser3(){
    const ADMIN_EMAIL = "user3@email.com"
    const ADMIN_PASSWORD = "user12345678"
    const ADMIN_NAME = "User test 03"

    try{
        
        const result = await auth.api.signUpEmail({
            body:{
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                tipe:"user",
            },
        })

        const newAdmin = result.user

        console.log("Akun User 3 berhasil dibuat")
        console.log(`📧 Email:    ${newAdmin?.email}`)
        console.log(`👤 Nama:     ${newAdmin?.name}`)
        console.log(`🎭 Tipe:     ${newAdmin?.tipe}`)
        console.log(`📝 Password: ${ADMIN_PASSWORD}`)


    }catch(error: any){
        console.error("❌ ERROR MEMBUAT AKUN 3:");
        console.error(error.message);
    }
}


registerUser()
registerUser2()


