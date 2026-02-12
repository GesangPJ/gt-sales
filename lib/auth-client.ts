import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins"

export const authClient =  createAuthClient({
    basePath: "/api/v1/auth",
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
