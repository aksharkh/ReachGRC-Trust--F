// ─────────────────────────────────────────────────────────────────────────────
// statusData.ts — edit this file to update the status page
//
// HOW TO UPDATE:
// - Change a service status : set `status` to "operational" | "degraded" | "outage"
// - Add an incident         : push to the service's `incidents` array
//   `date` format must be   : "Mon DD, YYYY"  e.g. "Jun 3, 2026"
//   `type`                  : "yellow" = degraded/partial, "red" = full outage
// - Add a new service       : add an object to the relevant group's `items`
// - Add a new group         : add a new object to the top-level array
// - Update uptime %         : change the `uptime` number (manual for now)
// ─────────────────────────────────────────────────────────────────────────────

export type IncidentType  = "yellow" | "red";
export type ServiceStatus = "operational" | "degraded" | "outage";

export interface Incident {
  date: string;
  type: IncidentType;
  msg:  string;
}

export interface Service {
  name:      string;
  status:    ServiceStatus;
  uptime:    number;
  incidents: Incident[];
}

export interface ServiceGroup {
  group: string;
  items: Service[];
}

const statusData: ServiceGroup[] = [
  {
    group: "Core Platform",
    items: [
      {
        name:   "Dashboard",
        status: "operational",
        uptime: 99.97,
        incidents: [
          { date: "May 12, 2026", type: "yellow", msg: "Elevated load times for ~18 min. Resolved." },
        ],
      },
      {
        name:   "Backend API",
        status: "operational",
        uptime: 99.91,
        incidents: [
          { date: "Apr 28, 2026", type: "yellow", msg: "Intermittent 503 errors on /api/trust/public. Resolved." },
          { date: "Mar 7, 2026",  type: "red",    msg: "Full outage for 22 min due to DB failover. Post-mortem published." },
        ],
      },
      {
        name:   "Authentication",
        status: "operational",
        uptime: 99.99,
        incidents: [],
      },
    ],
  },
  {
    group: "API Endpoints",
    items: [
      {
        name:   "Public API (/public/**)",
        status: "operational",
        uptime: 99.88,
        incidents: [
          { date: "May 3, 2026",  type: "yellow", msg: "API key validation latency spike (~400ms avg). Resolved." },
          { date: "Apr 10, 2026", type: "yellow", msg: "Elevated error rate on /image endpoints. Resolved." },
        ],
      },
      {
        name:   "Admin API (/admin/**)",
        status: "operational",
        uptime: 99.95,
        incidents: [
          { date: "Feb 20, 2026", type: "yellow", msg: "Degraded performance for Excel import. Resolved." },
        ],
      },
      {
        name:   "Webhook Delivery",
        status: "operational",
        uptime: 99.72,
        incidents: [
          { date: "May 18, 2026", type: "yellow", msg: "Delayed webhook delivery (~12 min lag). Resolved." },
          { date: "Apr 2, 2026",  type: "red",    msg: "Webhook service down for 35 min. Resolved." },
        ],
      },
    ],
  },
  {
    group: "Infrastructure",
    items: [
      {
        name:   "Database",
        status: "operational",
        uptime: 99.96,
        incidents: [
          { date: "Mar 7, 2026", type: "red", msg: "Primary DB failover caused 22 min downtime. Resolved." },
        ],
      },
      {
        name:   "File Storage",
        status: "operational",
        uptime: 99.99,
        incidents: [],
      },
      {
        name:   "Audit Logs",
        status: "operational",
        uptime: 100.0,
        incidents: [],
      },
      {
        name:   "CDN & Asset Delivery",
        status: "operational",
        uptime: 99.93,
        incidents: [
          { date: "May 1, 2026", type: "yellow", msg: "Cache invalidation delay for logo assets. Resolved." },
        ],
      },
    ],
  },
];

export default statusData;