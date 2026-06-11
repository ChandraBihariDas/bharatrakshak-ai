"use client";

import { useState, useEffect } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Zap,
  Activity,
  Waves,
  Wind,
  Thermometer,
  Mountain,
  Users,
  ArrowRight,
  Menu,
  X,
  Mail,
  BrainCircuit,
  MessageSquare,
  Database,
  Eye,
  Siren,
  Bell,
  CheckCircle,
  Navigation,
  Radio,
  MapPin,
  Target,
  Globe,
} from "lucide-react";

/* ─────────────────────────────────────────
   GitHub icon (removed from lucide-react in v0.400+)
───────────────────────────────────────── */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Fonts
───────────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "SOS", href: "#sos" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "1,000+", label: "Citizens Protected", icon: Users, color: "text-orange-400", glow: "#FF6B00" },
  { value: "50+", label: "Disaster-Prone Regions", icon: MapPin, color: "text-amber-400", glow: "#F59E0B" },
  { value: "95%", label: "Prediction Accuracy", icon: Target, color: "text-emerald-400", glow: "#10B981" },
  { value: "24 / 7", label: "Emergency Monitoring", icon: Activity, color: "text-sky-400", glow: "#38BDF8" },
];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Risk Prediction",
    description:
      "Predict floods, landslides, cyclones, and heatwaves using advanced AI models trained on Indian geodata and decades of climate history.",
    accent: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/25" },
  },
  {
    icon: Eye,
    title: "Damage Detection",
    description:
      "Analyze uploaded satellite imagery to identify and classify infrastructure damage in real time — pinpointing the areas hardest hit.",
    accent: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" },
  },
  {
    icon: Siren,
    title: "Emergency SOS",
    description:
      "Citizens submit SOS requests with GPS coordinates. Requests are automatically triaged and routed to the nearest available rescue teams.",
    accent: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/25" },
  },
  {
    icon: Navigation,
    title: "Rescue Intelligence",
    description:
      "Provide authorities with AI-generated rescue routes, resource allocation maps, and evacuation corridor recommendations.",
    accent: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/25" },
  },
  {
    icon: MessageSquare,
    title: "Multilingual Alerts",
    description:
      "Broadcast disaster warnings in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, and 10+ more Indian languages — reaching every community.",
    accent: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/25" },
  },
  {
    icon: Globe,
    title: "Disaster Dashboard",
    description:
      "A real-time situational awareness console that gives authorities a unified view of all active incidents, response status, and resource deployment.",
    accent: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
  },
];

const STEPS = [
  {
    step: "01",
    icon: Database,
    title: "Collect Data",
    description:
      "Aggregate satellite feeds, weather stations, seismic sensors, river-level gauges, and citizen reports from across India.",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "AI Risk Analysis",
    description:
      "Multi-modal ML models process incoming streams and compute real-time risk probability scores per district and zone.",
  },
  {
    step: "03",
    icon: Bell,
    title: "Generate Alerts",
    description:
      "Automated multilingual alerts are pushed to citizens, rescue teams, and government agencies within seconds of a risk threshold breach.",
  },
  {
    step: "04",
    icon: Navigation,
    title: "Coordinate Rescue",
    description:
      "Authorities receive AI-optimized rescue plans, resource maps, and live coordination tools to deploy teams where they're needed most.",
  },
];

const IMPACT_ITEMS = [
  { icon: Waves, label: "Flood Response", description: "Early warning 6–12 hours ahead of peak flow" },
  { icon: Wind, label: "Cyclone Preparedness", description: "Track and model storm trajectories in real time" },
  { icon: Mountain, label: "Landslide Monitoring", description: "Slope stability risk scoring across hill states" },
  { icon: Users, label: "Community Safety", description: "Localized multilingual community alerts" },
  { icon: Zap, label: "Emergency Management", description: "Integrated coordination for NDRF / SDRF" },
  { icon: Thermometer, label: "Heatwave Detection", description: "Urban heat island mapping and health alerts" },
];

