"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeamSection() {
    const team = [
        {
            name: "Dr. Sarah Chen",
            role: "Chief Medical Officer",
            bio: "Former ER attending with 15 years of experience. Passionate about bridging the gap between field medicine and digital records.",
            initials: "SC"
        },
        {
            name: "Marcus Reynolds",
            role: "Head of Engineering",
            bio: "Cybersecurity veteran who previously secured banking infrastructure. Believes health data deserves the highest standard of protection.",
            initials: "MR"
        },
        {
            name: "Elena Rodriguez",
            role: "Product Design",
            bio: "UX researcher focused on accessible design for high-stress environments. ensuring MediVault works when panic sets in.",
            initials: "ER"
        },
        {
            name: "David Kim",
            role: "Lead Developer",
            bio: "Full-stack wizard specializing in real-time data systems and offline-first architectures.",
            initials: "DK"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Meet the Minds</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Built by doctors, engineers, and designers who believe in a safer future.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="text-center group"
                        >
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-xl group-hover:border-blue-100 dark:group-hover:border-blue-900 transition-colors duration-300">
                                    <Avatar className="w-full h-full">
                                        <AvatarImage
                                            src={`https://ui-avatars.com/api/?name=${member.name}&background=random&color=fff&size=128`}
                                            alt={member.name}
                                        />
                                        <AvatarFallback className="text-2xl bg-slate-200 text-slate-600">{member.initials}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">{member.role}</p>
                            <p className="text-slate-500 text-sm leading-relaxed px-4">
                                {member.bio}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
