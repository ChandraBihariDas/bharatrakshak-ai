import {
  AlertTriangle,
  Shield,
  Users,
  Siren,
  Radio,
  Activity,
} from "lucide-react";

import { DisasterMapPreview } from "@/components/landing/disaster-map-preview";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Active Incidents",
    value: "18",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "SOS Requests",
    value: "246",
    icon: Siren,
    color: "text-orange-400",
  },
  {
    title: "Teams Active",
    value: "58",
    icon: Users,
    color: "text-cyan-300",
  },
  {
    title: "Risk Regions",
    value: "12",
    icon: Shield,
    color: "text-yellow-300",
  },
];

const alerts = [
  "Cyclone Warning - Odisha Coast",
  "Flood Alert - Assam Basin",
  "Heatwave Advisory - Rajasthan",
  "Landslide Watch - Sikkim",
];

const sosRequests = [
  {
    id: "SOS-1045",
    location: "Chennai",
    priority: "Critical",
    status: "Awaiting Team",
  },
  {
    id: "SOS-1046",
    location: "Assam",
    priority: "High",
    status: "Assigned",
  },
  {
    id: "SOS-1047",
    location: "Odisha",
    priority: "Critical",
    status: "En Route",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <div className="border-b border-white/10 bg-[#08111a]">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-3xl font-semibold">
            National Command Center
          </h1>

          <p className="mt-2 text-slate-400">
            BharatRakshak AI Operations Dashboard
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="border-white/10 bg-[#08111a]"
            >
              <CardContent className="p-5">
                <stat.icon
                  className={`h-6 w-6 ${stat.color}`}
                />
                <div className="mt-4 text-3xl font-semibold">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <DisasterMapPreview />
          </div>

          <div className="space-y-4">
            <Card className="border-white/10 bg-[#08111a]">
              <CardContent className="p-5">
                <div className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-cyan-300" />
                  <h3>Live Alerts</h3>
                </div>

                <div className="mt-4 space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert}
                      className="border border-red-500/20 bg-red-500/5 p-3 text-sm"
                    >
                      {alert}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#08111a]">
              <CardContent className="p-5">
                <h3>System Status</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <StatusRow
                    label="IMD Feed"
                    status="Operational"
                  />
                  <StatusRow
                    label="ISRO Satellite"
                    status="Connected"
                  />
                  <StatusRow
                    label="Emergency Relay"
                    status="Active"
                  />
                  <StatusRow
                    label="AI Engine"
                    status="Healthy"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card className="border-white/10 bg-[#08111a]">
            <CardContent className="p-5">
              <h3 className="mb-4 text-lg">
                Recent SOS Requests
              </h3>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400">
                    <th className="text-left">ID</th>
                    <th className="text-left">Location</th>
                    <th className="text-left">Priority</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sosRequests.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-white/10"
                    >
                      <td className="py-3">{row.id}</td>
                      <td>{row.location}</td>
                      <td>{row.priority}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-[#08111a]">
            <CardContent className="p-5">
              <h3 className="mb-4 text-lg">
                Recent Events Feed
              </h3>

              <div className="space-y-4">
                {[
                  "NDRF Team deployed to Odisha",
                  "SOS Request escalated from Chennai",
                  "Heatwave advisory issued",
                  "Flood watch expanded in Assam",
                  "Satellite imagery processed",
                ].map((event) => (
                  <div
                    key={event}
                    className="flex items-center gap-3"
                  >
                    <Activity className="h-4 w-4 text-cyan-300" />
                    <span className="text-sm">{event}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function StatusRow({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>

      <span className="text-emerald-300">
        {status}
      </span>
    </div>
  );
}