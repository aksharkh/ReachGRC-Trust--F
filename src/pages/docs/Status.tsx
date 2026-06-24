import { useState, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import statusData from "@/data/statusData";
import type { Incident, Service, ServiceStatus } from "@/data/statusData";

// ─── Bar generation ───────────────────────────────────────────────────────────

function generateBars(incidents: Incident[]) {
  const bars = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    let type: "green" | "yellow" | "red" = "green";
    let msg = "No downtime recorded on this day.";
    for (const inc of incidents) {
      const incDay   = inc.date.split(" ")[1]?.replace(",", "");
      const incMonth = inc.date.split(" ")[0];
      const dDay     = d.toLocaleDateString("en-US", { day: "numeric" });
      const dMonth   = d.toLocaleDateString("en-US", { month: "short" });
      if (incDay === dDay && incMonth === dMonth) {
        type = inc.type;
        msg  = inc.msg;
      }
    }
    bars.push({ date: dateStr, type, msg });
  }
  return bars;
}

// ─── Overall status derived from data ────────────────────────────────────────

function getOverallStatus(): ServiceStatus {
  const all = statusData.flatMap((g) => g.items);
  if (all.some((s) => s.status === "outage"))   return "outage";
  if (all.some((s) => s.status === "degraded")) return "degraded";
  return "operational";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusPill = ({ status }: { status: ServiceStatus }) => {
  const styles: Record<ServiceStatus, string> = {
    operational: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    degraded:    "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    outage:      "bg-red-50   text-red-700   dark:bg-red-900/20   dark:text-red-400",
  };
  const labels: Record<ServiceStatus, string> = {
    operational: "Operational",
    degraded:    "Degraded",
    outage:      "Outage",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

interface TooltipState {
  visible: boolean;
  date:    string;
  msg:     string;
  x:       number;
}

const UptimeBars = ({ incidents }: { incidents: Incident[] }) => {
  const bars = generateBars(incidents);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, date: "", msg: "", x: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

const barColor: Record<string, string> = {
  green:  "bg-[#06B752]",      // normal — your brand orange
  yellow: "bg-[#DDDE08]",      // minor incident — yellow, distinct from orange
    red:    "bg-[#DE080A]",      // serious outage — red, universally understood
};

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>, bar: typeof bars[0]) => {
    const wrapRect = wrapRef.current?.getBoundingClientRect();
    const barRect  = (e.target as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(barRect.left - (wrapRect?.left ?? 0), (wrapRect?.width ?? 0) - 210));
    setTooltip({ visible: true, date: bar.date, msg: bar.msg, x });
  };

  return (
    <div ref={wrapRef} className="relative">
      {tooltip.visible && (
        <div
          className="absolute bottom-[calc(100%+8px)] z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2.5 text-xs pointer-events-none min-w-50"
          style={{ left: tooltip.x }}
        >
          <div className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">{tooltip.date}</div>
          <div className="text-zinc-500 dark:text-zinc-400">{tooltip.msg}</div>
        </div>
      )}
      <div className="flex flex-1 gap-1 items-end h-9">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm h-full cursor-pointer hover:opacity-70 transition-opacity ${barColor[bar.type]}`}
            onMouseEnter={(e) => handleEnter(e, bar)}
            onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceRow = ({ svc }: { svc: Service }) => {
  const [open, setOpen] = useState(false);
  const hasIncidents = svc.incidents.length > 0;

  return (
    <div className="py-5 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => hasIncidents && setOpen((o) => !o)}
          className={`flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 ${
            hasIncidents ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {hasIncidents ? (
            <FiChevronRight
              size={14}
              className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            />
          ) : (
            <span className="w-3.5" />
          )}
          {svc.name}
        </button>
        <StatusPill status={svc.status} />
      </div>

      <UptimeBars incidents={svc.incidents} />

      <div className="flex justify-between mt-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
        <span>90 days ago</span>
        <span>{svc.uptime.toFixed(2)}% uptime</span>
        <span>Today</span>
      </div>

      {open && hasIncidents && (
        <div className="mt-3">
          {svc.incidents.map((inc, i) => (
            <div
              key={i}
              className="flex gap-4 items-start py-2.5 border-t border-zinc-100 dark:border-zinc-800"
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                  inc.type === "red" ? "bg-[#ef4444]" : "bg-[#facc15]"
                }`}
              />
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{inc.msg}</p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{inc.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Overall banner ───────────────────────────────────────────────────────────

const OverallBanner = () => {
  const status = getOverallStatus();
  const config = {
    operational: {
      dot:  "bg-green-500 animate-pulse",
      wrap: "bg-green-50  dark:bg-green-900/10  border-green-200  dark:border-green-800",
      text: "text-green-700  dark:text-green-400",
      msg:  "All systems operational",
    },
    degraded: {
      dot:  "bg-amber-500 animate-pulse",
      wrap: "bg-amber-50  dark:bg-amber-900/10  border-amber-200  dark:border-amber-800",
      text: "text-amber-700  dark:text-amber-400",
      msg:  "Some systems degraded",
    },
    outage: {
      dot:  "bg-red-500",
      wrap: "bg-red-50    dark:bg-red-900/10    border-red-200    dark:border-red-800",
      text: "text-red-700    dark:text-red-400",
      msg:  "Service disruption in progress",
    },
  };
  const c = config[status];
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 mb-10 ${c.wrap}`}>
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.dot}`} />
      <span className={`text-sm font-medium ${c.text}`}>{c.msg}</span>
      <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">Updated at {now}</span>
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────

const StatusPage = () => {
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    // KEY FIX: removed min-h-screen, use h-full + overflow-y-auto
    // so it scrolls inside your layout's flex container
    <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
<div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-white mb-1">
            ReachGRC Status
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time status of all ReachGRC Trust services
          </p>
        </div>

        {/* Overall banner — auto-derives from statusData */}
        <OverallBanner />

        {/* Service groups */}
        {statusData.map((group) => (
          <div key={group.group} className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
              {group.group}
            </p>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl px-5">
              {group.items.map((svc) => (
                <ServiceRow key={svc.name} svc={svc} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-5 pb-10">
          <span>Showing 90-day uptime history</span>
          <span>Last updated: {now}</span>
        </div>

      </div>
    </div>
  );
};

export default StatusPage;