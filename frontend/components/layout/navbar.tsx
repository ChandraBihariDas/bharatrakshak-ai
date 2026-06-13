"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shield, ChevronDown } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-cyan-500/10 bg-[#05070a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold"
        >
          <Shield className="h-5 w-5 text-cyan-300" />
          BharatRakshak AI
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features">Features</a>
          <a href="#map">Disaster Map</a>
          <a href="#workflow">Workflow</a>
          <a href="#architecture">Architecture</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/role-select">
            <Button
              variant="outline"
              className="border-white/10 bg-white/5"
            >
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button className="bg-cyan-300 text-black hover:bg-cyan-200">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}