
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    Activity,
    Calendar,
    ChevronDown,
    ChevronUp,
    Hospital,
    User
} from "lucide-react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// This should match the schema in validations.ts, tailored for FS data
interface MedicalRecord {
    id: string;
    hospitalName: string;
    doctorName: string;
    doctorSpecialty: string;
    diagnosisTitle: string;
    diagnosisDescription?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    date: any; // Firestore Timestamp
    type: string;
    vitals?: {
        bloodPressure?: string;
        bloodSugar?: string;
        heartRate?: string;
    };
    visitShift?: string;
}

export function RecordsList() {
    const { user } = useAuth();
    const [records, setRecords] = useState<MedicalRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        // Listen to the 'records' subcollection
        // Note: You need to implement the subcollection logic in record-form first
        // For now, let's assume we are reading from 'users/{uid}/records'
        // Since we haven't created the subcollection hook yet, this is a placeholder 
        // that we will wire up properly once we have the form saving data.

        // TEMPORARY: Just showing empty state or loading until form is ready
        setLoading(false);
        setRecords([]); // Dummy usage to satisfy linter

        // Real implementation will go here:
        // const q = query(collection(db, "users", user.uid, "records"), orderBy("date", "desc"));
        // ...

    }, [user]);

    if (loading) {
        return <div className="text-center text-slate-500 py-8">Loading records...</div>;
    }

    if (records.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <div className="bg-slate-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No Medical Records</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                    Add your first consultation, surgery, or check-up to start building your health timeline.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {records.map((record) => (
                <RecordCard key={record.id} record={record} />
            ))}
        </div>
    );
}

function RecordCard({ record }: { record: MedicalRecord }) {
    const [isOpen, setIsOpen] = useState(false);

    // Helper to format date safely
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatDate = (date: any) => {
        if (!date) return "";
        // Handle Firestore Timestamp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = (date as any).toDate ? (date as any).toDate() : new Date(date);
        return format(d, "PPP");
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Surgery": return "text-red-400 border-red-500/20 bg-red-500/10";
            case "Referral": return "text-blue-400 border-blue-500/20 bg-blue-500/10";
            default: return "text-cyan-400 border-cyan-500/20 bg-cyan-500/10";
        }
    };

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden transition-all hover:border-slate-700">
                <div className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge variant="outline" className={getTypeColor(record.type)}>
                                {record.type}
                            </Badge>
                            <span className="text-sm text-slate-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(record.date)}
                            </span>
                        </div>
                        <h4 className="font-semibold text-white text-lg">{record.diagnosisTitle}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <Hospital className="w-4 h-4 text-slate-500" />
                                {record.hospitalName}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4 text-slate-500" />
                                {record.doctorName}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-slate-800 text-slate-400">
                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                <span className="sr-only">Toggle details</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                </div>

                <CollapsibleContent>
                    <div className="px-4 pb-4 pt-0 space-y-4 border-t border-slate-800/50 mt-2">
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Clinical Notes</span>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {record.diagnosisDescription || "No detailed notes provided."}
                                </p>
                            </div>

                            {record.vitals && (
                                <div className="space-y-1">
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vitals Recorded</span>
                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                        {record.vitals.bloodPressure && (
                                            <div className="flex justify-between border-b border-slate-800/50 pb-1">
                                                <span className="text-slate-400">BP</span>
                                                <span className="text-white font-mono">{record.vitals.bloodPressure}</span>
                                            </div>
                                        )}
                                        {record.vitals.heartRate && (
                                            <div className="flex justify-between border-b border-slate-800/50 pb-1">
                                                <span className="text-slate-400">Heart Rate</span>
                                                <span className="text-white font-mono">{record.vitals.heartRate}</span>
                                            </div>
                                        )}
                                        {record.vitals.bloodSugar && (
                                            <div className="flex justify-between border-b border-slate-800/50 pb-1">
                                                <span className="text-slate-400">Sugar</span>
                                                <span className="text-white font-mono">{record.vitals.bloodSugar}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}
