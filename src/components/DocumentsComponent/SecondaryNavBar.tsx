import { NavLink } from "react-router-dom";

const sections = [
  { label: "Getting Started", path: "/docs/getting-started/overview" },
  { label: "Developers Guide", path: "/docs/developers-guide" },
  { label: "Non-Developers Guide", path: "/docs/non-developers-guide" },
  { label: "Contact Us", path: "/docs/contact-us" },
  { label: "Tutorial", path: "/docs/tutorial" },
  { label: "Status", path: "/docs/status" },
];

const SecondaryBar = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 flex border-b border-[#dee3ea] dark:border-zinc-700 items-center w-full h-full px-4 md:px-6 overflow-x-auto transition-colors duration-200">
      <div className="flex gap-1 md:gap-2 w-max h-[80%]">
        {sections.map((section) => (
          <NavLink
            key={section.path}
            to={section.path}
            className={({ isActive }) =>
              `text-xs md:text-sm whitespace-nowrap px-2 md:px-3 py-1 rounded cursor-pointer flex items-center transition-all
              ${
                isActive
                  ? "bg-[#fff0e6] dark:bg-zinc-800 text-[#ff611a] font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-[#dee3ea] dark:hover:bg-zinc-800"
              }`
            }
          >
            {section.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SecondaryBar;