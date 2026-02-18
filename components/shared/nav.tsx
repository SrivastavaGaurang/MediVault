"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <span className="text-lg font-bold">MediVault</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/profile"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Profile
                    </Link>
                    <Link
                        href="/share"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Share
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        About
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        Log out
                    </Button>
                </nav>
            </div>
        </header>
    );
}
