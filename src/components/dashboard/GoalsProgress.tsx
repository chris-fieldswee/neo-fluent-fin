import React from 'react'
import { ChevronRight } from 'lucide-react'
import { mockData } from '@/lib/mockData'

export function GoalsProgress() {
  const activeGoals = mockData.goals.filter(goal => goal.status === 'ACTIVE').slice(0, 2)

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-medium text-gray-700">Goals Progress</h2>
        <button className="text-xs text-blue-500 flex items-center">
          View All <ChevronRight size={14} />
        </button>
      </div>
      <div className="space-y-3">
        {activeGoals.map((goal) => {
          const percentComplete = Math.round((goal.currentAmount / goal.targetAmount) * 100)
          return (
            <div key={goal.goalId}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="mr-2">{goal.icon}</span>
                  <span className="text-sm font-medium">{goal.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  £{goal.currentAmount.toLocaleString()} / £{goal.targetAmount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${percentComplete}%`,
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}