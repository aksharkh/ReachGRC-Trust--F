import { useState, useEffect } from "react";
import { FiCopy, FiCheck, FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Typography ────────────────────────────────────────────────────────────────

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 select-none">
    {children}
  </p>
);

export const Divider = () => (
  <Separator className="my-8 bg-zinc-100 dark:bg-zinc-800" />
);

export const InlineCode = ({ children }: { children: string }) => (
  <code className="text-[12px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-700/50">
    {children}
  </code>
);

// ─── Badge ─────────────────────────────────────────────────────────────────────

export type BadgeVariant = "green" | "amber" | "red" | "blue" | "purple" | "zinc" | "orange";

const badgeStyles: Record<BadgeVariant, string> = {
  green:  "bg-green-50 text-green-700 border-green-200/50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/50",
  amber:  "bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
  red:    "bg-red-50 text-red-700 border-red-200/50 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50",
  blue:   "bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
  purple: "bg-purple-50 text-purple-700 border-purple-200/50 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/50",
  zinc:   "bg-zinc-100 text-zinc-600 border-zinc-200/50 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800",
  orange: "bg-orange-50 text-orange-700 border-orange-200/50 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/50",
};

export const Badge = ({
  children,
  variant = "zinc",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) => (
  <ShadcnBadge
    variant="outline"
    className={cn(
      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
      badgeStyles[variant],
      className
    )}
  >
    {children}
  </ShadcnBadge>
);

// ─── MethodBadge (REST APIs) ───────────────────────────────────────────────────

export type MethodVariant = "GET" | "POST" | "PUT" | "DELETE";

const methodStyles: Record<MethodVariant, string> = {
  GET:    "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-900/50",
  POST:   "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50",
  PUT:    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900/50",
  DELETE: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50",
};

export const MethodBadge = ({ method }: { method: MethodVariant }) => (
  <span
    className={cn(
      "font-mono text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider select-none",
      methodStyles[method]
    )}
  >
    {method}
  </span>
);

// ─── CodeBlock ─────────────────────────────────────────────────────────────────

export const CodeBlock = ({ children, raw }: { children: React.ReactNode; raw?: string }) => {
  const [copied, setCopied] = useState(false);
  const codeString = raw ?? (typeof children === "string" ? children : "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 overflow-x-auto transition-all">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-sm hover:shadow"
        title="Copy to clipboard"
      >
        {copied ? <FiCheck size={12} className="text-green-500" /> : <FiCopy size={12} />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
      <pre className="whitespace-pre pr-12 font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
        {children}
      </pre>
    </div>
  );
};

// ─── Callout ───────────────────────────────────────────────────────────────────

export type CalloutVariant = "info" | "warning" | "tip" | "note" | "amber" | "blue" | "red" | "green";

const calloutMap: Record<CalloutVariant, { bg: string; border: string; text: string }> = {
  info:    { bg: "bg-blue-50/55 dark:bg-blue-950/10",    border: "border-blue-200/60 dark:border-blue-900/40",  text: "text-blue-800 dark:text-blue-400"  },
  blue:    { bg: "bg-blue-50/55 dark:bg-blue-950/10",    border: "border-blue-200/60 dark:border-blue-900/40",  text: "text-blue-800 dark:text-blue-400"  },
  warning: { bg: "bg-amber-50/55 dark:bg-amber-950/10",   border: "border-amber-200/60 dark:border-amber-900/40", text: "text-amber-800 dark:text-amber-400" },
  amber:   { bg: "bg-amber-50/55 dark:bg-amber-950/10",   border: "border-amber-200/60 dark:border-amber-900/40", text: "text-amber-800 dark:text-amber-400" },
  red:     { bg: "bg-red-50/55 dark:bg-red-950/10",       border: "border-red-200/60 dark:border-red-900/40",   text: "text-red-800 dark:text-red-400"   },
  tip:     { bg: "bg-green-50/55 dark:bg-green-950/10",   border: "border-green-200/60 dark:border-green-900/40", text: "text-green-800 dark:text-green-400" },
  green:   { bg: "bg-green-50/55 dark:bg-green-950/10",   border: "border-green-200/60 dark:border-green-900/40", text: "text-green-800 dark:text-green-400" },
  note:    { bg: "bg-zinc-50/55 dark:bg-zinc-900/35",     border: "border-zinc-200/60 dark:border-zinc-800",   text: "text-zinc-750 dark:text-zinc-300"  },
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
  const c = calloutMap[variant] || calloutMap.info;
  return (
    <div className={cn("flex gap-3 items-start border rounded-lg p-3.5 mt-4 transition-all duration-200", c.bg, c.border)}>
      <span className={cn("mt-0.5 flex-shrink-0 text-base", c.text)}>{icon}</span>
      <div className={cn("text-xs leading-relaxed font-medium", c.text)}>{children}</div>
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
  <div className="relative pl-8 my-6">
    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-zinc-250 dark:bg-zinc-800" />
    {steps.map((item, i) => (
      <div key={i} className="relative mb-6 last:mb-0">
        <div
          className={cn(
            "absolute -left-8 top-0.5 font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] border-2 border-white dark:border-zinc-950 shadow-sm transition-all",
            item.done || item.step === "✓"
              ? "bg-green-500 text-white"
              : "bg-[#ff831c] text-white"
          )}
        >
          {item.step}
        </div>
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">{item.label}</p>
        <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</div>
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
  <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg divide-y divide-zinc-150 dark:divide-zinc-800 overflow-hidden shadow-sm my-5">
    {rows.map((row, i) => (
      <div key={i} className="flex gap-3.5 items-start p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
        <span className="text-zinc-400 dark:text-zinc-550 mt-0.5 flex-shrink-0 text-base">{row.icon}</span>
        <div>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-0.5">{row.title}</p>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.desc}</div>
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
  path?: string;
}

export const FeatureGrid = ({ cards }: { cards: FeatureCard[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
    {cards.map((item, i) => (
      <div key={i} className="border border-zinc-250 dark:border-zinc-800 rounded-lg p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-md bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-inner">
            {item.icon}
          </div>
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-250">{item.label}</span>
          {item.badge && (
            <Badge variant="green">{item.badge}</Badge>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
        {item.path && (
          <div className="mt-2.5">
            <InlineCode>{item.path}</InlineCode>
          </div>
        )}
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
  const [feedbackState, setFeedbackState] = useState<"none" | "yes" | "no">("none");

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
    <aside className="hidden xl:block w-52 shrink-0 sticky top-6 self-start select-none">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={cn(
                "w-full text-left cursor-pointer text-xs px-2.5 py-1.5 rounded transition-all leading-snug border-l-2",
                active === id
                  ? "text-[#ff831c] border-[#ff831c] font-semibold bg-orange-50/20 dark:bg-orange-500/5"
                  : "text-zinc-500 border-transparent dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        {feedbackState === "none" ? (
          <>
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
              Was this page helpful?
            </p>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setFeedbackState("yes")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 dark:text-zinc-350 hover:border-[#ff831c] hover:text-[#ff831c] dark:hover:border-[#ff831c] dark:hover:text-[#ff831c] transition-all cursor-pointer hover:bg-orange-50/10"
              >
                <FiThumbsUp size={12} /> Yes
              </button>
              <button
                onClick={() => setFeedbackState("no")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 dark:text-zinc-350 hover:border-[#ff831c] hover:text-[#ff831c] dark:hover:border-[#ff831c] dark:hover:text-[#ff831c] transition-all cursor-pointer hover:bg-orange-50/10"
              >
                <FiThumbsDown size={12} /> No
              </button>
            </div>
          </>
        ) : (
          <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-4 animate-fade-in">
            ✓ Thanks for your feedback!
          </p>
        )}
        <Link
          to="/docs/contact-us"
          className="flex items-center gap-2 text-xs font-medium text-[#ff831c] hover:underline"
        >
          <RiCustomerService2Line size={15} />
          <span>Still need help? Contact us</span>
        </Link>
      </div>
    </aside>
  );
};

// ─── Section Header ────────────────────────────────────────────────────────────

export const SectionHeader = ({
  title,
  subtitle,
  seeAll,
}: {
  title: string;
  subtitle: string;
  seeAll?: boolean;
}) => (
  <div className="mb-6">
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">
        {title}
      </h2>
      {seeAll && (
        <span className="text-xs font-semibold text-[#ff611a] hover:underline cursor-pointer">
          See all
        </span>
      )}
    </div>
    <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
      {subtitle}
    </p>
  </div>
);

// ─── Documentation Card ─────────────────────────────────────────────────────────

export const DocCard = ({
  badge,
  title,
  description,
  href,
}: {
  badge?: string;
  title: string;
  description: string;
  href?: string;
}) => {
  const content = (
    <div className="group relative z-10 hover:z-30 block h-full p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gradient-to-br hover:from-brand-red hover:to-brand-orange hover:border-transparent hover:shadow-[0_20px_50px_rgba(255,57,24,0.35)] hover:scale-110 hover:rounded-none transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between origin-center">
      <div>
        {badge && (
          <p className="text-[10px] font-bold tracking-widest uppercase text-brand-orange group-hover:text-black mb-2 select-none">
            {badge}
          </p>
        )}
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-white group-hover:underline flex items-center gap-1 transition-colors leading-snug">
          <span>{title}</span>
          <TbArrowBadgeRightFilled className="opacity-0 group-hover:opacity-100 text-lg text-white group-hover:translate-x-0.5 transition-all shrink-0" />
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-black font-semibold mt-2 leading-relaxed transition-colors">
          {description}
        </p>
      </div>
    </div>
  );

  if (href && href !== '#') {
    return (
      <a href={href} className="no-underline block h-full">
        {content}
      </a>
    );
  }

  return content;
};

// ─── Standalone Page Feedback Widget ───────────────────────────────────────────

export const PageFeedback = () => {
  const [feedbackState, setFeedbackState] = useState<"none" | "yes" | "no">("none");

  return (
    <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        {feedbackState === "none" ? (
          <>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
              Was this page helpful?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setFeedbackState("yes")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-350 hover:border-[#ff831c] hover:text-[#ff831c] dark:hover:border-[#ff831c] dark:hover:text-[#ff831c] transition-all cursor-pointer hover:bg-orange-50/5"
              >
                <FiThumbsUp size={12} /> Yes
              </button>
              <button
                onClick={() => setFeedbackState("no")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-350 hover:border-[#ff831c] hover:text-[#ff831c] dark:hover:border-[#ff831c] dark:hover:text-[#ff831c] transition-all cursor-pointer hover:bg-orange-50/5"
              >
                <FiThumbsDown size={12} /> No
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm font-semibold text-green-600 dark:text-green-400 animate-fade-in">
            ✓ Thanks for your feedback!
          </p>
        )}
      </div>
      <Link
        to="/docs/contact-us"
        className="flex items-center gap-2 text-xs font-medium text-[#ff831c] hover:underline"
      >
        <RiCustomerService2Line size={15} />
        <span>Still need help? Contact us</span>
      </Link>
    </div>
  );
};

