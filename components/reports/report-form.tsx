
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Loader2, CheckCircle2, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/auth-provider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { medicalReportSchema } from "@/lib/validations";

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

// Mock upload function until we have real storage
// This simulates an upload and returns a dummy URL
const mockUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(URL.createObjectURL(file));
        }, 1500);
    });
};

type MedicalReportValues = z.infer<typeof medicalReportSchema>;

const defaultValues: Partial<MedicalReportValues> = {
    reportType: "Blood Test",
    collectionTime: "09:00",
    attachments: [],
};

export function ReportForm({ onSuccess }: { onSuccess?: () => void }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewFile, setPreviewFile] = useState<File | null>(null);

    const form = useForm<MedicalReportValues>({
        resolver: zodResolver(medicalReportSchema),
        defaultValues,
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPreviewFile(file);
            setUploading(true);
            try {
                // In a real app, upload to Firebase Storage here
                const url = await mockUpload(file);
                form.setValue("attachments", [url]);
            } catch (err) {
                console.error("Upload failed", err);
            } finally {
                setUploading(false);
            }
        }
    };

    const onSubmit = async (data: MedicalReportValues) => {
        if (!user) return;
        setLoading(true);

        try {
            await addDoc(collection(db, "users", user.uid, "reports"), {
                ...data,
                createdAt: new Date(),
            });

            setSuccess(true);
            form.reset();
            setPreviewFile(null);
            if (onSuccess) onSuccess();
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Error saving report:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-cyan-500/20";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="reportType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300">Report Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className={inputClass}>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {["Blood Test", "X-Ray", "MRI", "CT Scan", "Urine", "Biopsy", "Ultrasound", "Other"].map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="testName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300">Test Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Lipid Profile" className={inputClass} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Date Picker */}
                    <FormField
                        control={form.control}
                        name="collectionDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-slate-300">Collection Date</FormLabel>
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
                                            onSelect={field.onChange}
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

                    <FormField
                        control={form.control}
                        name="collectionTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-300">Time (Approx)</FormLabel>
                                <FormControl>
                                    <Input type="time" className={inputClass} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="facilityName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-300">Lab / Hospital Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. City Path Labs" className={inputClass} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-300">Short Summary / Conclusion (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="e.g. Cholesterol levels are slightly high."
                                    className={cn(inputClass, "min-h-[80px]")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* File Upload */}
                <div className="space-y-3">
                    <FormLabel className="text-slate-300">Report File (PDF/Image)</FormLabel>
                    <div className={cn(
                        "border-2 border-dashed border-slate-800 rounded-xl p-6 text-center transition-all hover:bg-slate-900/50 hover:border-cyan-500/30",
                        previewFile ? "bg-cyan-500/5 border-cyan-500/30" : "bg-slate-950/30"
                    )}>
                        {!previewFile ? (
                            <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                                <div className="p-3 bg-slate-900 rounded-full">
                                    <Upload className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-sm text-slate-400 font-medium">Click to upload report</span>
                                <span className="text-xs text-slate-500">PDF, JPG, PNG (Max 5MB)</span>
                                <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                            </label>
                        ) : (
                            <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                                <span className="text-sm text-white truncate max-w-[200px]">{previewFile.name}</span>
                                {uploading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                                ) : (
                                    <Button type="button" variant="ghost" size="sm" onClick={() => {
                                        setPreviewFile(null);
                                        form.setValue("attachments", []);
                                    }}>
                                        <X className="w-4 h-4 text-red-400" />
                                    </Button>
                                )}
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="attachments"
                            render={() => <FormMessage />}
                        />
                    </div>
                </div>

                <Button type="submit" disabled={loading || uploading} className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold h-12">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {loading ? "Uploading Report..." : "Save Report"}
                </Button>

                {success && (
                    <div className="flex items-center justify-center gap-2 text-green-400 font-medium animate-in fade-in">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Report added successfully!</span>
                    </div>
                )}
            </form>
        </Form>
    );
}
