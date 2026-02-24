"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, FileText, QrCode, Users, HeartPulse } from "lucide-react";

export function StorySection() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Secure Health Vault",
            desc: "Store your complete medical history — allergies, medications, past surgeries, chronic conditions — in one encrypted, tamper-proof digital vault.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
        },
        {
            icon: QrCode,
            title: "Emergency QR Access",
            desc: "Generate a scannable QR code that gives paramedics and ER staff instant read-only access to your critical medical data — no app install required.",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10 border-cyan-500/20",
        },
        {
            icon: FileText,
            title: "Medical Reports & Records",
            desc: "Upload and manage prescriptions, lab reports, imaging results, and visit notes — organized chronologically and accessible anytime, anywhere.",
            color: "text-violet-400",
            bg: "bg-violet-500/10 border-violet-500/20",
        },
        {
            icon: Users,
            title: "Controlled Access Sharing",
            desc: "Share your health profile selectively with doctors, family members, or caregivers with time-limited, permission-based access links.",
            color: "text-orange-400",
            bg: "bg-orange-500/10 border-orange-500/20",
        },
        {
            icon: HeartPulse,
            title: "Vital Stats Dashboard",
            desc: "Track blood type, allergies, emergency contacts, and critical health indicators in a clean, at-a-glance dashboard built for speed.",
            color: "text-pink-400",
            bg: "bg-pink-500/10 border-pink-500/20",
        },
        {
            icon: Clock,
            title: "Always Available",
            desc: "Your data lives securely in the cloud and is accessible 24/7 from any device — phone, tablet, or desktop — with no downtime.",
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
        },
    ];

    return (
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>
            <div className="absolute top-0 right-0 w-[40%] h-[60%] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[40%] rounded-full bg-violet-500/8 blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                {/* Our Story */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                            Our Story: <br />
                            <span className="text-cyan-400">Born from Necessity</span>
                        </h2>
                        <div className="space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
                            <p>
                                It started with a simple, terrifying question:
                                <em className="text-white italic"> &quot;If I was unconscious right now, would the paramedics know about my severe allergy?&quot;</em>
                            </p>
                            <p>
                                In 2024, Gaurang Srivastava — a full-stack developer and MCA student — set out to answer that question.
                                While hospitals have modernized, the bridge between <span className="text-white font-medium">you</span> and the Emergency Room was still paper-thin.
                                A lost wallet or a locked phone could be the difference between life and death.
                            </p>
                            <p>
                                MediVault was built to be that bridge — secure enough for peace of mind, accessible enough to save a life.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-80 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-600/80 to-violet-700/80 flex items-center justify-center p-8 border border-white/10"
                    >
                        <div className="text-center">
                            <div className="text-7xl font-black text-white mb-2 tracking-tighter">2024</div>
                            <div className="text-cyan-200 font-medium text-lg">MediVault Launched</div>
                            <div className="w-16 h-[2px] bg-white mx-auto my-5 opacity-30" />
                            <p className="text-white text-lg font-medium opacity-90">&quot;Your health data, always where you need it.&quot;</p>
                        </div>
                    </motion.div>
                </div>

                {/* What MediVault Does */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        What <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">MediVault</span> Does
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A complete personal health record platform designed for real-world emergencies, doctor visits, and everyday health management.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`p-6 rounded-2xl border ${feature.bg} backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.bg} mb-4 border ${feature.bg}`}>
                                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                            </div>
                            <h3 className={`text-base font-bold mb-2 ${feature.color}`}>{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