/* ─────────────────────────────────────────
   Page component
───────────────────────────────────────── */
export default function BharatRakshakPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-[#06090F] text-white overflow-x-hidden antialiased`}
      style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
    >
      {/* ── Global animation styles ── */}
      <style>{`
        :root { scroll-behavior: smooth; }

        /* Radar sweep */
        @keyframes radarPulse {
          0%   { transform: scale(0.2); opacity: 0.7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .radar-ring {
          position: absolute; inset: 0;
          border-radius: 9999px;
          border: 1.5px solid rgba(255,107,0,0.35);
          animation: radarPulse 3.6s cubic-bezier(0,0,0.2,1) infinite;
          pointer-events: none;
        }
        .radar-ring:nth-child(2) { animation-delay: 1.2s; }
        .radar-ring:nth-child(3) { animation-delay: 2.4s; }

        /* Float */
        @keyframes cardFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .float-card { animation: cardFloat 5s ease-in-out infinite; }

        /* Blink dot */
        @keyframes blinkDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }
        .blink-dot { animation: blinkDot 1.6s ease-in-out infinite; }

        /* Gradient text — saffron */
        .gradient-text {
          background: linear-gradient(120deg, #FF6B00 10%, #F59E0B 55%, #FF6B00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* Display font helper */
        .df { font-family: var(--font-display, 'Space Grotesk', sans-serif); }

        /* Subtle card hover lift */
        .hover-lift {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px -10px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#06090F]/85 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group" aria-label="BharatRakshak AI home">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-500 rounded-[8px] opacity-20 group-hover:opacity-30 transition-opacity" />
                <Shield className="w-[18px] h-[18px] text-orange-400 relative z-10" strokeWidth={2} />
              </div>
              <span className="df font-bold text-white text-[15px] tracking-tight leading-none">
                BharatRakshak <span className="text-orange-400">AI</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#7A8499] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#7A8499] hover:text-white hover:bg-white/5 h-9 px-4 text-sm"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold h-9 px-4 text-sm rounded-lg border-0 transition-colors"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 text-[#7A8499] hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#08090F]/96 backdrop-blur-2xl border-t border-white/[0.06]">
            <nav className="px-5 py-5 space-y-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-sm text-[#7A8499] hover:text-white border-b border-white/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4">
                <Button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold h-11 rounded-lg border-0">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16"
        aria-label="Hero"
      >
        {/* Background layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.028]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Ambient glow orbs */}
          <div className="absolute top-[15%] left-[10%] w-[520px] h-[520px] bg-orange-500/[0.07] rounded-full blur-[130px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[110px]" />

          {/* Radar — desktop only, right side */}
          <div className="absolute hidden lg:flex items-center justify-center top-1/2 right-[-6%] -translate-y-1/2 w-[560px] h-[560px] opacity-25">
            <div className="relative w-full h-full">
              <div className="radar-ring" />
              <div className="radar-ring" />
              <div className="radar-ring" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-orange-500 shadow-[0_0_28px_8px_rgba(255,107,0,0.55)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

            {/* Left column */}
            <div className="max-w-[600px]">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-7">
                <span className="blink-dot w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-[11px] font-semibold text-orange-300 tracking-widest uppercase">
                  India's Disaster Intelligence Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="df text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-bold tracking-tight leading-[1.07] text-white mb-6">
                AI-Powered{" "}
                <span className="gradient-text">Disaster Early Warning</span>{" "}
                &amp; Rescue Intelligence
              </h1>

              {/* Sub */}
              <p className="text-[#7A8499] text-base sm:text-lg leading-relaxed mb-9 max-w-[520px]">
                Helping communities predict disasters, receive timely alerts, and coordinate rescue operations faster — powered by AI purpose-built for India.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Button
                  className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 h-12 rounded-xl border-0 gap-2 text-sm transition-colors shadow-[0_0_24px_rgba(255,107,0,0.35)]"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/12 text-white hover:bg-white/5 hover:border-white/20 h-12 px-6 rounded-xl gap-2 text-sm transition-colors"
                >
                  <Activity className="w-4 h-4 text-orange-400" />
                  View Dashboard
                </Button>
              </div>

              {/* Tagline pills */}
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { emoji: "📡", word: "Predict" },
                    { emoji: "🔔", word: "Alert" },
                    { emoji: "🛟", word: "Rescue" },
                  ] as const
                ).map(({ emoji, word }) => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-[#7A8499]"
                  >
                    <span role="img" aria-hidden="true">{emoji}</span>
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Right column — dashboard mockup */}
            <div className="float-card w-full max-w-[480px] mx-auto lg:mx-0">
              <Card className="bg-[#0C1220] border border-[#192035] rounded-2xl overflow-hidden shadow-[0_0_90px_rgba(255,107,0,0.07)]">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#192035]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2.5 text-[11px] text-[#4A5568] font-medium">
                      BharatRakshak AI — Live Monitor
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="blink-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wider">LIVE</span>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Mini stat row */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {[
                      { label: "Active Alerts", value: "3", color: "text-red-400" },
                      { label: "Regions", value: "12", color: "text-sky-400" },
                      { label: "Teams Active", value: "8", color: "text-emerald-400" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-[#111827] rounded-xl p-3 text-center border border-white/[0.04]"
                      >
                        <div className={`df text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-[9px] text-[#4A5568] mt-0.5 font-medium">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Alert list */}
                  <p className="text-[9px] font-bold text-[#4A5568] tracking-[0.12em] uppercase mb-2.5">
                    Active Incidents
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      { sev: "CRITICAL", bar: "bg-red-500", label: "text-red-400", type: "Cyclone Alert", loc: "Bay of Bengal", Icon: Wind },
                      { sev: "HIGH", bar: "bg-orange-500", label: "text-orange-400", type: "Flood Warning", loc: "Assam, India", Icon: Waves },
                      { sev: "MODERATE", bar: "bg-amber-500", label: "text-amber-400", type: "Heatwave", loc: "Rajasthan", Icon: Thermometer },
                    ].map((a) => (
                      <div
                        key={a.type}
                        className="flex items-center gap-3 p-2.5 bg-[#111827] rounded-xl border border-white/[0.04]"
                      >
                        <div className={`w-1 self-stretch rounded-full ${a.bar} opacity-80 min-h-[36px]`} />
                        <a.Icon className={`w-3.5 h-3.5 ${a.label} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-white truncate">{a.type}</div>
                          <div className="text-[10px] text-[#4A5568] truncate">{a.loc}</div>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${a.label} bg-white/[0.04] border-current/30 flex-shrink-0`}
                        >
                          {a.sev}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Prediction engine bar */}
                  <div className="flex items-center justify-between p-2.5 bg-[#111827] rounded-xl border border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-[10px] text-[#5A6478] font-medium">Prediction Engine</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="blink-dot w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span className="text-[10px] font-bold text-orange-400 tracking-wider">ACTIVE</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#06090F] to-transparent pointer-events-none" aria-hidden="true" />
      </section>

      {/* ══════════════════════════════════════════
          STATS
      ══════════════════════════════════════════ */}
      <section aria-label="Statistics" className="py-16 border-y border-[#141C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ value, label, icon: Icon, color, glow }) => (
              <Card
                key={label}
                className="bg-[#0C1220] border-[#192035] rounded-2xl hover-lift"
              >
                <CardContent className="p-6 text-center">
                  {/* Top accent bar */}
                  <div className="w-10 h-0.5 mx-auto mb-5 rounded-full" style={{ background: glow, opacity: 0.6 }} />
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-3`} strokeWidth={1.8} />
                  <div className={`df text-3xl sm:text-4xl font-bold ${color} mb-1.5 tracking-tight`}>
                    {value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#5A6478] font-medium">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section id="features" aria-label="Core features" className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[11px] font-semibold text-[#7A8499] tracking-widest uppercase">
                Core Capabilities
              </span>
            </div>
            <h2 className="df text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Everything you need to{" "}
              <span className="gradient-text">respond faster</span>
            </h2>
            <p className="text-[#5A6478] text-base max-w-lg mx-auto leading-relaxed">
              A complete AI-powered suite for disaster prediction, response, and recovery — designed for India's unique geography and scale.
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon: Icon, title, description, accent }) => (
              <Card
                key={title}
                className={`bg-[#0C1220] border ${accent.border} rounded-2xl hover-lift group`}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-11 h-11 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center mb-5`}
                  >
                    <Icon className={`w-5 h-5 ${accent.text}`} strokeWidth={1.8} />
                  </div>
                  <h3 className="df text-base font-semibold text-white mb-2.5 group-hover:text-orange-100 transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-[#5A6478] leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section aria-label="How it works" className="py-28 border-t border-[#141C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5">
              <Radio className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[11px] font-semibold text-[#7A8499] tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="df text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              From data to rescue in{" "}
              <span className="gradient-text">minutes</span>
            </h2>
            <p className="text-[#5A6478] text-base max-w-lg mx-auto leading-relaxed">
              Our AI pipeline transforms raw environmental data into coordinated rescue operations at unprecedented speed.
            </p>
          </div>

          {/* Steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Desktop connector track */}
            <div
              className="hidden lg:block absolute top-[52px] left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,107,0,0.2) 20%, rgba(255,107,0,0.2) 80%, transparent)",
              }}
              aria-hidden="true"
            />

            {STEPS.map(({ step, icon: Icon, title, description }, idx) => (
              <div key={step} className="relative">
                <Card className="bg-[#0C1220] border-[#192035] rounded-2xl hover-lift h-full">
                  <CardContent className="p-6">
                    {/* Step number + icon row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 relative z-10">
                        <Icon className="w-5 h-5 text-orange-400" strokeWidth={1.8} />
                      </div>
                      <span className="df text-4xl font-bold text-[#192035] select-none leading-none">
                        {step}
                      </span>
                    </div>
                    <h3 className="df text-base font-semibold text-white mb-2">{title}</h3>
                    <p className="text-sm text-[#5A6478] leading-relaxed">{description}</p>

                    {/* Arrow connector — desktop only, not on last */}
                    {idx < STEPS.length - 1 && (
                      <div
                        className="hidden lg:flex absolute -right-3 top-12 z-20 w-6 h-6 rounded-full bg-[#0C1220] border border-orange-500/20 items-center justify-center"
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3 h-3 text-orange-400/60" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          IMPACT
      ══════════════════════════════════════════ */}
      <section id="dashboard" aria-label="Impact" className="py-28 border-t border-[#141C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                <Shield className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[11px] font-semibold text-[#7A8499] tracking-widest uppercase">
                  Built for India
                </span>
              </div>
              <h2 className="df text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                Built for India's Most{" "}
                <span className="gradient-text">Critical Challenges</span>
              </h2>
              <p className="text-[#5A6478] text-base leading-relaxed mb-9">
                India faces some of the world's most frequent and complex natural disasters. BharatRakshak AI is purpose-built to protect every citizen — from the Himalayas to the coastline, across every state.
              </p>

              <ul className="space-y-3.5" role="list">
                {[
                  "Real-time flood response for river basin communities",
                  "Cyclone path modeling for all coastal states",
                  "Landslide risk scoring across Himalayan regions",
                  "Heatwave health alerts for densely-populated cities",
                  "Integrated emergency coordination for NDRF and SDRF",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-[18px] h-[18px] text-orange-400 mt-0.5 flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-sm text-[#7A8499]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — impact grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {IMPACT_ITEMS.map(({ icon: Icon, label, description }) => (
                <Card
                  key={label}
                  className="bg-[#0C1220] border-[#192035] rounded-2xl hover-lift group"
                >
                  <CardContent className="p-4">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/15 flex items-center justify-center mb-3 group-hover:bg-orange-500/15 transition-colors">
                      <Icon className="w-4 h-4 text-orange-400" strokeWidth={1.8} />
                    </div>
                    <div className="df text-sm font-semibold text-white mb-1">{label}</div>
                    <div className="text-[11px] text-[#4A5568] leading-snug">{description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section id="sos" aria-label="Call to action" className="py-28 border-t border-[#141C2C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(255,107,0,0.06) 0%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative bg-[#0C1220] border border-[#192035] rounded-3xl p-10 sm:p-16 text-center">
              {/* Icon */}
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-7">
                <Shield className="w-8 h-8 text-orange-400" strokeWidth={1.6} />
              </div>

              <h2 className="df text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to Build a{" "}
                <span className="gradient-text">Safer Future?</span>
              </h2>
              <p className="text-[#5A6478] text-base mb-9 max-w-md mx-auto leading-relaxed">
                Join rescue teams, government agencies, and communities across India using BharatRakshak AI to save lives — every single day.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 h-12 rounded-xl border-0 gap-2 text-sm shadow-[0_0_30px_rgba(255,107,0,0.4)] transition-colors">
                  <Activity className="w-4 h-4" />
                  Launch Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/25 text-red-400 hover:bg-red-500/10 hover:border-red-500/40 h-12 px-8 rounded-xl gap-2 text-sm transition-colors"
                >
                  <Siren className="w-4 h-4" />
                  Report Emergency
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer
        id="contact"
        aria-label="Site footer"
        className="border-t border-[#141C2C] py-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <div className="absolute inset-0 bg-orange-500 rounded-[7px] opacity-20" />
                  <Shield className="w-4 h-4 text-orange-400 relative z-10" strokeWidth={2} />
                </div>
                <span className="df font-bold text-white text-[14px] tracking-tight">
                  BharatRakshak <span className="text-orange-400">AI</span>
                </span>
              </div>
              <p className="text-xs text-[#4A5568] mb-4">Predict. Alert. Rescue.</p>
              <p className="text-xs text-[#2E3847]">
                &copy; {new Date().getFullYear()} BharatRakshak AI. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#5A6478] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                aria-label="GitHub repository"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:contact@bharatrakshak.ai"
                className="flex items-center gap-2 text-sm text-[#5A6478] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                aria-label="Contact email"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-xs h-8 px-4 rounded-lg border-0 transition-colors"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}




/*
// app/page.tsx
import { CommandCta } from "@/components/landing/command-cta";
import { CoreFeatures } from "@/components/landing/core-features";
import { DisasterMapPreview } from "@/components/landing/disaster-map-preview";
import { HeroSection } from "@/components/landing/hero-section";
import { ResponseWorkflow } from "@/components/landing/response-workflow";
import { TechnicalArchitecture } from "@/components/landing/technical-architecture";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070a] text-slate-100">
      <HeroSection />
      <DisasterMapPreview />
      <CoreFeatures />
      <ResponseWorkflow />
      <TechnicalArchitecture />
      <CommandCta />
    </main>
  );
}
*/