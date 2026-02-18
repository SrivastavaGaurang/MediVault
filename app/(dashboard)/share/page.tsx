"use client";

import { QRGenerator } from "@/components/qr/qr-generator";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SharePage() {
    return (
        <div className="max-w-md mx-auto py-8 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <BackButton />

            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                    Share Records
                </h1>
                <p className="text-slate-400">
                    Grant temporary access to medical professionals.
                </p>
            </div>

            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-white">Secure QR Code</CardTitle>
                    <CardDescription className="text-slate-400">
                        Scan this code to view your limited medical profile.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center p-6 bg-white/5 rounded-b-lg">
                    <QRGenerator />
                </CardContent>
            </Card>
        </div>
    );
}
