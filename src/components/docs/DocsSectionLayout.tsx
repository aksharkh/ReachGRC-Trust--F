import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { HiMenuAlt2 } from "react-icons/hi";

export interface SidebarItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface DocsSectionLayoutProps {
  title: string;
  items: SidebarItem[];
}

/**
 * DocsSectionLayout renders the sidebar navigation on the left and documentation
 * content (using `<Outlet />`) on the right.
 * 
 * Features:
 *   - Sidebar items with dynamic NavLink active classes (black bg / hover effects)
 *   - Automatic scroll-to-top on route change using a React `useRef` pointing to the main container
 *   - Responsive mobile overlay sidebar togglable by a floating button
 */
const DocsSectionLayout = ({ title, items }: DocsSectionLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Reset scroll to top on every route change to keep reading position correct
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex w-full h-full relative">
      {/* Mobile Drawer Toggle Button */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-[#ff831c] text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setSidebarOpen((o) => !o)}
      >
        <HiMenuAlt2 size={20} />
      </button>

      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/10 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Navigation Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-64 md:w-[22%] h-full
          bg-white dark:bg-zinc-900
          border-r border-[#dee3ea] dark:border-zinc-700
          flex flex-col gap-1 p-4 pt-6
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto
        `}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff611a] px-2 mb-2 select-none">
          {title}
        </p>

        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            onClick={() => setSidebarOpen(false)}
          >
            {({ isActive }) => (
              <span
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 w-full cursor-pointer
                  ${
                    isActive
                      ? "bg-black text-white font-medium dark:bg-zinc-800"
                      : "text-zinc-600 hover:ml-1 dark:text-zinc-400 hover:bg-[#f9f1ea] dark:hover:bg-zinc-800 hover:text-[#ff611a] dark:hover:text-[#ff831c]"
                  }`}
              >
                <span
                  className={`text-xl font-bold flex-shrink-0 transition-colors ${
                    isActive ? "text-white" : "text-[#ff611a]"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </span>
            )}
          </NavLink>
        ))}
      </aside>

      {/* Main Documentation Page Viewport */}
      <main
        ref={mainRef}
        className="flex-1 min-w-0 overflow-y-auto bg-white dark:bg-zinc-950"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DocsSectionLayout;