import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Bell 
} from "lucide-react";


const topNavItems = [
  { title: "Carbon Insight", href: "/carbon", icon: Leaf },
  { title: "Activity Feed", href: "/activity", icon: Bell },
];

export const TopNavigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b bg-card/95 backdrop-blur-sm relative z-10">
      <div className="flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img src="/lovable-uploads/10e38df7-16f7-43df-88df-1b1ab96a7a8c.png" alt="Logo" className="h-8 w-auto" />
        </Link>
        
        <div className="flex items-center space-x-1">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                asChild
                className="h-9 w-9 p-0"
              >
                <Link to={item.href}>
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};