"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#05070a] flex items-center justify-center p-6">
      <Card className="w-full max-w-xl border-white/10 bg-[#08111a]">
        <CardContent className="p-8">
          <h1 className="mb-8 text-center text-3xl font-semibold text-white">
            BharatRakshak AI
          </h1>

          <Tabs defaultValue="citizen">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="citizen">
                Citizen
              </TabsTrigger>

              <TabsTrigger value="responder">
                Responder
              </TabsTrigger>

              <TabsTrigger value="authority">
                Authority
              </TabsTrigger>
            </TabsList>

            {["citizen", "responder", "authority"].map((role) => (
              <TabsContent key={role} value={role}>
                <div className="space-y-4 mt-6">
                  <Input placeholder="Email" />
                  <Input
                    placeholder="Password"
                    type="password"
                  />

                  <Button className="w-full bg-cyan-300 text-black">
                    Login
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}