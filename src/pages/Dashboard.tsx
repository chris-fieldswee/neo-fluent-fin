import React from 'react'
import { AccountCarousel } from '@/components/dashboard/AccountCarousel'
import { SafeToSpendSnapshot } from '@/components/dashboard/SafeToSpendSnapshot'
import { GoalsProgress } from '@/components/dashboard/GoalsProgress'
import { BudgetHealth } from '@/components/dashboard/BudgetHealth'
import { UpcomingPayment } from '@/components/dashboard/UpcomingPayment'
import { InsightCard } from '@/components/dashboard/InsightCard'

const Dashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="p-4 pb-24 space-y-4">
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
};

export default Dashboard;