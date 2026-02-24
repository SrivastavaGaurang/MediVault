"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Mail, Globe, Code2, GraduationCap, Cpu } from "lucide-react";
import Link from "next/link";

export function TeamSection() {
    const developer = {
        name: "Gaurang Srivastava",
        role: "Founder & Full-Stack Developer",
        bio: "A passionate full-stack developer pursuing MCA at Lovely Professional University. Specializes in both front-end and back-end development with a keen interest in AI-driven health applications and IoT-based innovative solutions.",
        image: "https://res.cloudinary.com/dmilgqv8u/image/upload/v1762461514/WhatsApp_Image_2025-03-18_at_13.28.26_cede9a8b_sqdbyf.jpg",
        initials: "GS",
        skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "AI/ML"],
        education: "MCA @ Lovely Professional University",
        location: "Gorakhpur, Uttar Pradesh, India",
        links: {
            github: "https://github.com/SrivastavaGaurang",
            portfolio: "https://portfolio7117.netlify.app/",
            email: "gaurangsrivastava312@gmail.com",
        },
    };

    const techStack = [
        { label: "Frontend", value: "React · Next.js · TypeScript · Tailwind CSS" },
        { label: "Backend", value: "Node.js · Express · REST API" },
        { label: "Database", value: "MongoDB · PostgreSQL · Firebase" },
        { label: "Auth", value: "NextAuth · JWT · OAuth 2.0" },
        { label: "Hosting", value: "Vercel · Netlify · Cloud Services" },
        { label: "Security", value: "AES-256 Encryption · HTTPS · HIPAA-aligned" },
    ];

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Badge variant="outline" className="mb-6 border-violet-500/30 bg-violet-500/5 text-violet-400 px-5 py-2 text-xs tracking-[0.2em] uppercase">
                        Behind MediVault
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Minds</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        MediVault is a passion project built end-to-end by a developer who believes technology can save lives.
                    </p>
                </motion.div>

                {/* Developer Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-5 gap-8 items-start mb-20"
                >
                    {/* Left: Profile */}
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl">
                                <Avatar className="w-full h-full rounded-none">
                                    <AvatarImage
                                        src={developer.image}
                                        alt={developer.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <AvatarFallback className="text-4xl bg-slate-800 text-slate-300 rounded-none">
                                        {developer.initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-bold text-white mb-1">{developer.name}</h3>
                            <p className="text-violet-400 font-semibold text-sm mb-3">{developer.role}</p>
                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2 justify-center lg:justify-start">
                                <GraduationCap className="h-4 w-4 text-cyan-400 shrink-0" />
                                <span>{developer.education}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm justify-center lg:justify-start">
                                <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                                <span>{developer.location}</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            <Link href={developer.links.github} target="_blank"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all border border-slate-700 hover:border-slate-500">
                                <Github className="h-4 w-4" />
                                GitHub
                            </Link>
                            <Link href={developer.links.portfolio} target="_blank"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 hover:text-violet-300 text-sm font-medium transition-all border border-violet-500/30">
                                <Globe className="h-4 w-4" />
                                Portfolio
                            </Link>
                            <Link href={`mailto:${developer.links.email}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all border border-slate-700 hover:border-slate-500">
                                <Mail className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            {developer.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: Bio + Mission */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-400" /> About Me
                            </h4>
                            <p className="text-slate-300 leading-relaxed text-base">
                                {developer.bio}
                            </p>
                            <p className="text-slate-300 leading-relaxed text-base mt-4">
                                I built MediVault because I believe every person deserves instant access to their own health data — especially in emergencies.
                                This project merges my passion for healthcare technology with modern full-stack development to create something genuinely impactful.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
                            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                <Cpu className="h-5 w-5 text-cyan-400" /> Tech Stack Used
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {techStack.map((item) => (
                                    <div key={item.label} className="space-y-1">
                                        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-slate-400 text-sm">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-sm">
                            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                                <Code2 className="h-5 w-5 text-violet-400" /> Other Projects
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { name: "MedLytics", desc: "AI-Driven Health Analytics Platform" },
                                    { name: "HackQuest", desc: "Gamified Cybersecurity Platform" },
                                    { name: "AIIMS App", desc: "Hospital Mobile App (Ionic/Angular)" },
                                ].map((project) => (
                                    <div key={project.name} className="flex-1 min-w-[140px] p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                                        <p className="text-white font-semibold text-sm">{project.name}</p>
                                        <p className="text-slate-400 text-xs mt-1">{project.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
