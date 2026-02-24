"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Zap, ServerOff, Fingerprint } from "lucide-react";

export function UsageSection() {
    const pros = [
        {
            icon: Zap,
            title: "Instant Emergency Access",
            desc: "Critical health data is accessible via a scannable QR code by any first responder in seconds."
        },
        {
            icon: Fingerprint,
            title: "Cryptographic Security",
            desc: "All personal and medical data is encrypted with AES-256 standard before being stored in our database."
        },
        {
            icon: CheckCircle2,
            title: "Centralized Records",
            desc: "No more carrying paper files. Prescriptions, lab reports, and imaging are safely stored in one place."
        }
    ];

    const limitations = [
        {
            icon: ServerOff,
            title: "Requires Internet Connection",
            desc: "MediVault is a cloud-native platform. In areas with zero network connectivity, real-time data retrieval may fail."
        },
        {
            icon: AlertTriangle,
            title: "Relies on Device Battery",
            desc: "If your smartphone dies during an emergency, first responders cannot scan your QR code unless printed physically."
        },
        {
            icon: XCircle,
            title: "Not a Replacement for Professional Care",
            desc: "MediVault stores historical data but does not offer live diagnostics or replace professional medical advice."
        }
    ];

    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative z-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Capabilities</span> & <span className="text-slate-500">Limitations</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Transparency is key in healthcare. Here is an honest breakdown of what MediVault excels at, and where its current limitations lie.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Pros Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-slate-900/50 border border-emerald-500/20 shadow-[0_0_30px_-15px_rgba(16,185,129,0.2)]"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                            </span>
                            Strengths & Usage
                        </h3>
                        <div className="space-y-6">
                            {pros.map((pro, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 shrink-0">
                                        <pro.icon className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg mb-1">{pro.title}</h4>
                                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">{pro.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Cons Container */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-slate-900/50 border border-red-500/20 shadow-[0_0_30px_-15px_rgba(239,68,68,0.2)]"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                            </span>
                            Current Limitations
                        </h3>
                        <div className="space-y-6">
                            {limitations.map((con, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 shrink-0">
                                        <con.icon className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg mb-1">{con.title}</h4>
                                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">{con.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
