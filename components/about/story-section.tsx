"use client";

import { motion } from "framer-motion";

export function StorySection() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                            Our Story: <br />
                            <span className="text-blue-400">Born from Necessity</span>
                        </h2>
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p>
                                It started with a simple, terrifying question:
                                <em className="text-white italic"> &quot;If I was unconscious right now, would the paramedics know about my severe allergy?&quot;</em>
                            </p>
                            <p>
                                In 2023, our founder saw a gap in the healthcare system. While hospitals have modernized, the bridge between YOU and the Emergency Room was still paper-thin. A lost wallet or a locked phone could mean the difference between life and death.
                            </p>
                            <p>
                                MediVault was built to be that bridge. We didn&apos;t just want to build a storage app; we wanted to build a lifeline. One that is secure enough for peace of mind, but accessible enough to save a life.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center p-8"
                    >
                        <div className="text-center">
                            <div className="text-6xl font-bold text-white mb-2">2024</div>
                            <div className="text-blue-200">MediVault Launched</div>
                            <div className="w-16 h-1 bg-white mx-auto my-6 opacity-50"></div>
                            <p className="text-white text-xl font-medium">&quot;Our history is short,<br />but our mission is forever.&quot;</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
