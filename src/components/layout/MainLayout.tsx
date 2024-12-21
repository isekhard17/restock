import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar - Full width */}
      <div className={`fixed top-0 right-0 z-10 w-full transition-all duration-200 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />
      </div>
      
      {/* Content wrapper */}
      <div className="flex pt-16">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <Sidebar 
            isCollapsed={isSidebarCollapsed} 
            onToggle={(collapsed) => setIsSidebarCollapsed(collapsed)} 
          />
        </div>
        
        {/* Main content - Adjusted margin and padding */}
        <main className={`flex-1 transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } p-6 pb-20 lg:pb-6`}>
          <Outlet />
        </main>

        {/* Mobile Navigation */}
        <MobileNavigation />
      </div>
    </div>
  );
};

export default MainLayout;