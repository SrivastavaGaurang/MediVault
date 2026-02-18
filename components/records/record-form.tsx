
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-provider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { medicalRecordSchema } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type MedicalRecordValues = z.infer<typeof medicalRecordSchema>;

const defaultValues: Partial<MedicalRecordValues> = {
    // defaults
    doctorDesignation: "Senior Consultant",
    doctorSpecialty: "General",
    visitShift: "Day",
    severity: "Low",
    type: "Visit",
};

export function RecordForm({ onSuccess }: { onSuccess?: () => void }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const form = useForm<MedicalRecordValues>({
        resolver: zodResolver(medicalRecordSchema),
        defaultValues,
    });

    const onSubmit = async (data: MedicalRecordValues) => {
        if (!user) return;
        setLoading(true);

        try {
            // Save to subcollection 'records'
            await addDoc(collection(db, "users", user.uid, "records"), {
                ...data,
                // Ensure plain objects for Firestore
                vitals: {
                    bloodPressure: data.vitals?.bloodPressure || null,
                    bloodSugar: data.vitals?.bloodSugar || null,
                    heartRate: data.vitals?.heartRate || null,
                    temperature: data.vitals?.temperature || null,
                    spO2: data.vitals?.spO2 || null,
                },
                createdAt: new Date(),
            });

            setSuccess(true);
            form.reset();
            if (onSuccess) onSuccess();
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error saving record:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* SECTION 1: Hospital & Doctor */}
                <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/20 p-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center text-xs">1</span>
                        Facility & Staff
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="hospitalName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Hospital Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. City General Hospital" className={inputClass} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Visit Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className={inputClass}>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {["Visit", "Surgery", "Referral", "Follow-up"].map((t) => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="doctorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Doctor Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dr. Smith" className={inputClass} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="doctorDesignation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Designation</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className={inputClass}>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {["Senior Consultant", "Surgeon", "Resident", "Junior Dr", "Nurse", "Other"].map((r) => (
                                                <SelectItem key={r} value={r}>{r}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* SECTION 2: Clinical Details */}
                <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/20 p-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-500 flex items-center justify-center text-xs">2</span>
                        Clinical Details
                    </h3>

                    <FormField
                        control={form.control}
                        name="diagnosisTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300">Diagnosis / Main Complaint</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Acute Viral Fever" className={inputClass} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="diagnosisDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300">Detailed Notes</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter detailed symptoms, history, and doctor's observations..."
                                        className={cn(inputClass, "min-h-[100px]")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Section 3: Vitals */}
                <div className="space-y-4 rounded-lg border border-slate-800 bg-slate-900/20 p-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center text-xs">3</span>
                        Vitals (Optional)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="vitals.bloodPressure"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-400 text-xs uppercase">BP (mmHg)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="120/80" className={inputClass} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="vitals.heartRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-400 text-xs uppercase">Heart Rate (bpm)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="72" className={inputClass} {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Date Picker */}
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="text-slate-300">Date of Visit</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal bg-slate-950/50 border-slate-800 text-white hover:bg-slate-900 hover:text-white",
                                                !field.value && "text-slate-500"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => field.onChange(date)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold h-12">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {loading ? "Saving Record..." : "Check In / Save Record"}
                </Button>

                {success && (
                    <div className="flex items-center justify-center gap-2 text-green-400 font-medium animate-in fade-in">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Record saved successfully!</span>
                    </div>
                )}
            </form>
        </Form>
    );
}
