import React from 'react'
import { AlertTriangle } from 'lucide-react'

export function UpcomingPayment() {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
      <div className="flex items-start">
        <div className="text-orange-500 mr-3 mt-0.5">
          <AlertTriangle size={18} />
        </div>
        <div>
          <h3 className="font-medium text-orange-800 text-sm">Heads up!</h3>
          <p className="text-sm text-orange-700">
            Your £900 Rent is due in 3 days. Your projected balance will be low.
          </p>
        </div>
      </div>
    </div>
  )
}