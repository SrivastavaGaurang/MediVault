"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Ready to take control of your health?
                </h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
                    Join thousands of users who trust MediVault with their critical information.
                    It&apos;s free to start, and secure by design.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50">
                            Create Free Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-400 text-white hover:bg-blue-600/50">
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
