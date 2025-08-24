import { Outlet } from "react-router-dom";
import { TopNavigation } from "./TopNavigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;