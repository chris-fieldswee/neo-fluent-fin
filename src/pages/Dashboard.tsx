import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { ChevronRight, X, CheckCircle, AlertTriangle } from "lucide-react";
import { mockData } from "@/lib/mockData";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { userProfile, accounts, goals, budgets, cashflowForecast } = mockData;
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Calculate safe to spend (simplified)
  const safeToSpend = 215;
  
  // Filter active goals with progress
  const activeGoals = goals.filter(goal => goal.status === 'ACTIVE').slice(0, 2);
  
  // Get budget health for key categories
  const keyBudgets = budgets.filter(budget => 
    ['Groceries', 'Dining Out'].includes(budget.category)
  );

  // Get upcoming payment alert
  const upcomingPayment = cashflowForecast.upcomingTransactions
    .filter(tx => tx.amount < 0 && new Date(tx.date) <= new Date('2025-09-04'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div className="space-y-4 pb-6">
      {/* Greeting */}
      <div className="px-4 pt-2">
        <h1 className="text-xl font-semibold text-gray-900">
          {getGreeting()}, {userProfile.name.split(' ')[0]} 👋
        </h1>
      </div>

      {/* Accounts Carousel */}
      <div className="px-4">
        <h2 className="text-base font-medium text-gray-700 mb-3">Accounts</h2>
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-2">
            {accounts.map((account) => (
              <CarouselItem key={account.accountId} className="pl-2 basis-[280px]">
                <Link to={`/accounts/${account.accountId}`}>
                  <Card className="bg-white shadow-sm border-gray-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={account.institutionLogoUrl} 
                          alt={account.institutionName}
                          className="w-8 h-8 rounded-lg object-contain"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {account.institutionName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {account.accountName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {account.accountType === 'CREDIT_CARD' ? (
                          <p className="text-lg font-semibold text-gray-900 tabular-nums">
                            Spent: £{Math.abs(account.balance.amount).toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-lg font-semibold text-gray-900 tabular-nums">
                            {account.balance.currency === 'EUR' ? '€' : '£'}{account.balance.amount.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Carousel Dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index + 1 === current ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Safe to Spend */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm opacity-90">Safe to spend</p>
              <p className="text-3xl font-semibold tabular-nums">£{safeToSpend}</p>
              <p className="text-sm opacity-90">until your next paycheck on the 1st</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Progress */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-medium text-gray-900">Goals Progress</h2>
          <Link to="/planning/goals">
            <Button variant="ghost" size="sm" className="text-blue-600 text-sm p-0 h-auto">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {activeGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <Card key={goal.goalId} className="bg-white shadow-sm border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{goal.icon}</span>
                      <span className="font-medium text-gray-900 text-sm">{goal.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 tabular-nums">
                      £{goal.currentAmount.toLocaleString()} / £{goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Budget Health */}
      <div className="px-4">
        <h2 className="text-base font-medium text-gray-900 mb-3">Budget Health</h2>
        <div className="space-y-3">
          {keyBudgets.map((budget) => {
            const isOverBudget = budget.spentAmount > budget.targetAmount;
            const difference = Math.abs(budget.targetAmount - budget.spentAmount);
            return (
              <Card key={budget.budgetId} className="bg-white shadow-sm border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isOverBudget ? 'bg-orange-50' : 'bg-green-50'
                      }`}>
                        {budget.category === 'Groceries' ? '🛒' : '🍴'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{budget.category}</p>
                        <p className="text-xs text-gray-500">
                          {isOverBudget ? 'Over budget' : 'Under budget'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isOverBudget ? (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className={`font-semibold text-sm tabular-nums ${
                        isOverBudget ? 'text-orange-500' : 'text-green-500'
                      }`}>
                        £{difference}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Upcoming Payment Alert */}
      {upcomingPayment && (
        <div className="px-4">
          <Card className="bg-orange-50 border-orange-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm mb-1">Heads up!</p>
                    <p className="text-sm text-gray-600">
                      Your £{Math.abs(upcomingPayment.amount)} {upcomingPayment.merchant} is due in 3 days. Your projected balance will be low.
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insight Card */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm">💰</span>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  Your Round-up rule just moved £0.50 to your Lisbon trip after your Starbucks purchase. Great job! ✈️
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;