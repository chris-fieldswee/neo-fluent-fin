import React from 'react'
import { mockData } from '@/lib/mockData'

export function AccountCarousel() {
  const accounts = mockData.accounts

  return (
    <div className="mb-2">
      <h2 className="text-sm font-medium text-gray-500 mb-2">Accounts</h2>
      <div className="flex overflow-x-auto pb-2 gap-3 -mx-4 px-4">
        {accounts.map((account) => (
          <div key={account.accountId} className="min-w-[160px] flex-shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 mr-2">
                  <img
                    src={account.institutionLogoUrl}
                    alt={account.institutionName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {account.institutionName}
                </span>
              </div>
              <div className="text-sm text-gray-500">{account.accountName}</div>
              <div className="mt-1 font-semibold">
                {account.accountType === 'CREDIT_CARD'
                  ? `Spent: ${account.balance.currency}${Math.abs(account.balance.amount).toFixed(2)}`
                  : `${account.balance.currency === 'GBP' ? '£' : '€'}${account.balance.amount.toFixed(2)}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}