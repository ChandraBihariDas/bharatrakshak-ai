import { Card, CardContent } from "@/components/ui/card";

export default function CitizenPortal() {
  return (
    <main className="min-h-screen bg-[#05070a] text-white p-8">
      <h1 className="text-4xl font-semibold">
        Citizen Emergency Portal
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="bg-[#08111a] border-white/10">
          <CardContent className="p-6">
            <h3>Submit SOS</h3>
            <p className="mt-3 text-sm text-slate-400">
              Request immediate rescue assistance.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#08111a] border-white/10">
          <CardContent className="p-6">
            <h3>Track Requests</h3>
            <p className="mt-3 text-sm text-slate-400">
              Monitor responder assignments.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#08111a] border-white/10">
          <CardContent className="p-6">
            <h3>Regional Alerts</h3>
            <p className="mt-3 text-sm text-slate-400">
              View warnings and evacuation notices.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}