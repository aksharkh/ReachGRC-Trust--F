import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "@/ThemeContext";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

// Documentation routes metadata for instant client-side searching
const docsPages = [
  { title: "Getting Started", path: "/docs/getting-started/overview" },
  { title: "API Keys", path: "/docs/developers-guide/api-keys" },
  { title: "Company Profile", path: "/docs/developers-guide/company-profile" },
  { title: "Logo Management", path: "/docs/developers-guide/logo-management" },
  { title: "PDF Management", path: "/docs/developers-guide/pdf-management" },
  { title: "Contact Us", path: "/docs/contact-us" },
];

/**
 * DocsNavbar is the top header component for the documentation platform.
 * It contains:
 *   - App logo linking back to home
 *   - Search box filtering docs pages client-side with dropdown results
 *   - Theme switch button (Light/Dark mode)
 */
const DocsNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");

  // Filter docs pages in real-time based on the search query input
  const results = docsPages.filter((page) => {
    return page.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-[#dee3ea] dark:border-zinc-700 w-full h-full px-4 md:px-6 transition-colors duration-200">
      <div className="flex justify-between items-center h-full w-full">

        {/* Logo and Brand Title */}
        <div className="flex gap-2 md:gap-3 items-center h-full">
          <Link
            to="/docs"
            className="text-[#ff611a] font-bold text-lg md:text-xl no-underline"
          >
            ReachGRC
          </Link>
          <span className="hidden sm:block text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 tracking-widest">
            DOCUMENTATION
          </span>
        </div>

        {/* Search Input and Settings Controls */}
        <div className="flex items-center gap-2 md:gap-3 h-[80%]">
          <div className="hidden sm:block relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={14}
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="
                w-56 md:w-80
                h-8
                pl-9 pr-4
                bg-zinc-50
                dark:bg-zinc-800
                border
                border-zinc-200
                dark:border-zinc-700
                rounded-xl
                text-sm
                dark:text-zinc-200
                dark:placeholder-zinc-500
                focus:outline-none
                focus:border-[#ff831c]
                focus:ring-2
                focus:ring-[#ff831c]/20
              "
            />

            {/* Instant Search Dropdown overlay */}
            {query.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 dark:text-white rounded-xl shadow-lg overflow-hidden z-50">
                {results.length > 0 ? (
                  results.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      onClick={() => setQuery("")}
                      className="block px-4 py-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 no-underline text-zinc-800 dark:text-zinc-200"
                    >
                      {page.title}
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-zinc-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Theme toggler */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="h-[80%] aspect-square flex items-center justify-center bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode size={16} />
            ) : (
              <MdOutlineDarkMode size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocsNavbar;