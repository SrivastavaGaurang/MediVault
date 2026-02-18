"use client";

import { motion } from "framer-motion";
import { Target, ShieldCheck, Users } from "lucide-react";

export function MissionSection() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight sm:text-4xl mb-6"
                    >
                        Our Mission
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground"
                    >
                        To empower every individual with complete ownership and instant portability of their critical medical data, ensuring that in emergencies, no second is lost to missing information.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            icon: <Target className="h-10 w-10 text-blue-500" />,
                            title: "Accessibility",
                            desc: "Your health records should be as accessible as your bank account, available whenever and wherever you need them."
                        },
                        {
                            icon: <ShieldCheck className="h-10 w-10 text-emerald-500" />,
                            title: "Security",
                            desc: "We prioritize privacy above all. Your data is encrypted, decentralized, and viewable only by whom you choose."
                        },
                        {
                            icon: <Users className="h-10 w-10 text-purple-500" />,
                            title: "Empowerment",
                            desc: "Patient-centered care starts with the patient. We give you the tools to be the protagonist of your health journey."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center"
                        >
                            <div className="bg-slate-100 dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
