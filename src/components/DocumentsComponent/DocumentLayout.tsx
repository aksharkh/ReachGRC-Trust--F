import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
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

const DocsSectionLayout = ({
  title,
  items,
}: DocsSectionLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-full relative">
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-[#ff831c] text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen((o) => !o)}
      >
        <HiMenuAlt2 size={20} />
      </button>

      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/10 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-64 md:w-[22%] h-full
          bg-white dark:bg-zinc-900
          border-r border-[#dee3ea] dark:border-zinc-700
          flex flex-col gap-1 p-4 pt-6
          transition-transform duration-200
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          overflow-y-auto
        `}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff611a] px-2 mb-2">
          {title}
        </p>

        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 
              ${
                isActive
                  ? "bg-black text-white font-medium"
                  : "text-zinc-600 hover:ml-1 dark:text-zinc-400 hover:bg-[#f9f1ea] dark:hover:bg-zinc-800 hover:text-[#ff611a] dark:hover:text-[#ff831c]"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto bg-white dark:bg-zinc-950">
        <Outlet />
      </main>
    </div>
  );
};

export default DocsSectionLayout;