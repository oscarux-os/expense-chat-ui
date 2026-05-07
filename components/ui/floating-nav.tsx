"use client"

import { SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingNavProps {
  onNewChat: () => void
}

export function FloatingNav({ onNewChat }: FloatingNavProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onNewChat}
      aria-label="Nytt utlägg"
      className="fixed left-4 top-4 z-50"
    >
      <SquarePen className="size-4" />
    </Button>
  )
}
