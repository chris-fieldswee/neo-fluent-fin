import React from 'react'
import { Header } from './Header'
import { AccountCarousel } from './AccountCarousel'
import { SafeToSpendSnapshot } from './SafeToSpendSnapshot'
import { GoalsProgress } from './GoalsProgress'
import { BudgetHealth } from './BudgetHealth'
import { UpcomingPayment } from './UpcomingPayment'
import { InsightCard } from './InsightCard'

export function DashboardScreen() {
  return (
    <div className="bg-gray-50 h-[750px] overflow-y-auto w-full">
      <Header />
      <div className="p-4 space-y-4">
        <h1 className="font-medium text-lg text-gray-800">
          Good evening, Chloe 👋
        </h1>
        <AccountCarousel />
        <SafeToSpendSnapshot />
        <GoalsProgress />
        <BudgetHealth />
        <UpcomingPayment />
        <InsightCard />
      </div>
    </div>
  )
}