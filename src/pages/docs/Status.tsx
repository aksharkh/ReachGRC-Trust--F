import React, { useState, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import statusData, { type Incident, type Service, type ServiceStatus, type ServiceGroup } from "@/data/statusData";
import { fetchSystemStatus } from "@/services/statusApi";

// ─── Bar generation (90-day history) ──────────────────────────────────────────

function generateBars(incidents: Incident[] = []) {
  const bars = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
    let type: "green" | "yellow" | "red" = "green";
    let msg = "No downtime recorded on this day.";
    
    if (Array.isArray(incidents)) {
      for (const inc of incidents) {
        if (!inc || !inc.date) continue;
        const incDay = inc.date.split(" ")[1]?.replace(",", "");
        const incMonth = inc.date.split(" ")[0];
        const dDay = d.toLocaleDateString("en-US", { day: "numeric" });
        const dMonth = d.toLocaleDateString("en-US", { month: "short" });
        if (incDay === dDay && incMonth === dMonth) {
          type = inc.type;
          msg = inc.msg;
        }
      }
    }
    bars.push({ date: dateStr, type, msg });
  }
  return bars;
}

// ─── Overall status calculation ──────────────────────────────────────────────

function getOverallStatus(groups: ServiceGroup[]): ServiceStatus {
  const all = groups.flatMap((g) => g.items || []);
  if (all.some((s) => s.status === "outage")) return "outage";
  if (all.some((s) => s.status === "degraded")) return "degraded";
  return "operational";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const StatusPill = ({ status }: { status: ServiceStatus }) => {
  const styles: Record<ServiceStatus, string> = {
    operational: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
    degraded: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20",
    outage: "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20",
  };
  const labels: Record<ServiceStatus, string> = {
    operational: "Operational",
    degraded: "Degraded",
    outage: "Outage",
  };
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${styles[status] || styles.operational}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'operational' ? 'bg-emerald-500 animate-pulse' : status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'}`} />
      {labels[status] || "Operational"}
    </span>
  );
};

interface TooltipState {
  visible: boolean;
  date: string;
  msg: string;
  x: number;
}

const UptimeBars = ({ incidents = [] }: { incidents?: Incident[] }) => {
  const bars = generateBars(incidents);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, date: "", msg: "", x: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  const barColor: Record<string, string> = {
    green: "bg-[#06B752] hover:bg-[#059a45]",
    yellow: "bg-[#DDDE08] hover:bg-[#c2c307]",
    red: "bg-[#DE080A] hover:bg-[#b80608]",
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>, bar: typeof bars[0]) => {
    const wrapRect = wrapRef.current?.getBoundingClientRect();
    const barRect = (e.target as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(barRect.left - (wrapRect?.left ?? 0), (wrapRect?.width ?? 0) - 210));
    setTooltip({ visible: true, date: bar.date, msg: bar.msg, x });
  };

  return (
    <div ref={wrapRef} className="relative">
      {tooltip.visible && (
        <div
          className="absolute bottom-[calc(100%+8px)] z-50 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-xl px-3.5 py-2.5 text-xs pointer-events-none min-w-[210px] animate-in fade-in zoom-in-95 duration-150"
          style={{ left: tooltip.x }}
        >
          <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{tooltip.date}</div>
          <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug">{tooltip.msg}</div>
        </div>
      )}
      <div className="flex flex-1 gap-1 items-end h-9">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`flex-1 rounded-xs h-full cursor-pointer transition-opacity ${barColor[bar.type]}`}
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
  const incidents = svc.incidents || [];
  const hasIncidents = incidents.length > 0;

  return (
    <div className="py-5 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => hasIncidents && setOpen((o) => !o)}
          className={`flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-200 ${
            hasIncidents ? "cursor-pointer hover:text-brand-orange transition-colors" : "cursor-default"
          }`}
        >
          {hasIncidents ? (
            <FiChevronRight
              size={14}
              className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-90 text-brand-orange" : ""}`}
            />
          ) : (
            <span className="w-3.5" />
          )}
          {svc.name}
        </button>
        <StatusPill status={svc.status} />
      </div>

      <UptimeBars incidents={incidents} />

      <div className="flex justify-between mt-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
        <span>90 days ago</span>
        <span className="font-semibold text-zinc-600 dark:text-zinc-300">{(svc.uptime ?? 99.99).toFixed(2)}% uptime</span>
        <span>Today</span>
      </div>

      {open && hasIncidents && (
        <div className="mt-3.5 space-y-2">
          {incidents.map((inc, i) => (
            <div
              key={i}
              className="flex gap-3 items-start p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800"
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                  inc.type === "red" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                }`}
              />
              <div className="space-y-0.5">
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{inc.msg}</p>
                <p className="text-[10.5px] text-zinc-400 font-mono">{inc.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OverallBanner = ({ groups }: { groups: ServiceGroup[] }) => {
  const status = getOverallStatus(groups);
  const config = {
    operational: {
      dot: "bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]",
      wrap: "bg-emerald-500/10 border-emerald-500/25",
      text: "text-emerald-700 dark:text-emerald-300",
      msg: "All Systems Operational",
    },
    degraded: {
      dot: "bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.6)]",
      wrap: "bg-amber-500/10 border-amber-500/25",
      text: "text-amber-700 dark:text-amber-300",
      msg: "Some Systems Experiencing Degraded Performance",
    },
    outage: {
      dot: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]",
      wrap: "bg-red-500/10 border-red-500/25",
      text: "text-red-700 dark:text-red-300",
      msg: "Service Disruption In Progress",
    },
  };
  const c = config[status] || config.operational;
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex items-center gap-3 border rounded-2xl px-5 py-4 mb-8 shadow-sm ${c.wrap}`}>
      <span className={`w-3 h-3 rounded-full shrink-0 ${c.dot}`} />
      <span className={`text-sm sm:text-base font-bold tracking-tight ${c.text}`}>{c.msg}</span>
      <span className="ml-auto text-xs text-zinc-400 dark:text-zinc-500 font-medium">Updated at {now}</span>
    </div>
  );
};

// ─── Main Docs Embedded Status Page ──────────────────────────────────────────

const DocsStatusPage: React.FC = () => {
  const [statusGroups, setStatusGroups] = useState<ServiceGroup[]>(statusData);
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    fetchSystemStatus().then((data) => {
      setStatusGroups(data);
    });
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">
            ReachGRC Status
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time status and continuous uptime telemetry of all ReachGRC Trust services.
          </p>
        </div>

        {/* Overall banner */}
        <OverallBanner groups={statusGroups} />

        {/* Service groups */}
        {statusGroups.map((group) => (
          <div key={group.group} className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
              {group.group}
            </p>
            <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 bg-white dark:bg-zinc-900/50">
              {group.items?.map((svc) => (
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

export default DocsStatusPage;