"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { LogOut, Activity } from "lucide-react";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function Header() {
    const { user } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                        MediVault
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/profile"
                                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                            >
                                Profile
                            </Link>
                            <div className="h-4 w-px bg-slate-800" />
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-400 hidden sm:block">
                                    {user.displayName || user.email?.split('@')[0]}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleSignOut}
                                    className="text-slate-400 hover:text-white hover:bg-white/10"
                                    title="Sign out"
                                >
                                    <LogOut className="h-5 w-5" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/about"
                                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors hidden sm:block"
                            >
                                About
                            </Link>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                            >
                                Sign in
                            </Link>
                            <Button asChild className="bg-cyan-600 hover:bg-cyan-500 text-white border-0 rounded-full shadow-lg shadow-cyan-500/20">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
