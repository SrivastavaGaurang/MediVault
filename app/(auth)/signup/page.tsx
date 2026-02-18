"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { signupSchema } from "@/lib/validations";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Create User in Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            const user = userCredential.user;

            // 2. Create User Document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: data.email.split("@")[0], // Default name
                createdAt: serverTimestamp(),
                profile: {
                    allergies: [],
                    medications: [],
                    conditions: [],
                    emergencyContacts: [],
                },
            });

            router.push("/dashboard");
        } catch (err: unknown) {
            console.error(err);
            const error = err as { code?: string; message?: string };
            if (error.code === "auth/email-already-in-use") {
                setError("Email is already in use.");
            } else if (error.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else if (error.code === "auth/invalid-api-key" || error.message?.includes("api-key")) {
                setError("Configuration Error: Invalid Firebase API Key in .env.local");
            } else {
                setError(error.message || "Failed to create account. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="border-cyan-500/20 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight text-center text-white">
                    Create an account
                </CardTitle>
                <CardDescription className="text-center text-slate-400">
                    Enter your email below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <SocialButtons />
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900/0 px-2 text-slate-500">
                                Or create account with
                            </span>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-400">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-300">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-400">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-400">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 border-0" type="submit" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="ml-1 font-medium text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                >
                    Sign in
                </Link>
            </CardFooter>
        </Card>
    );
}
