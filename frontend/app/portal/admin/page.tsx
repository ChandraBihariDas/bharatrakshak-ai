import { CommandTimeline } from "@/components/dashboard/command-timeline";

export default function AdminPortal() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white p-8">
      <h1 className="text-4xl font-semibold">
        National Authority Dashboard
      </h1>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="border border-white/10 bg-[#08111a] p-6">
          <h2 className="text-xl">
            Resource Allocation Grid
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Allocation title="NDRF Teams" value="58" />
            <Allocation title="Relief Camps" value="124" />
            <Allocation title="Medical Units" value="46" />
          </div>
        </div>

        <CommandTimeline />
      </div>
    </main>
  );
}

function Allocation({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border border-white/10 p-4">
      <div className="text-3xl font-semibold text-cyan-300">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-400">
        {title}
      </div>
    </div>
  );
}