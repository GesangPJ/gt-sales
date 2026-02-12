
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
    const session = await auth.api.getSession({
    headers: await headers(),
  })

    // jika sudah ada session, langsung ke kasir
    if (session) {
    redirect("/kasir")
    }
return (
    <div>
        <LoginForm/>
    </div>
)
}