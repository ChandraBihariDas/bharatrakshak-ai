// components/landing/disaster-map-preview.tsx
import {
  CloudRain,
  Flame,
  MapPin,
  Navigation,
  RadioTower,
  Waves,
} from "lucide-react";

const incidents = [
  {
    type: "Cyclone",
    location: "Bay of Bengal",
    icon: Waves,
    className: "left-[72%] top-[48%]",
    tone: "bg-red-400 shadow-red-400/40",
  },
  {
    type: "Flood",
    location: "Assam Basin",
    icon: CloudRain,
    className: "left-[78%] top-[28%]",
    tone: "bg-cyan-300 shadow-cyan-300/40",
  },
  {
    type: "Heat",
    location: "Rajasthan Grid",
    icon: Flame,
    className: "left-[32%] top-[34%]",
    tone: "bg-amber-300 shadow-amber-300/40",
  },
  {
    type: "Landslide",
    location: "Himalayan Belt",
    icon: MapPin,
    className: "left-[48%] top-[20%]",
    tone: "bg-orange-300 shadow-orange-300/40",
  },
];

export function DisasterMapPreview() {
  return (
    <section className="border-b border-white/10 bg-[#070a0f] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
              Live India Disaster Map
            </div>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              One national operating picture from coast to border.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Monitor hazards, vulnerable districts, logistics corridors, agency
            status, and AI-prioritized response zones in real time.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#08111a]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[48%_52%_45%_55%] border border-cyan-300/25 bg-cyan-300/[0.04] shadow-[0_0_80px_rgba(34,211,238,0.12)]" />
            <div className="absolute left-[44%] top-[17%] h-[390px] w-[210px] rotate-[8deg] rounded-[45%_55%_52%_48%] border border-cyan-300/30 bg-slate-950/60" />
            <div className="absolute left-[36%] top-[28%] h-[260px] w-[180px] rotate-[-15deg] rounded-[48%_52%_50%_50%] border border-cyan-300/20 bg-cyan-300/[0.03]" />
            <div className="absolute left-[57%] top-[37%] h-[170px] w-[110px] rotate-[18deg] rounded-[55%_45%_52%_48%] border border-cyan-300/20 bg-cyan-300/[0.03]" />

            <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/10 bg-slate-950/80 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
              <Navigation className="h-4 w-4 text-cyan-300" />
              Bharat Grid: Active
            </div>

            <div className="absolute bottom-4 left-4 grid gap-2 border border-white/10 bg-slate-950/80 p-3 text-xs backdrop-blur">
              <LegendItem color="bg-red-400" label="Critical" />
              <LegendItem color="bg-orange-300" label="Severe" />
              <LegendItem color="bg-cyan-300" label="Flood Watch" />
              <LegendItem color="bg-emerald-300" label="Resources Ready" />
            </div>

            {incidents.map((incident) => (
              <div
                key={`${incident.type}-${incident.location}`}
                className={`absolute ${incident.className}`}
              >
                <div
                  className={`h-4 w-4 animate-ping rounded-full ${incident.tone} opacity-60`}
                />
                <div
                  className={`absolute left-0 top-0 h-4 w-4 rounded-full ${incident.tone} shadow-lg`}
                />
                <div className="mt-3 min-w-36 border border-white/10 bg-slate-950/90 p-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <incident.icon className="h-4 w-4 text-cyan-200" />
                    {incident.type}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    {incident.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4">
            <MapPanel
              icon={RadioTower}
              title="Agency Relay"
              value="23"
              label="Unified command channels"
            />
            <MapPanel
              icon={CloudRain}
              title="Rainfall Anomaly"
              value="+184%"
              label="Above 30-year baseline"
            />
            <MapPanel
              icon={Waves}
              title="Evacuation Priority"
              value="12"
              label="Coastal blocks flagged"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-300">
      <span className={`h-2.5 w-2.5 ${color}`} />
      {label}
    </div>
  );
}

function MapPanel({
  icon: Icon,
  title,
  value,
  label,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  label: string;
}) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-cyan-300" />
        <span className="text-xs uppercase tracking-[0.18em] text-emerald-300">
          Live
        </span>
      </div>
      <div className="mt-8 text-4xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-sm font-medium text-slate-200">{title}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}