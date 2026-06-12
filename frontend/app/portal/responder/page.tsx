import { CommandTimeline } from "@/components/dashboard/command-timeline";

export default function ResponderPortal() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white p-8">
      <h1 className="text-4xl font-semibold">
        Responder Operations Center
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CommandTimeline />

        <div className="border border-white/10 bg-[#08111a] p-5">
          <h3>Mission Queue</h3>

          <div className="mt-5 space-y-3">
            <Mission name="Flood Rescue" />
            <Mission name="Cyclone Evacuation" />
            <Mission name="Medical Supply Delivery" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Mission({
  name,
}: {
  name: string;
}) {
  return (
    <div className="border border-white/10 p-3">
      {name}
    </div>
  );
}