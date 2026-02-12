
// Komponen switch untuk dark mode
"use client"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"


export function SwitchDarkMode(){
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-6 w-11 bg-blue-300 rounded-full animate-pulse" />
    }

    const isDark = theme === "dark"


    return(
        <div className="flex items-center gap-2 px-2 py-1.5">
           <Switch 
                id="dark-mode"
                checked={isDark}
                onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light")
                }}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
    )
}
