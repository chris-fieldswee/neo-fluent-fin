import React from 'react'

export function SafeToSpendSnapshot() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
      <h2 className="text-sm font-medium text-blue-100 mb-1">Safe to spend</h2>
      <div className="text-2xl font-bold mb-1">£215</div>
      <p className="text-sm text-blue-100">
        until your next paycheck on the 1st
      </p>
    </div>
  )
}