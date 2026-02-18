"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { ShareToken, UserProfile, MedicalProfile } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge"; // Removed to prevent error if missing

// Placeholder Badge component if not installed
function BadgePlaceholder({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "destructive" }) {
    const bg = variant === "destructive" ? "bg-red-100 text-red-800" : "bg-primary/10 text-primary";
    return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${bg}`}>{children}</span>;
}

export default function VerifyPage() {
    const params = useParams();
    const tokenId = params.token as string;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{
        profile: MedicalProfile;
        scopes: string[];
        user: UserProfile;
    } | null>(null);

    useEffect(() => {
        async function verifyToken() {
            if (!tokenId) return;
            try {
                const tokenRef = doc(db, "shareTokens", tokenId);
                const tokenSnap = await getDoc(tokenRef);

                if (!tokenSnap.exists()) {
                    setError("Invalid or expired access code.");
                    return;
                }

                const tokenData = tokenSnap.data() as ShareToken;
                const now = new Date();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const expiresAt = (tokenData.expiresAt as any) instanceof Date ? tokenData.expiresAt : (tokenData.expiresAt as any).toDate();

                if (now > expiresAt || !tokenData.active) {
                    setError("This access code has expired.");
                    return;
                }

                // Fetch User Profile
                const userRef = doc(db, "users", tokenData.userId);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    setError("User profile not found.");
                    return;
                }

                const userData = userSnap.data() as UserProfile;

                // Log Access
                await addDoc(collection(db, "accessLogs"), {
                    tokenId: tokenId,
                    userId: tokenData.userId,
                    accessedAt: serverTimestamp(),
                    userAgent: navigator.userAgent
                });

                setData({
                    profile: userData.profile!,
                    scopes: tokenData.scopes,
                    user: userData
                });

            } catch (err) {
                console.error("Verification error:", err);
                setError("Failed to verify access code.");
            } finally {
                setLoading(false);
            }
        }

        verifyToken();
    }, [tokenId]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Verifying secure access...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">Access Denied</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (!data) return null;

    const { profile, scopes, user } = data;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Medical Record Access</h1>
                        <p className="text-muted-foreground">Patient: {user.displayName || "Unknown"}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Verified Access
                    </div>
                </div>

                {/* Basic Info - Always shown if available and requested? Or strictly by scope? 
            Let's show basic info if any scope is allowed for now, or maybe strict scopes.
            For MVP, I'll show what's in scopes.
        */}

                {(scopes.includes("conditions") || scopes.includes("medications")) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Physical Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Blood Type</span>
                                <p className="text-lg font-semibold">{profile.bloodType || "N/A"}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Height/Weight</span>
                                <p>{profile.height || "N/A"} / {profile.weight || "N/A"}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {scopes.includes("allergies") && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Allergies
                                <BadgePlaceholder variant="destructive">Critical</BadgePlaceholder>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile.allergies.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {profile.allergies.map((allergy, i) => (
                                        <span key={i} className="bg-red-50 text-red-700 px-3 py-1 rounded-md font-medium border border-red-100">
                                            {allergy}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No known allergies.</p>
                            )}
                        </CardContent>
                    </Card>
                )}

                {scopes.includes("medications") && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Medications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile.medications.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {profile.medications.map((med, i) => (
                                        <li key={i} className="text-lg">{med}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground">No active medications.</p>
                            )}
                        </CardContent>
                    </Card>
                )}

                {scopes.includes("conditions") && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Medical Conditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile.conditions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {profile.conditions.map((cond, i) => (
                                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md font-medium border border-blue-100">
                                            {cond}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No known conditions.</p>
                            )}
                        </CardContent>
                    </Card>
                )}

                {scopes.includes("emergencyContacts") && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Emergency Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile.emergencyContacts.length > 0 ? (
                                <div className="space-y-4">
                                    {profile.emergencyContacts.map((contact, i) => (
                                        <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                            <div>
                                                <p className="font-semibold">{contact.name}</p>
                                                <p className="text-sm text-muted-foreground">{contact.relation}</p>
                                            </div>
                                            <a href={`tel:${contact.phone}`} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                                Call
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No emergency contacts listed.</p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
