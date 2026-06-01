import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-zinc-900 border-b border-[#dee3ea] dark:border-zinc-700 w-full h-full px-4 md:px-6 overflow-hidden transition-colors duration-200">
      <div className="flex justify-between items-center h-full w-full">

        {/* Logo */}
        <div className="flex gap-2 md:gap-3 items-center h-full">
          <p className="text-[#ff611a] font-bold text-lg md:text-xl">ReachGRC</p>
          <span className="hidden sm:block text-xs md:text-sm font-bold text-zinc-700 dark:text-zinc-300 tracking-widest">
            DOCUMENTATION
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-3 h-[80%]">
          <input
            placeholder="Search docs..."
            className="hidden sm:block w-40 md:w-64 h-full bg-[#f7f7f7] dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500 border rounded-md border-[#dee3ea] dark:border-zinc-700 text-sm px-3 focus:outline-none focus:ring-1 focus:ring-[#ff831c] transition-colors"
          />

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="h-full aspect-square flex items-center justify-center bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-full hover:opacity-80 transition-opacity"
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

export default NavBar;