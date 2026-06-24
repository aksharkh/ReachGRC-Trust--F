
import { Outlet } from "react-router-dom";
import DocsNavbar from "@/components/docs/DocsNavbar";
import DocsSubNavbar from "@/components/docs/DocsSubNavbar";

/**
 * DocsLayout is the global wrapper component for all documentation pages.
 * It provides a fixed, 2-tier header:
 *   1. DocsNavbar (Top Branding, Search, Theme Toggle)
 *   2. DocsSubNavbar (Secondary horizontal tabs for categories/guides)
 * 
 * Below the header, it uses a flexible container with an `<Outlet />`
 * to dynamically render the current sub-route content.
 */
const DocsLayout = () => {
  return (
    <div className="w-screen flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
 
      {/* Top nav + secondary sub-nav bar — always visible (takes 15% height) */}
      <div className="flex-shrink-0 w-full" style={{ height: "15%" }}>
        <div className="h-[50%] w-full">
          <DocsNavbar />
        </div>
        <div className="h-[50%] w-full">
          <DocsSubNavbar />
        </div>
      </div>
 
      {/* Main content viewport — scrolls independently per route */}
      <div className="flex-1 w-full overflow-hidden">
        <Outlet />
      </div>
 
    </div>
  );
};

export default DocsLayout;