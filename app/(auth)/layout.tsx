"use client";

import { AuthVisual } from "@/components/3d/auth-visual";
import { Badge } from "@/components/ui/badge";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-slate-950 overflow-hidden">
            {/* Left Panel - 3D Visual & Branding (Hidden on mobile, 50% on desktop) */}
            <div className="hidden lg:flex w-1/2 relative flex-col p-12 text-white z-0">
                <div className="absolute inset-0 z-0">
                    <AuthVisual />
                    <div className="absolute inset-0 bg-slate-950/20 z-10" />
                </div>

                <div className="relative z-20 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                        <div className="h-4 w-4 bg-white rounded-full" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">MediVault</span>
                </div>

                <div className="relative z-20 mt-auto space-y-4">
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 backdrop-blur-md">
                        Secure Access
                    </Badge>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight">
                        Your biological identity, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                            decentralized.
                        </span>
                    </h1>
                    <p className="text-slate-400 max-w-sm text-lg">
                        Enter the vault to access your encrypted medical records and emergency protocols.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form Container (Full width on mobile, 50% on desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
                {/* Mobile Background (Aurora) */}
                <div className="absolute inset-0 lg:hidden z-0">
                    <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-500/20 blur-[100px]" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-cyan-500/20 blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-md p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
