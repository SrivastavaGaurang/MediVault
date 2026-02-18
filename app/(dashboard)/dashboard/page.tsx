"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, QrCode, ClipboardList, ArrowRight, FileText, Plus, Upload } from "lucide-react";


export default function DashboardPage() {
    const { user } = useAuth();
    const userName = user?.displayName || user?.email?.split("@")[0] || "User";

    return (
        <div className="relative min-h-[calc(100vh-4rem)] text-white overflow-hidden">
            {/* Background managed by layout */}
            <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">{userName}</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Your decentralized health vault is active and secure.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <DashboardCard
                        icon={<User className="w-8 h-8 text-cyan-400" />}
                        title="Medical Profile"
                        description="Manage your allergies, medications, and vital health data."
                        actionLink="/profile"
                        actionText="Edit Profile"
                        gradient="from-cyan-500/10 to-blue-500/10"
                        border="group-hover:border-cyan-500/30"
                    />

                    <DashboardCard
                        icon={<QrCode className="w-8 h-8 text-violet-400" />}
                        title="Share Access"
                        description="Generate secure, temporary QR codes for emergency responders or doctors."
                        actionLink="/share"
                        actionText="Generate QR"
                        gradient="from-violet-500/10 to-fuchsia-500/10"
                        border="group-hover:border-violet-500/30"
                    />

                    <DashboardCard
                        icon={<ClipboardList className="w-8 h-8 text-fuchsia-400" />}
                        title="Access Logs"
                        description="Monitor who has accessed your data and when. Full transparency."
                        actionLink="/history"
                        actionText="View History"
                        gradient="from-fuchsia-500/10 to-pink-500/10"
                        border="group-hover:border-fuchsia-500/30"
                    />

                    <DashboardCard
                        icon={<FileText className="w-8 h-8 text-emerald-400" />}
                        title="Diagnostic Reports"
                        description="Store and organize lab results, X-rays, and other medical documents."
                        actionLink="/reports"
                        actionText="View Reports"
                        gradient="from-emerald-500/10 to-green-500/10"
                        border="group-hover:border-emerald-500/30"
                    />
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <Button asChild variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                            <Link href="/profile">
                                <Plus className="mr-2 h-4 w-4 text-cyan-400" /> Log Visit / Surgery
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                            <Link href="/reports">
                                <Upload className="mr-2 h-4 w-4 text-emerald-400" /> Upload Report
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ icon, title, description, actionLink, actionText, gradient, border }: { icon: React.ReactNode, title: string, description: string, actionLink: string, actionText: string, gradient: string, border: string }) {
    return (
        <Card className={`group relative border-slate-800 bg-slate-900/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${border}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <CardHeader className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-950/50 border border-slate-800 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                    {title}
                </CardTitle>
                <CardDescription className="text-slate-400">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
                <Button asChild className="w-full bg-slate-800/50 hover:bg-slate-700 text-white border border-slate-700/50 hover:border-slate-600 transition-all group-hover:shadow-lg">
                    <Link href={actionLink} className="flex items-center justify-center gap-2">
                        {actionText}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
