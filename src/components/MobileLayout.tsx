import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { TopNavigation } from "./TopNavigation";
import { BottomNavigation } from "./BottomNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const MobileLayout = () => {
  const isMobile = useIsMobile();

  const AppContent = () => (
    <div className="flex flex-col h-screen bg-background">
      <TopNavigation />
      <ScrollArea className="flex-1">
        <main className="px-4 py-6 pb-24">
          <Outlet />
        </main>
      </ScrollArea>
      <BottomNavigation />
    </div>
  );

  if (isMobile) {
    return <AppContent />;
  }

  // Desktop view with iPhone frame
  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <div className="relative">
        {/* iPhone frame */}
        <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
            {/* iPhone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-50"></div>
            
            <AppContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;