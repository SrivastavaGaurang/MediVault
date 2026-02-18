"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/3d/hero-visual";
import { Shield, Zap, Globe } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export default function LandingPage() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-cyan-500/30">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center overflow-hidden">
                {/* 3D Background */}
                <HeroVisual />

                {/* Content Overlay */}
                <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        Secure. Decentralized. Private.
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                        Your Health, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 animate-gradient">
                            Decentralized &amp; Secure.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed text-balance">
                        MediVault gives you complete ownership of your medical data.
                        Encrypted on the blockchain, accessible only by you and those you trust.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/20 border-0 rounded-full transition-all hover:scale-105">
                            <Link href={user ? "/dashboard" : "/signup"}>
                                {user ? "Go to Dashboard" : "Get Started Free"}
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="h-12 px-8 text-lg font-semibold border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-300 rounded-full backdrop-blur-sm transition-all hover:scale-105">
                            <Link href="/about">How It Works</Link>
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-slate-500 rounded-full animate-scroll" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24 bg-slate-950">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

                <div className="container px-4 mx-auto">
                    <div className="grid gap-8 md:grid-cols-3">
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-cyan-400" />}
                            title="Zero-Knowledge Privacy"
                            description="Your data is encrypted before it leaves your device. Even we can't see your medical records."
                            delay={0}
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-violet-400" />}
                            title="Instant Access"
                            description="Share your profile with doctors instantly via QR code or temporary secure links."
                            delay={100}
                        />
                        <FeatureCard
                            icon={<Globe className="w-8 h-8 text-fuchsia-400" />}
                            title="Global Availability"
                            description="Access your critical health information from anywhere in the world, 24/7."
                            delay={200}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <div
            className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    {icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
            </div>
        </div>
    );
}
