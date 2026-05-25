"use client"

import { ResetPasswordCard } from '@/components/cards/ResetPasswordCard' // Проверьте путь импорта

export default function page() {
  
  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <ResetPasswordCard />
    </div>
  )
}