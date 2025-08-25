// Mock data based on Chloe Davies' financial profile
export interface UserProfile {
  userId: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  monthlyNetIncome: number;
  settings: {
    lowBalanceThreshold: number;
  };
}

export interface Account {
  accountId: string;
  institutionName: string;
  institutionLogoUrl: string;
  accountName: string;
  accountType: 'CURRENT' | 'SAVINGS' | 'CREDIT_CARD' | 'E_MONEY';
  balance: {
    amount: number;
    currency: string;
  };
  accountNumber: {
    iban: string | null;
    maskedCardNumber: string | null;
  };
  isAggregated: boolean;
  lastRefreshed: string;
}

export interface Transaction {
  transactionId: string;
  accountId: string;
  date: string;
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING';
  merchant: {
    name: string;
    logoUrl: string;
  };
  category: {
    primary: string;
    subCategory: string;
  };
  enrichment: {
    comment: string | null;
    tags: string[];
    isFlagged: boolean;
    isExcludedFromReports: boolean;
  };
  originalDescription: string;
}

export interface Goal {
  goalId: string;
  name: string;
  icon: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  linkedAccountId: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PAUSED';
}

export interface Budget {
  budgetId: string;
  category: string;
  targetAmount: number;
  spentAmount: number;
  period: string;
  trackedAccountIds: string[];
}

export interface Challenge {
  challengeId: string;
  name: string;
  icon: string;
  description: string;
  type: 'STREAK' | 'SPEND_LIMIT';
  status: 'ACTIVE' | 'COMPLETED_SUCCESS' | 'COMPLETED_FAILED' | 'PAUSED';
  startDate: string;
  endDate: string;
  progress: {
    streakInDays?: number;
    spentAmount?: number;
    targetAmount?: number;
  };
}

export interface SmartMoneyRule {
  ruleId: string;
  name: string;
  icon: string;
  description: string;
  type: 'ROUND_UP' | 'PERCENTAGE_SPEND' | 'FIXED_TRANSFER';
  status: 'ACTIVE' | 'PAUSED';
  config: {
    sourceAccountIds: string[];
    destinationGoalId: string;
    roundUpToNearest?: number;
    percentage?: number;
    merchants?: string[];
    fixedAmount?: number;
  };
}

export interface CashflowForecast {
  upcomingTransactions: Array<{
    date: string;
    merchant: string;
    amount: number;
    type: 'PATTERN' | 'CONFIRMED';
  }>;
}

export interface CarbonFootprint {
  period: string;
  totalFootprintTonnes: number;
  peerComparisonPercentage: number;
  categoryBreakdown: Array<{
    category: string;
    tonnesCO2e: number;
  }>;
}

export interface ActivityFeedItem {
  timestamp: string;
  itemType: 'TRANSACTION' | 'CHALLENGE_UPDATE' | 'SMART_RULE' | 'INSIGHT';
  payload: {
    transactionId?: string;
    title?: string;
    message?: string;
    linkedChallengeId?: string;
    linkedRuleId?: string;
    insightType?: string;
  };
}

