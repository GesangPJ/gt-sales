import { betterAuth, APIError } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "@/lib/prisma"
import { jwt, admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js"
import { switchAPI } from "./select-API"

export const auth = betterAuth({
  
  database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
 basePath: `${switchAPI}/auth`,
 emailAndPassword: { 
        enabled: true,
        autoSignIn: false,  
  },
  user: {
    changeEmail: {
            enabled: true,
        },
    deleteUser: { 
        enabled: true
    },
    additionalFields: {
      notelp: { type: "string", required: false, input:true, },
      alamat: { type: "string", required: false, input: true, },
      tipe: {
        type: "string", 
        required: true,
        defaultValue: "user",
        input: true,
      },
    },
  },
  
  trustedOrigins: [
    "http://localhost:3000",
    "http://192.168.1.3:3000",
    "http://192.168.*:3000",
  ],
  plugins: [ 
        jwt(),
        nextCookies(),
        admin(),
    ] 
})