import React from 'react'
import { TrendingUp } from 'lucide-react'

export function InsightCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
          <TrendingUp size={16} />
        </div>
        <h2 className="text-sm font-medium text-gray-700">Insight</h2>
      </div>
      <p className="text-sm text-gray-600">
        Your Round-up rule just moved £0.50 to your Lisbon trip after your
        Starbucks purchase. Great job! ✈️
      </p>
    </div>
  )
}