import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Accounts pages
import AccountsList from "./pages/accounts/AccountsList";
import AccountDetail from "./pages/accounts/AccountDetail";
import TransactionDetail from "./pages/accounts/TransactionDetail";
import SubscriptionsList from "./pages/accounts/SubscriptionsList";
import ConnectBank from "./pages/accounts/ConnectBank";
import ManageConsents from "./pages/accounts/ManageConsents";

// Planning pages
import GoalsDashboard from "./pages/planning/GoalsDashboard";
import GoalDetail from "./pages/planning/GoalDetail";
import NewGoal from "./pages/planning/NewGoal";
import BudgetsOverview from "./pages/planning/BudgetsOverview";
import BudgetDetail from "./pages/planning/BudgetDetail";
import NewBudget from "./pages/planning/NewBudget";
import ChallengesDashboard from "./pages/planning/ChallengesDashboard";
import ChallengeDetail from "./pages/planning/ChallengeDetail";
import ChallengeDiscovery from "./pages/planning/ChallengeDiscovery";
import NewChallenge from "./pages/planning/NewChallenge";
import SmartRulesDashboard from "./pages/planning/SmartRulesDashboard";
import RuleDetail from "./pages/planning/RuleDetail";
import NewRule from "./pages/planning/NewRule";
import SimulationView from "./pages/planning/SimulationView";

// Other pages
import Forecast from "./pages/Forecast";

// Carbon pages
import CarbonOverview from "./pages/carbon/CarbonOverview";
import CategoryBreakdown from "./pages/carbon/CategoryBreakdown";
import TransactionContribution from "./pages/carbon/TransactionContribution";
import SustainableActions from "./pages/carbon/SustainableActions";

// Activity pages
import UnifiedFeed from "./pages/activity/UnifiedFeed";
import InsightDetail from "./pages/activity/InsightDetail";
import ChallengeUpdate from "./pages/activity/ChallengeUpdate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            
            {/* Accounts routes */}
            <Route path="accounts" element={<AccountsList />} />
            <Route path="accounts/:accountId" element={<AccountDetail />} />
            <Route path="accounts/:accountId/transactions/:transactionId" element={<TransactionDetail />} />
            <Route path="accounts/subscriptions" element={<SubscriptionsList />} />
            <Route path="accounts/connect" element={<ConnectBank />} />
            <Route path="accounts/consents" element={<ManageConsents />} />
            
            {/* Planning routes */}
            <Route path="planning" element={<GoalsDashboard />} />
            <Route path="planning/goals" element={<GoalsDashboard />} />
            <Route path="planning/goals/:goalId" element={<GoalDetail />} />
            <Route path="planning/goals/new" element={<NewGoal />} />
            <Route path="planning/budgets" element={<BudgetsOverview />} />
            <Route path="planning/budgets/:budgetId" element={<BudgetDetail />} />
            <Route path="planning/budgets/new" element={<NewBudget />} />
            <Route path="planning/challenges" element={<ChallengesDashboard />} />
            <Route path="planning/challenges/:challengeId" element={<ChallengeDetail />} />
            <Route path="planning/challenges/discover" element={<ChallengeDiscovery />} />
            <Route path="planning/challenges/new" element={<NewChallenge />} />
            <Route path="planning/rules" element={<SmartRulesDashboard />} />
            <Route path="planning/rules/:ruleId" element={<RuleDetail />} />
            <Route path="planning/rules/new" element={<NewRule />} />
            <Route path="planning/simulation" element={<SimulationView />} />
            
            {/* Forecast routes */}
            <Route path="forecast" element={<Forecast />} />
            
            {/* Carbon routes */}
            <Route path="carbon" element={<CarbonOverview />} />
            <Route path="carbon/categories" element={<CategoryBreakdown />} />
            <Route path="carbon/transactions" element={<TransactionContribution />} />
            <Route path="carbon/actions" element={<SustainableActions />} />
            
            {/* Activity routes */}
            <Route path="activity" element={<UnifiedFeed />} />
            <Route path="activity/insights/:insightId" element={<InsightDetail />} />
            <Route path="activity/challenges/:challengeId" element={<ChallengeUpdate />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