export const mockData = {
  userProfile: {
    userId: "user_chloe_davies_01",
    name: "Chloe Davies",
    age: 28,
    location: "Manchester, UK",
    occupation: "Freelance Graphic Designer",
    monthlyNetIncome: 2600,
    settings: {
      lowBalanceThreshold: 100
    }
  } as UserProfile,

  accounts: [
    {
      accountId: "acc_barclays_current_01",
      institutionName: "Barclays",
      institutionLogoUrl: "https://logo.clearbit.com/barclays.co.uk",
      accountName: "Current Account",
      accountType: "CURRENT" as const,
      balance: { amount: 1450.78, currency: "GBP" },
      accountNumber: { iban: "GB29BARC20038455779911", maskedCardNumber: null },
      isAggregated: false,
      lastRefreshed: "2025-08-24T21:45:00Z"
    },
    {
      accountId: "acc_monzo_savings_01",
      institutionName: "Monzo",
      institutionLogoUrl: "https://logo.clearbit.com/monzo.com",
      accountName: "Savings Account",
      accountType: "SAVINGS" as const,
      balance: { amount: 6585.00, currency: "GBP" },
      accountNumber: { iban: "GB29MONZ04000411111111", maskedCardNumber: null },
      isAggregated: true,
      lastRefreshed: "2025-08-24T21:40:00Z"
    },
    {
      accountId: "acc_amex_credit_01",
      institutionName: "American Express",
      institutionLogoUrl: "https://logo.clearbit.com/americanexpress.com",
      accountName: "Credit Card",
      accountType: "CREDIT_CARD" as const,
      balance: { amount: -412.50, currency: "GBP" },
      accountNumber: { iban: null, maskedCardNumber: "•••• 1005" },
      isAggregated: true,
      lastRefreshed: "2025-08-24T21:42:00Z"
    },
    {
      accountId: "acc_revolut_fx_01",
      institutionName: "Revolut",
      institutionLogoUrl: "https://logo.clearbit.com/revolut.com",
      accountName: "Travel FX",
      accountType: "E_MONEY" as const,
      balance: { amount: 215.30, currency: "EUR" },
      accountNumber: { iban: "GB29REVO00996911111111", maskedCardNumber: null },
      isAggregated: true,
      lastRefreshed: "2025-08-24T21:35:00Z"
    }
  ] as Account[],

  transactions: [
    {
      transactionId: "txn_111",
      accountId: "acc_amex_credit_01",
      date: "2025-08-24",
      amount: -3.50,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Starbucks", logoUrl: "https://logo.clearbit.com/starbucks.com" },
      category: { primary: "Dining Out", subCategory: "Coffee Shops" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "STARBUCKS 8122 MANCHESTER"
    },
    {
      transactionId: "txn_112",
      accountId: "acc_barclays_current_01",
      date: "2025-08-24",
      amount: -2.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "TfGM", logoUrl: "/icons/tfgm.png" },
      category: { primary: "Transport", subCategory: "Public Transport" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "TFGMMETROLINK"
    },
    {
      transactionId: "txn_113",
      accountId: "acc_amex_credit_01",
      date: "2025-08-23",
      amount: -45.60,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Tesco", logoUrl: "https://logo.clearbit.com/tesco.com" },
      category: { primary: "Groceries", subCategory: "Supermarkets" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "TESCO STORES 3122 MANCHESTER"
    },
    {
      transactionId: "txn_114",
      accountId: "acc_barclays_current_01",
      date: "2025-08-23",
      amount: -45.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "PureGym Manchester", logoUrl: "https://logo.clearbit.com/puregym.com" },
      category: { primary: "Fitness", subCategory: "Gym" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "DD: PUREGYM LTD"
    },
    {
      transactionId: "txn_115",
      accountId: "acc_amex_credit_01",
      date: "2025-08-22",
      amount: -75.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "ASOS.com", logoUrl: "https://logo.clearbit.com/asos.com" },
      category: { primary: "Shopping", subCategory: "Fashion" },
      enrichment: { comment: "New boots for autumn", tags: ["fashion", "boots"], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "ASOS.COM 80621 LONDON GB"
    },
    {
      transactionId: "txn_116",
      accountId: "acc_amex_credit_01",
      date: "2025-08-22",
      amount: -18.50,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Honest Burgers", logoUrl: "https://logo.clearbit.com/honestburgers.co.uk" },
      category: { primary: "Dining Out", subCategory: "Restaurants" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "HONEST BURGERS MANCHESTER"
    },
    {
      transactionId: "txn_117",
      accountId: "acc_barclays_current_01",
      date: "2025-08-20",
      amount: -10.99,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Netflix", logoUrl: "https://logo.clearbit.com/netflix.com" },
      category: { primary: "Bills & Subscriptions", subCategory: "Streaming" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "NETFLIX.COM"
    },
    {
      transactionId: "txn_118",
      accountId: "acc_barclays_current_01",
      date: "2025-08-15",
      amount: 750.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Manchester Agency Ltd", logoUrl: "/icons/agency.png" },
      category: { primary: "Income", subCategory: "Client Payment" },
      enrichment: { comment: "Retainer", tags: ["client-work"], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "BACS: MANCHESTER AGENCY"
    },
    {
      transactionId: "txn_119",
      accountId: "acc_barclays_current_01",
      date: "2025-08-15",
      amount: -50.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Adobe Creative Cloud", logoUrl: "https://logo.clearbit.com/adobe.com" },
      category: { primary: "Bills & Subscriptions", subCategory: "Software" },
      enrichment: { comment: null, tags: ["work", "software"], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "Adobe Systems"
    },
    {
      transactionId: "txn_120",
      accountId: "acc_barclays_current_01",
      date: "2025-08-10",
      amount: -250.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Transfer to Monzo", logoUrl: "/icons/transfer.png" },
      category: { primary: "Transfers", subCategory: "Savings" },
      enrichment: { comment: "House Deposit Savings", tags: [], isFlagged: false, isExcludedFromReports: true },
      originalDescription: "FPIO: C DAVIES MONZO"
    },
    {
      transactionId: "txn_121",
      accountId: "acc_monzo_savings_01",
      date: "2025-08-10",
      amount: 250.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Transfer from Barclays", logoUrl: "/icons/transfer.png" },
      category: { primary: "Transfers", subCategory: "Savings" },
      enrichment: { comment: "House Deposit Savings", tags: [], isFlagged: false, isExcludedFromReports: true },
      originalDescription: "FPII: C DAVIES BARC"
    },
    {
      transactionId: "txn_122",
      accountId: "acc_barclays_current_01",
      date: "2025-08-05",
      amount: -500.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "American Express", logoUrl: "https://logo.clearbit.com/americanexpress.com" },
      category: { primary: "Transfers", subCategory: "Credit Card Payment" },
      enrichment: { comment: "July Statement", tags: [], isFlagged: false, isExcludedFromReports: true },
      originalDescription: "DD: AMEX"
    },
    {
      transactionId: "txn_123",
      accountId: "acc_amex_credit_01",
      date: "2025-08-05",
      amount: 500.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Payment Received", logoUrl: "/icons/payment.png" },
      category: { primary: "Transfers", subCategory: "Credit Card Payment" },
      enrichment: { comment: "Thank you, C DAVIES", tags: [], isFlagged: false, isExcludedFromReports: true },
      originalDescription: "PAYMENT RECEIVED - BARCLAYS"
    },
    {
      transactionId: "txn_124",
      accountId: "acc_revolut_fx_01",
      date: "2025-08-02",
      amount: -15.50,
      currency: "EUR",
      status: "COMPLETED" as const,
      merchant: { name: "Bolt Food", logoUrl: "https://logo.clearbit.com/bolt.eu" },
      category: { primary: "Dining Out", subCategory: "Food Delivery" },
      enrichment: { comment: null, tags: ["travel", "lisbon"], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "Bolt Food Lisbon"
    },
    {
      transactionId: "txn_125",
      accountId: "acc_barclays_current_01",
      date: "2025-08-01",
      amount: 1850.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Upwork Ltd", logoUrl: "https://logo.clearbit.com/upwork.com" },
      category: { primary: "Income", subCategory: "Freelance" },
      enrichment: { comment: "July Invoices", tags: ["client-work", "freelance"], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "BACS: UPWORK GLOBAL"
    },
    {
      transactionId: "txn_126",
      accountId: "acc_barclays_current_01",
      date: "2025-08-01",
      amount: -900.00,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "UrbanLiving Apartments", logoUrl: "/icons/rent.png" },
      category: { primary: "Housing", subCategory: "Rent" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "DD: URBANLIVING"
    },
    {
      transactionId: "txn_127",
      accountId: "acc_monzo_savings_01",
      date: "2025-07-31",
      amount: 5.40,
      currency: "GBP",
      status: "COMPLETED" as const,
      merchant: { name: "Interest Payment", logoUrl: "/icons/interest.png" },
      category: { primary: "Income", subCategory: "Interest" },
      enrichment: { comment: null, tags: [], isFlagged: false, isExcludedFromReports: false },
      originalDescription: "Monthly Interest"
    }
  ] as Transaction[],

  goals: [
    {
      goalId: "goal_house_deposit_01",
      name: "House Deposit",
      icon: "🏡",
      targetAmount: 20000,
      currentAmount: 6000,
      targetDate: "2029-12-31",
      linkedAccountId: "acc_monzo_savings_01",
      status: "ACTIVE" as const
    },
    {
      goalId: "goal_lisbon_trip_01",
      name: "Lisbon Trip",
      icon: "✈️",
      targetAmount: 1200,
      currentAmount: 500,
      targetDate: "2026-02-28",
      linkedAccountId: "acc_monzo_savings_01",
      status: "ACTIVE" as const
    },
    {
      goalId: "goal_camera_01",
      name: "New Camera",
      icon: "📷",
      targetAmount: 800,
      currentAmount: 800,
      targetDate: "2025-05-31",
      linkedAccountId: "acc_monzo_savings_01",
      status: "COMPLETED" as const
    }
  ] as Goal[],

  budgets: [
    {
      budgetId: "budget_groceries_aug25",
      category: "Groceries",
      targetAmount: 300,
      spentAmount: 280,
      period: "2025-08",
      trackedAccountIds: ["acc_barclays_current_01", "acc_amex_credit_01"]
    },
    {
      budgetId: "budget_dining_aug25",
      category: "Dining Out",
      targetAmount: 120,
      spentAmount: 150,
      period: "2025-08",
      trackedAccountIds: ["acc_barclays_current_01", "acc_amex_credit_01"]
    },
    {
      budgetId: "budget_shopping_aug25",
      category: "Shopping",
      targetAmount: 150,
      spentAmount: 135,
      period: "2025-08",
      trackedAccountIds: ["acc_amex_credit_01"]
    },
    {
      budgetId: "budget_transport_aug25",
      category: "Transport",
      targetAmount: 80,
      spentAmount: 40,
      period: "2025-08",
      trackedAccountIds: ["acc_barclays_current_01"]
    }
  ] as Budget[],

  challenges: [
    {
      challengeId: "ch_no_coffee_aug25",
      name: "No Takeaway Coffee",
      icon: "☕",
      description: "Avoid spending at coffee shops for 30 days.",
      type: "STREAK" as const,
      status: "ACTIVE" as const,
      startDate: "2025-08-18",
      endDate: "2025-09-16",
      progress: { streakInDays: 7 }
    },
    {
      challengeId: "ch_groceries_aug25",
      name: "Groceries under £300",
      icon: "🛒",
      description: "Keep your total grocery spending below the £300 budget.",
      type: "SPEND_LIMIT" as const,
      status: "ACTIVE" as const,
      startDate: "2025-08-01",
      endDate: "2025-08-31",
      progress: { spentAmount: 280, targetAmount: 300 }
    },
    {
      challengeId: "ch_lunch_jul25",
      name: "Reduce Lunch Spending",
      icon: "🥗",
      description: "Spend less than £50 on weekday lunches.",
      type: "SPEND_LIMIT" as const,
      status: "COMPLETED_SUCCESS" as const,
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      progress: { spentAmount: 45, targetAmount: 50 }
    }
  ] as Challenge[],

  smartMoneyRules: [
    {
      ruleId: "smr_round_up_01",
      name: "Round-up",
      icon: "🪙",
      description: "Rounds up card spending and moves the spare change to your Lisbon Trip goal.",
      type: "ROUND_UP" as const,
      status: "ACTIVE" as const,
      config: {
        sourceAccountIds: ["acc_barclays_current_01", "acc_amex_credit_01"],
        destinationGoalId: "goal_lisbon_trip_01",
        roundUpToNearest: 1.00
      }
    },
    {
      ruleId: "smr_fashion_tax_01",
      name: "Fashion Tax",
      icon: "🛍️",
      description: "Moves 5% of ASOS & Zara purchases to your House Deposit goal.",
      type: "PERCENTAGE_SPEND" as const,
      status: "ACTIVE" as const,
      config: {
        sourceAccountIds: ["acc_amex_credit_01"],
        destinationGoalId: "goal_house_deposit_01",
        percentage: 5,
        merchants: ["ASOS", "Zara"]
      }
    }
  ] as SmartMoneyRule[],

  cashflowForecast: {
    upcomingTransactions: [
      { date: "2025-08-25", merchant: "Spotify", amount: -9.99, type: "PATTERN" as const },
      { date: "2025-09-01", merchant: "Upwork Ltd", amount: 1850.00, type: "PATTERN" as const },
      { date: "2025-09-01", merchant: "UrbanLiving Apartments", amount: -900.00, type: "CONFIRMED" as const },
      { date: "2025-09-03", merchant: "Octopus Energy", amount: -120.00, type: "CONFIRMED" as const },
      { date: "2025-09-05", merchant: "Manchester City Council", amount: -110.00, type: "CONFIRMED" as const },
      { date: "2025-09-06", merchant: "Virgin Media", amount: -40.00, type: "CONFIRMED" as const },
      { date: "2025-09-10", merchant: "EE UK", amount: -35.00, type: "CONFIRMED" as const },
      { date: "2025-09-15", merchant: "Manchester Agency Ltd", amount: 750.00, type: "PATTERN" as const },
      { date: "2025-09-15", merchant: "Adobe Creative Cloud", amount: -50.00, type: "PATTERN" as const },
      { date: "2025-09-20", merchant: "Netflix", amount: -10.99, type: "PATTERN" as const }
    ]
  } as CashflowForecast,

  carbonFootprint: {
    period: "2025-08",
    totalFootprintTonnes: 1.5,
    peerComparisonPercentage: 10,
    categoryBreakdown: [
      { category: "Food & Dining", tonnesCO2e: 0.5 },
      { category: "Fashion", tonnesCO2e: 0.3 },
      { category: "Travel", tonnesCO2e: 0.15 },
      { category: "Other", tonnesCO2e: 0.55 }
    ]
  } as CarbonFootprint,

  activityFeedItems: [
    { timestamp: "2025-08-24T14:30:00Z", itemType: "TRANSACTION" as const, payload: { transactionId: "txn_111" } },
    { timestamp: "2025-08-24T11:05:00Z", itemType: "TRANSACTION" as const, payload: { transactionId: "txn_112" } },
    { timestamp: "2025-08-23T18:00:00Z", itemType: "CHALLENGE_UPDATE" as const, payload: { title: "Great Progress!", message: "You're £20 under your 'Groceries under £300' goal.", linkedChallengeId: "ch_groceries_aug25" } },
    { timestamp: "2025-08-23T16:15:00Z", itemType: "TRANSACTION" as const, payload: { transactionId: "txn_113" } },
    { timestamp: "2025-08-22T20:10:00Z", itemType: "SMART_RULE" as const, payload: { title: "Round-up Savings", message: "Your rule automatically moved £0.50 to your Lisbon Trip goal.", linkedRuleId: "smr_round_up_01" } },
    { timestamp: "2025-08-22T19:00:00Z", itemType: "INSIGHT" as const, payload: { title: "Weekly Report", message: "See your spending summary from last week.", insightType: "WEEKLY_SUMMARY" } },
    { timestamp: "2025-08-22T17:45:00Z", itemType: "TRANSACTION" as const, payload: { transactionId: "txn_115" } }
  ] as ActivityFeedItem[]
};

// Helper functions for easy data access
export const getAccountById = (accountId: string) => 
  mockData.accounts.find(account => account.accountId === accountId);

export const getTransactionsByAccountId = (accountId: string) => 
  mockData.transactions.filter(transaction => transaction.accountId === accountId);

export const getGoalById = (goalId: string) => 
  mockData.goals.find(goal => goal.goalId === goalId);

export const getBudgetsByCategory = (category: string) => 
  mockData.budgets.filter(budget => budget.category === category);

export const getActiveGoals = () => 
  mockData.goals.filter(goal => goal.status === 'ACTIVE');

export const getActiveChallenges = () => 
  mockData.challenges.filter(challenge => challenge.status === 'ACTIVE');

export const getActiveSmartRules = () => 
  mockData.smartMoneyRules.filter(rule => rule.status === 'ACTIVE');

export const getRecentTransactions = (limit: number = 10) => 
  mockData.transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

export const getTotalBalance = () => {
  return mockData.accounts.reduce((total, account) => {
    // Convert EUR to GBP for simple calculation (in real app, use proper exchange rates)
    const amount = account.balance.currency === 'EUR' 
      ? account.balance.amount * 0.85 
      : account.balance.amount;
    return total + amount;
  }, 0);
};

export const getSpendingByCategory = () => {
  const categorySpending: { [key: string]: number } = {};
  
  mockData.transactions
    .filter(t => t.amount < 0 && !t.enrichment.isExcludedFromReports)
    .forEach(transaction => {
      const category = transaction.category.primary;
      categorySpending[category] = (categorySpending[category] || 0) + Math.abs(transaction.amount);
    });
    
  return categorySpending;
};