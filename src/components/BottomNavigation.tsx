import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CreditCard, 
  Target, 
  TrendingUp 
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Accounts", href: "/accounts", icon: CreditCard },
  { title: "Planning", href: "/planning", icon: Target },
  { title: "Forecast", href: "/forecast", icon: TrendingUp },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-around px-4 py-3 safe-area-inset-bottom">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href !== "/" && location.pathname.startsWith(item.href));
          
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              asChild
              className={`flex-1 flex-col h-12 py-2 px-2 rounded-xl min-h-[48px] ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Link to={item.href} className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium font-sans">{item.title}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};