import React from 'react'
import { Bell, UserCircle } from 'lucide-react'

export function Header() {
  return (
    <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <button className="text-gray-700">
            <Bell size={20} />
          </button>
          <button className="text-gray-700">
            <UserCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}