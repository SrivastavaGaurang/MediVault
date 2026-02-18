"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/auth/auth-provider";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox"; 
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// For MVP, using native select/checkbox to save time on Shadcn components manual creation
// if they are not installed. But since npm installed, I could use them.
// I'll use standard HTML elements styled with Tailwind for speed and reliability.



export function QRGenerator() {
    const { user } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [qrUrl, setQrUrl] = useState("");

    const generateToken = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const scopes = [];
        if (formData.get("scope_allergies")) scopes.push("allergies");
        if (formData.get("scope_medications")) scopes.push("medications");
        if (formData.get("scope_conditions")) scopes.push("conditions");
        if (formData.get("scope_emergency")) scopes.push("emergencyContacts");

        const expiresIn = formData.get("expiresIn") as string;

        // Calculate expiration logic
        const now = new Date();
        let expiresAt = new Date(now.getTime() + 15 * 60000); // default 15m
        if (expiresIn === "1h") expiresAt = new Date(now.getTime() + 60 * 60000);
        if (expiresIn === "24h") expiresAt = new Date(now.getTime() + 24 * 60 * 60000);

        try {
            const docRef = await addDoc(collection(db, "shareTokens"), {
                userId: user.uid,
                createdAt: serverTimestamp(),
                expiresAt: expiresAt,
                scopes: scopes,
                active: true
            });

            const shareUrl = `${window.location.origin}/scan/${docRef.id}`;
            setToken(docRef.id);
            setQrUrl(shareUrl);
        } catch (error) {
            console.error("Error generating token:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Generate Access Code</CardTitle>
                    <CardDescription>Create a temporary QR code for your doctor.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!token ? (
                        <form onSubmit={generateToken} className="space-y-6">
                            <div className="space-y-3">
                                <Label>What data to share?</Label>
                                <div className="grid gap-2">
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="scope_allergies" name="scope_allergies" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="scope_allergies">Allergies</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="scope_medications" name="scope_medications" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="scope_medications">Medications</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="scope_conditions" name="scope_conditions" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="scope_conditions">Medical Conditions</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="scope_emergency" name="scope_emergency" defaultChecked className="h-4 w-4 rounded border-gray-300" />
                                        <Label htmlFor="scope_emergency">Emergency Contacts</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="expiresIn">Expires In</Label>
                                <select
                                    name="expiresIn"
                                    id="expiresIn"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="15m">15 Minutes</option>
                                    <option value="1h">1 Hour</option>
                                    <option value="24h">24 Hours</option>
                                </select>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Generating..." : "Generate QR Code"}
                            </Button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="p-4 bg-white rounded-lg shadow-sm border">
                                <QRCodeSVG value={qrUrl} size={256} />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="font-medium text-lg">Scan to Access</p>
                                <p className="text-sm text-muted-foreground">This code expires in specific time.</p>
                                <a href={qrUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline block mt-2">
                                    {qrUrl}
                                </a>
                            </div>
                            <Button onClick={() => setToken(null)} variant="outline">
                                Generate New Code
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
