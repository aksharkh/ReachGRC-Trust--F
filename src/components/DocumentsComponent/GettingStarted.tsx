import { NavLink, Outlet } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlinePlayLesson, MdOutlineContactSupport } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { TbDatabaseImport } from "react-icons/tb";
import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";

const sideBarItems = [
  { label: "Overview",                    path: "overview",                icon: <GrOverview /> },
  { label: "Get started for users",       path: "get-started-for-users",   icon: <HiOutlineLightBulb /> },
  { label: "Tutorials",                   path: "tutorials",               icon: <MdOutlinePlayLesson /> },
  { label: "Concepts for administrators", path: "concepts-for-admins",     icon: <RiAdminLine /> },
  { label: "Sample data",                 path: "sample-data",             icon: <TbDatabaseImport /> },
  { label: "Contact us",                  path: "contact-us",              icon: <MdOutlineContactSupport /> },
];

const GettingStarted = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-full relative">

      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-50 bg-[#ff831c] text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen((o) => !o)}
        aria-label="Toggle sidebar"
      >
        <HiMenuAlt2 size={20} />
      </button>

      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          w-64 md:w-[22%] h-full md:h-full
          bg-white dark:bg-zinc-900
          border-r border-[#dee3ea] dark:border-zinc-700
          flex flex-col gap-1 p-4 pt-6
          transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto
        `}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500 px-2 mb-2">
          Getting Started
        </p>

        {sideBarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150
              ${
                isActive
                  ? "bg-[#ff831c] text-white font-medium"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-[#f9f1ea] dark:hover:bg-zinc-800 hover:text-[#ff611a] dark:hover:text-[#ff831c]"
              }`
            }
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </aside>

      {/* Main content — Outlet renders the matched sub-route */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-white dark:bg-zinc-950 transition-colors duration-200">
        <Outlet />
      </main>

    </div>
  );
};

export default GettingStarted;