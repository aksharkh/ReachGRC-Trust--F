import React from "react";

// ── Card ──────────────────────────────────────────────────────────────────────
interface CardProps {
  badge?: string;
  title: string;
  description: string;
  href?: string;
}

export const Card: React.FC<CardProps> = ({ badge, title, description, href = "#" }) => (
  <a
    href={href}
    className="block bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-5 hover:border-[#ff831c] dark:hover:border-[#ff831c] transition-colors no-underline group"
  >
    {badge && (
      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-zinc-500 mb-2">
        {badge}
      </p>
    )}
    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1.5 group-hover:text-[#ff611a] transition-colors">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{description}</p>
  </a>
);

// ── SectionHeader ─────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  seeAll?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, seeAll }) => (
  <div className="mb-4">
    <div className="flex items-baseline justify-between">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-zinc-100">{title}</h2>
      {seeAll && (
        <a href="#" className="text-sm text-[#ff611a] hover:underline">
          See all
        </a>
      )}
    </div>
    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 leading-relaxed">{subtitle}</p>
  </div>
);

// ── Feedback ──────────────────────────────────────────────────────────────────
export const Feedback: React.FC = () => (
  <div className=" border-gray-100 dark:border-zinc-700 pt-6 flex items-center gap-3 mt-4">
    <span className="text-sm text-gray-500 dark:text-zinc-400">Was this page helpful?</span>
    <button  className="px-4 cursor-pointer py-1.5 text-sm border border-gray-200 dark:border-zinc-600 dark:text-zinc-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
      Yes
    </button>
    <button className="px-4 cursor-pointer py-1.5 text-sm border border-gray-200 dark:border-zinc-600 dark:text-zinc-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
      No
    </button>
  </div>
);