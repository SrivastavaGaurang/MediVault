"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/auth/auth-provider";
import { medicalProfileSchema } from "@/lib/validations";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RecordForm } from "@/components/records/record-form";
import { RecordsList } from "@/components/records/records-list";

type MedicalProfileData = z.infer<typeof medicalProfileSchema>;

export function MedicalProfileForm() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<MedicalProfileData>({
        resolver: zodResolver(medicalProfileSchema),
    });

    useEffect(() => {
        async function loadProfile() {
            if (!user) return;
            const snap = await getDoc(doc(db, "users", user.uid));
            if (snap.exists()) {
                const data = snap.data().profile;
                if (data) {
                    setValue("bloodType", data.bloodType);
                    setValue("allergies", data.allergies.join(", "));
                    setValue("medications", data.medications.join(", "));
                    setValue("conditions", data.conditions.join(", "));
                    setValue("height", data.height);
                    setValue("weight", data.weight);

                    if (data.emergencyContacts && data.emergencyContacts[0]) {
                        setValue("emergencyContactName", data.emergencyContacts[0].name);
                        setValue("emergencyContactRelation", data.emergencyContacts[0].relation);
                        setValue("emergencyContactPhone", data.emergencyContacts[0].phone);
                    }
                }
            }
        }
        loadProfile();
    }, [user, setValue]);

    const onSubmit = async (data: MedicalProfileData) => {
        if (!user) return;
        setLoading(true);
        setSuccess(false);

        try {
            const profileUpdate = {
                bloodType: data.bloodType,
                allergies: data.allergies ? data.allergies.split(",").map(s => s.trim()).filter(Boolean) : [],
                medications: data.medications ? data.medications.split(",").map(s => s.trim()).filter(Boolean) : [],
                conditions: data.conditions ? data.conditions.split(",").map(s => s.trim()).filter(Boolean) : [],
                height: data.height,
                weight: data.weight,
                emergencyContacts: [{
                    name: data.emergencyContactName,
                    relation: data.emergencyContactRelation,
                    phone: data.emergencyContactPhone
                }]
            };

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || user.email?.split("@")[0] || "User",
                profile: profileUpdate,
                updatedAt: new Date()
            }, { merge: true });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const cardClass = "border-slate-800 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/20";
    const inputClass = "bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all";
    const labelClass = "text-slate-300";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card className={cardClass}>
                <CardHeader>
                    <CardTitle className="text-white">Basic Information</CardTitle>
                    <CardDescription className="text-slate-400">Your essential physical details.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="bloodType" className={labelClass}>Blood Type</Label>
                        <Input id="bloodType" placeholder="e.g. O+" className={inputClass} {...register("bloodType")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height" className={labelClass}>Height</Label>
                        <Input id="height" placeholder="e.g. 5'10" className={inputClass} {...register("height")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight" className={labelClass}>Weight</Label>
                        <Input id="weight" placeholder="e.g. 170lbs" className={inputClass} {...register("weight")} />
                    </div>
                </CardContent>
            </Card>

            <Card className={cardClass}>
                <CardHeader>
                    <CardTitle className="text-white">Medical History</CardTitle>
                    <CardDescription className="text-slate-400">Separate items with commas.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="allergies" className={labelClass}>Allergies</Label>
                        <Input id="allergies" placeholder="Peanuts, Penicillin..." className={inputClass} {...register("allergies")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="conditions" className={labelClass}>Medical Conditions</Label>
                        <Input id="conditions" placeholder="Diabetes, Asthma..." className={inputClass} {...register("conditions")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="medications" className={labelClass}>Current Medications</Label>
                        <Input id="medications" placeholder="Lisinopril 10mg..." className={inputClass} {...register("medications")} />
                    </div>
                </CardContent>
            </Card>

            {/* Medical Records Timeline */}
            <div className="pt-8 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">Clinical History</h3>
                        <p className="text-sm text-slate-400">Timeline of visits, surgeries, and consultations.</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-cyan-400">
                                <Plus className="mr-2 h-4 w-4" /> Add Record
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl bg-slate-950 border-slate-800 text-white max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Add Clinical Record</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Log details of a doctor visit, surgery, or referral.
                                </DialogDescription>
                            </DialogHeader>
                            <RecordForm />
                        </DialogContent>
                    </Dialog>
                </div>
                <RecordsList />
            </div>

            <Card className={cardClass}>
                <CardHeader>
                    <CardTitle className="text-white">Emergency Contact</CardTitle>
                    <CardDescription className="text-slate-400">Who to call in case of emergency.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="ecName" className={labelClass}>Name</Label>
                            <Input id="ecName" className={inputClass} {...register("emergencyContactName")} />
                            {errors.emergencyContactName && <p className="text-sm text-red-400">{errors.emergencyContactName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ecRelation" className={labelClass}>Relation</Label>
                            <Input id="ecRelation" placeholder="Partner, Parent..." className={inputClass} {...register("emergencyContactRelation")} />
                            {errors.emergencyContactRelation && <p className="text-sm text-red-400">{errors.emergencyContactRelation.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ecPhone" className={labelClass}>Phone Number</Label>
                        <Input id="ecPhone" className={inputClass} {...register("emergencyContactPhone")} />
                        {errors.emergencyContactPhone && <p className="text-sm text-red-400">{errors.emergencyContactPhone.message}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center gap-4">
                <Button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 border-0 min-w-[140px]">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
                {success && (
                    <div className="flex items-center gap-2 text-green-400 font-medium animate-in fade-in slide-in-from-left-5">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Profile updated!</span>
                    </div>
                )}
            </div>
        </form>
    );
}
