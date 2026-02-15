"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

export type StokCellProps = {
  id: string
  originalStok: number
  value: number
  // onChange: (value: number) => void
  onCommit: (value: number) => void
}

export default function StokCell({
  originalStok,
  value,
  onCommit,
}: StokCellProps) {
  const [isEditing, setIsEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [localValue, setLocalValue] = useState(value.toString())

   useEffect(() => {
    if (isEditing) {
      setLocalValue(value.toString())
    }
  }, [isEditing, value])

  const commit = () => {
    const num = Number(localValue)
    onCommit(Number.isNaN(num) ? originalStok : num)
    setIsEditing(false)
  }

  const cancel = () => {
    setLocalValue(originalStok.toString())
    setIsEditing(false)
  }

  // klik di luar → commit
  useEffect(() => {
    if (!isEditing) return

    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        commit()
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isEditing, localValue])

  return (
    <div
      ref={ref}
      className="pl-2"
      // onDoubleClick={() => setIsEditing(true)}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <Input
          type="number"
          autoFocus
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit()
            if (e.key === "Escape") cancel()
          }}
          className="w-20 h-8"
        />
      ) : (
        <span className="cursor-pointer hover:bg-muted px-1 rounded">
          {value}
        </span>
      )}
    </div>
  )
}
