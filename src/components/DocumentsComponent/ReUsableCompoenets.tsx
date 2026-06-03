// shared/DocPrimitives.tsx
// Reusable building-blocks that match the existing GettingStarted design language.

import { useState, useEffect } from "react";
import { FiCopy, FiCheck, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

// ─── Typography ────────────────────────────────────────────────────────────────

export const SectionTitle = ({ children }: { children: string }) => (
  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
    {children}
  </p>
);

export const Divider = () => (
  <hr className="border-none border-t border-zinc-100 dark:border-zinc-800 my-8" />
);

export const InlineCode = ({ children }: { children: string }) => (
  <code className="text-[12px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
    {children}
  </code>
);

// ─── Badge ─────────────────────────────────────────────────────────────────────

type BadgeVariant = "green" | "amber" | "red" | "blue" | "purple" | "zinc";
const badgeStyles: Record<BadgeVariant, string> = {
  green:  "bg-green-50  text-green-800  dark:bg-green-900/20  dark:text-green-400",
  amber:  "bg-amber-50  text-amber-800  dark:bg-amber-900/20  dark:text-amber-400",
  red:    "bg-red-50    text-red-800    dark:bg-red-900/20    dark:text-red-400",
  blue:   "bg-blue-50   text-blue-800   dark:bg-blue-900/20   dark:text-blue-400",
  purple: "bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  zinc:   "bg-zinc-100  text-zinc-700   dark:bg-zinc-800      dark:text-zinc-300",
};

export const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: BadgeVariant;
}) => (
  <span
    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${badgeStyles[variant]}`}
  >
    {children}
  </span>
);

// ─── CodeBlock ─────────────────────────────────────────────────────────────────

export const CodeBlock = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1 transition-colors"
      >
        {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="whitespace-pre-wrap pr-16">{children}</pre>
    </div>
  );
};

// ─── Callout ───────────────────────────────────────────────────────────────────

type CalloutVariant = "info" | "warning" | "tip" | "note";
const calloutMap: Record<CalloutVariant, { bg: string; border: string; text: string }> = {
  info:    { bg: "bg-blue-50  dark:bg-blue-900/10",  border: "border-blue-200  dark:border-blue-800",  text: "text-blue-700  dark:text-blue-400"  },
  warning: { bg: "bg-amber-50 dark:bg-amber-900/10", border: "border-amber-200 dark:border-amber-800", text: "text-amber-700 dark:text-amber-400" },
  tip:     { bg: "bg-green-50 dark:bg-green-900/10", border: "border-green-200 dark:border-green-800", text: "text-green-700 dark:text-green-400" },
  note:    { bg: "bg-zinc-50  dark:bg-zinc-900/30",  border: "border-zinc-200  dark:border-zinc-700",  text: "text-zinc-600  dark:text-zinc-400"  },
};

export const Callout = ({
  icon,
  variant = "info",
  children,
}: {
  icon: React.ReactNode;
  variant?: CalloutVariant;
  children: React.ReactNode;
}) => {
  const c = calloutMap[variant];
  return (
    <div className={`flex gap-2.5 items-start ${c.bg} border ${c.border} rounded-lg p-3.5 mt-4`}>
      <span className={`${c.text} mt-0.5 flex-shrink-0`}>{icon}</span>
      <p className={`text-xs ${c.text} leading-relaxed`}>{children}</p>
    </div>
  );
};

// ─── Step list ─────────────────────────────────────────────────────────────────

export interface Step {
  step: string;
  label: string;
  desc: React.ReactNode;
  done?: boolean;
}

export const StepList = ({ steps }: { steps: Step[] }) => (
  <div className="relative pl-8">
    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-700" />
    {steps.map((item, i) => (
      <div key={i} className="relative mb-6 last:mb-0">
        <div
          className={`absolute -left-8 top-0.5 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] border-2 border-white dark:border-zinc-950 ${
            item.done
              ? "bg-green-500 text-white"
              : "bg-[#ff831c] text-white"
          }`}
        >
          {item.step}
        </div>
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-1">{item.label}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
);

// ─── Info row list ──────────────────────────────────────────────────────────────

export interface InfoRow {
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

export const InfoRowList = ({ rows }: { rows: InfoRow[] }) => (
  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg divide-y divide-zinc-100 dark:divide-zinc-800">
    {rows.map((row, i) => (
      <div key={i} className="flex gap-3 items-start p-4">
        <span className="text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0">{row.icon}</span>
        <div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-0.5">{row.title}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

// ─── Feature card grid ─────────────────────────────────────────────────────────

export interface FeatureCard {
  icon: React.ReactNode;
  label: string;
  desc: string;
  badge?: string;
}

export const FeatureGrid = ({ cards }: { cards: FeatureCard[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {cards.map((item, i) => (
      <div key={i} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
            {item.icon}
          </div>
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item.label}</span>
          {item.badge && (
            <Badge variant="green">{item.badge}</Badge>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
);

// ─── On-page nav ───────────────────────────────────────────────────────────────

export interface NavSection {
  id: string;
  label: string;
}

export const OnPageNav = ({ sections }: { sections: NavSection[] }) => {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <aside className="hidden xl:block w-56 shrink-0 sticky top-6 self-start">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`w-full text-left cursor-pointer text-xs px-2 py-1.5 rounded transition-colors leading-snug ${
                active === id
                  ? "text-[#ff831c] font-medium"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-3">
          Was this page helpful?
        </p>
        <div className="flex gap-2 mb-4">
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 hover:border-[#ff831c] hover:text-[#ff831c] transition-all cursor-pointer">
            <FiThumbsUp size={12} /> Yes
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 dark:text-zinc-300 hover:border-[#ff831c] hover:text-[#ff831c] transition-all cursor-pointer">
            <FiThumbsDown size={12} /> No
          </button>
        </div>
        <Link
          to="/docs/contact-us"
          className="flex items-center gap-2 text-sm text-[#ff831c] hover:underline"
        >
          <RiCustomerService2Line size={16} />
          Still need help? Contact us
        </Link>
      </div>
    </aside>
  );
};