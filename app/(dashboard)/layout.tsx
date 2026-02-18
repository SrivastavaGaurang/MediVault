"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { BackgroundVisual } from "@/components/3d/background-visual";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    const show3D = pathname !== "/share" && pathname !== "/profile";

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 relative overflow-hidden">
            {show3D && <BackgroundVisual />}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute bottom-[0%] left-[-5%] w-[30%] h-[30%] rounded-full bg-violet-500/10 blur-[100px]" />
            </div>
            <main className="relative z-10 container mx-auto px-4 py-8">{children}</main>
        </div>
    );
}
