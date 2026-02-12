import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins"
import { switchAPI } from "./select-API"

export const authClient =  createAuthClient({
    basePath: `${switchAPI}/auth`,
    fetchOptions: {
        credentials: "include",
    },
    plugins:[
    inferAdditionalFields({
        user:{
            notelp: { type: "string", required: false, input:true, },
            alamat: { type: "string", required: false, input: true, },
            tipe: {
                type: "string", 
                required: true,
                input: true,
            },
        }
    }),
    adminClient(),
    ]
})
