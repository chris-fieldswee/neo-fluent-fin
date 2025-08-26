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
    <div className="bg-gray-50 min-h-screen w-full">
      <Header />
      <div className="px-4 pt-4 pb-24 space-y-4">
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