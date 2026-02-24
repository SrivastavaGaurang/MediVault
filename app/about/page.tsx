"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { DNAHelix } from "@/components/3d/dna-helix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, HeartPulse, Lock, Globe, Smartphone, QrCode, FileText, Users } from "lucide-react";
import { TeamSection } from "@/components/about/team-section";
import { StorySection } from "@/components/about/story-section";
import { UsageSection } from "@/components/about/usage-section";
import { CTASection } from "@/components/about/cta-section";
import { BentoGrid, BentoGridItem } from "@/components/about/bento-grid";
import { useRef, Suspense } from "react";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-950 overflow-hidden selection:bg-cyan-500/30">

            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[0%] right-[-5%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* 3D Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-950/80 to-slate-950 z-10" />

                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><p className="text-slate-500 tracking-widest uppercase text-xs">Initializing Neural Link...</p></div>}>
                        <DNAHelix />
                    </Suspense>
                </motion.div>

                <div className="z-20 text-center px-6 max-w-5xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <Badge variant="outline" className="mb-8 border-cyan-500/30 bg-cyan-500/5 text-cyan-400 px-6 py-2 text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]">
                            Personal Health Record Platform
                        </Badge>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500">Vault</span> for Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 animate-gradient">
                                Vital Existence.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                            Your complete medical history, emergency QR access, and health records — <span className="text-slate-200 font-medium">always with you.</span> Built to protect lives with <span className="text-slate-200 font-medium">military-grade encryption.</span>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
                    >
                        <Link href="/signup">
                            <Button size="lg" className="h-14 px-10 bg-white text-slate-950 hover:bg-cyan-50 font-bold text-lg rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.4)] transition-all duration-300">
                                Initialize Vault <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-40 px-6 lg:px-24 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Emergencies.</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        When seconds count, complexity kills. MediVault strips away the noise and delivers your vital health data instantly — to anyone who needs it, anywhere on Earth.
                    </p>
                </div>

                <BentoGrid className="max-w-7xl mx-auto">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={`${i === 3 || i === 6 ? "md:col-span-2" : ""} border-slate-800/50 bg-slate-900/20 backdrop-blur-xl hover:bg-slate-800/40 transition-all duration-500 group`}
                        />
                    ))}
                </BentoGrid>
            </section>

            <StorySection />
            <UsageSection />
            <TeamSection />
            <CTASection />
        </div>
    );
}

const items = [
    {
        title: "Emergency QR Access",
        description: "Generate a scannable QR code that gives paramedics and ER staff instant, read-only access to your critical medical info — no app install needed.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                <QrCode className="h-16 w-16 text-blue-500/80 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
        ),
        icon: <QrCode className="h-4 w-4 text-blue-500" />,
    },
    {
        title: "AES-256 Encryption",
        description: "Military-grade encryption protects every byte of your health data. Only you and those you authorize can ever access your records.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Lock className="h-16 w-16 text-emerald-500/80 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            </div>
        ),
        icon: <Lock className="h-4 w-4 text-emerald-500" />,
    },
    {
        title: "Global Cloud Access",
        description: "Your vault lives in the cloud — accessible 24/7 from any phone, tablet, or desktop, anywhere in the world.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Globe className="h-16 w-16 text-orange-500/80 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            </div>
        ),
        icon: <Globe className="h-4 w-4 text-orange-500" />,
    },
    {
        title: "Vital Stats & Medical Profile",
        description: "Store blood type, allergies, current medications, emergency contacts, and chronic conditions all in one structured, scannable medical profile. Doctors get what they need in seconds.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20">
                <HeartPulse className="h-16 w-16 text-pink-500/80 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
            </div>
        ),
        icon: <HeartPulse className="h-4 w-4 text-pink-500" />,
    },
    {
        title: "Reports & Document Upload",
        description: "Upload lab results, prescriptions, imaging reports, and doctor notes. All documents are organized chronologically and searchable.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
                <FileText className="h-16 w-16 text-violet-500/80 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
            </div>
        ),
        icon: <FileText className="h-4 w-4 text-violet-500" />,
    },
    {
        title: "Controlled Access Sharing",
        description: "Share your health profile with any doctor, family member, or caregiver via a secure, time-limited, permission-based access link. Revoke anytime.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Users className="h-16 w-16 text-cyan-500/80 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </div>
        ),
        icon: <Users className="h-4 w-4 text-cyan-500" />,
    },
    {
        title: "Works on Every Device",
        description: "Fully responsive and optimized for iOS, Android, and all major desktop browsers. No app install required for emergency viewers.",
        header: (
            <div className="flex flex-1 w-full h-full min-h-[6rem] items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Smartphone className="h-16 w-16 text-amber-500/80 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            </div>
        ),
        icon: <Smartphone className="h-4 w-4 text-amber-500" />,
    },
];
