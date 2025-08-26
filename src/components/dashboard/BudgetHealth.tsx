import React from 'react'
import { ShoppingBag, Utensils } from 'lucide-react'
import { mockData } from '@/lib/mockData'

export function BudgetHealth() {
  // Get specific budgets for groceries and dining out
  const groceriesBudget = mockData.budgets.find(b => b.category === 'Groceries')
  const diningBudget = mockData.budgets.find(b => b.category === 'Dining Out')

  const budgets = [
    {
      id: 1,
      name: 'Groceries',
      status: groceriesBudget ? (groceriesBudget.spentAmount < groceriesBudget.targetAmount ? 'under' : 'over') : 'under',
      amount: groceriesBudget ? Math.abs(groceriesBudget.targetAmount - groceriesBudget.spentAmount) : 20,
      icon: <ShoppingBag size={16} />,
    },
    {
      id: 2,
      name: 'Dining Out',
      status: diningBudget ? (diningBudget.spentAmount < diningBudget.targetAmount ? 'under' : 'over') : 'over',
      amount: diningBudget ? Math.abs(diningBudget.spentAmount - diningBudget.targetAmount) : 30,
      icon: <Utensils size={16} />,
    },
  ]

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h2 className="text-sm font-medium text-gray-700 mb-3">Budget Health</h2>
      <div className="space-y-3">
        {budgets.map((budget) => (
          <div key={budget.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${budget.status === 'under' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}
              >
                {budget.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{budget.name}</div>
                <div className="text-xs text-gray-500">
                  {budget.status === 'under' ? 'Under budget' : 'Over budget'}
                </div>
              </div>
            </div>
            <div
              className={`font-medium ${budget.status === 'under' ? 'text-green-600' : 'text-orange-600'}`}
            >
              {budget.status === 'under' ? '✅' : '⚠️'} £{budget.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}