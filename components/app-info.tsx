"use client"

export function AppInfo() {
// const name = process.env.NEXT_PUBLIC_APP_NAME
const versi = process.env.NEXT_PUBLIC_APP_VERSION

  return (
    <div className="text-sm text-muted-foreground">
      <span>v.{versi}</span>
    </div>
  )
}
