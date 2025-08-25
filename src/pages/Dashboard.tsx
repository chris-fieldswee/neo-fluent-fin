import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ChevronRight, X, CheckCircle, AlertTriangle } from "lucide-react";
import { mockData } from "@/lib/mockData";

const Dashboard = () => {
  const { userProfile, accounts, goals, budgets, cashflowForecast } = mockData;
  
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
        <h1 className="text-xl font-semibold text-primary-content">
          {getGreeting()}, {userProfile.name.split(' ')[0]} 👋
        </h1>
      </div>

      {/* Accounts Carousel */}
      <div className="px-4">
        <h2 className="text-base font-medium text-secondary-content mb-3">Accounts</h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {accounts.map((account) => (
              <CarouselItem key={account.accountId} className="pl-2 basis-[280px]">
                <Link to={`/accounts/${account.accountId}`}>
                  <Card className="bg-surface border-border/20 hover:border-border/40 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={account.institutionLogoUrl} 
                          alt={account.institutionName}
                          className="w-8 h-8 rounded-lg object-contain"
                        />
                        <div>
                          <p className="font-medium text-primary-content text-sm">
                            {account.institutionName}
                          </p>
                          <p className="text-xs text-secondary-content">
                            {account.accountName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {account.accountType === 'CREDIT_CARD' ? (
                          <p className="text-lg font-semibold text-primary-content tabular-nums">
                            Spent: £{Math.abs(account.balance.amount).toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-lg font-semibold text-primary-content tabular-nums">
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
      </div>

      {/* Safe to Spend */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-primary to-primary-variant text-white border-0">
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
          <h2 className="text-base font-medium text-primary-content">Goals Progress</h2>
          <Link to="/planning/goals">
            <Button variant="ghost" size="sm" className="text-accent-blue text-sm p-0 h-auto">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {activeGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <Card key={goal.goalId} className="bg-surface border-border/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{goal.icon}</span>
                      <span className="font-medium text-primary-content text-sm">{goal.name}</span>
                    </div>
                    <span className="text-sm text-secondary-content tabular-nums">
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
        <h2 className="text-base font-medium text-primary-content mb-3">Budget Health</h2>
        <div className="space-y-3">
          {keyBudgets.map((budget) => {
            const isOverBudget = budget.spentAmount > budget.targetAmount;
            const difference = Math.abs(budget.targetAmount - budget.spentAmount);
            return (
              <Card key={budget.budgetId} className="bg-surface border-border/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isOverBudget ? 'bg-sentiment-warning/10' : 'bg-sentiment-positive/10'
                      }`}>
                        {budget.category === 'Groceries' ? '🛒' : '🍴'}
                      </div>
                      <div>
                        <p className="font-medium text-primary-content text-sm">{budget.category}</p>
                        <p className="text-xs text-secondary-content">
                          {isOverBudget ? 'Over budget' : 'Under budget'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isOverBudget ? (
                        <AlertTriangle className="w-4 h-4 text-sentiment-warning" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-sentiment-positive" />
                      )}
                      <span className={`font-semibold text-sm tabular-nums ${
                        isOverBudget ? 'text-sentiment-warning' : 'text-sentiment-positive'
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
          <Card className="bg-sentiment-warning/5 border-sentiment-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-sentiment-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-primary-content text-sm mb-1">Heads up!</p>
                    <p className="text-sm text-secondary-content">
                      Your £{Math.abs(upcomingPayment.amount)} {upcomingPayment.merchant} is due in 3 days. Your projected balance will be low.
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-secondary-content">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insight Card */}
      <div className="px-4">
        <Card className="bg-gradient-to-br from-accent-mint/10 to-accent-mint/5 border-accent-mint/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-mint/20 flex items-center justify-center">
                <span className="text-sm">💰</span>
              </div>
              <div>
                <p className="text-sm text-primary-content">
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