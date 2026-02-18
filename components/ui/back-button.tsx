"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
    label?: string;
    fallbackPath?: string;
}

export function BackButton({ className, label = "Back", fallbackPath = "/dashboard" }: BackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 2) {
            router.back();
        } else {
            router.push(fallbackPath);
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleBack}
            className={cn("gap-2 text-slate-400 hover:text-white hover:bg-slate-800/50", className)}
        >
            <ArrowLeft className="w-4 h-4" />
            {label}
        </Button>
    );
}
