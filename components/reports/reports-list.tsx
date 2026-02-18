
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    FileText,
    Eye,
    Clock,
    Calendar,
    Beaker
} from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/auth/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface MedicalReport {
    id: string;
    reportType: string;
    testName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collectionDate: any; // Firestore Timestamp
    collectionTime?: string;
    facilityName: string;
    referredBy?: string;
    attachments: string[];
    summary?: string;
}

export function ReportsList() {
    const { user } = useAuth();
    const [reports, setReports] = useState<MedicalReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const q = query(
            collection(db, "users", user.uid, "reports"),
            orderBy("collectionDate", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as MedicalReport[];
            setReports(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching reports:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return <div className="text-center text-slate-500 py-8">Loading reports...</div>;
    }

    if (reports.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                <div className="bg-slate-800/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No Reports Found</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                    Upload your first lab report or scan to keep them organized and accessible.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
                <ReportCard key={report.id} report={report} />
            ))}
        </div>
    );
}

function ReportCard({ report }: { report: MedicalReport }) {
    // Helper to format date safely
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatDate = (date: any) => {
        if (!date) return "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = (date as any).toDate ? (date as any).toDate() : new Date(date);
        return format(d, "PPP");
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Blood Test": return "text-red-400 border-red-500/20 bg-red-500/10";
            case "X-Ray":
            case "CT Scan":
            case "MRI": return "text-blue-400 border-blue-500/20 bg-blue-500/10";
            default: return "text-violet-400 border-violet-500/20 bg-violet-500/10";
        }
    };

    return (
        <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-sm overflow-hidden transition-all hover:border-slate-700 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={getTypeColor(report.reportType)}>
                        {report.reportType}
                    </Badge>
                    {report.collectionTime && (
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {report.collectionTime}
                        </span>
                    )}
                </div>
                <CardTitle className="text-white text-lg leading-tight truncate" title={report.testName}>
                    {report.testName}
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(report.collectionDate)}
                </div>
            </CardHeader>
            <CardContent className="pb-3 text-sm space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                    <Beaker className="w-4 h-4 text-slate-500" />
                    <span className="truncate">{report.facilityName}</span>
                </div>
                {report.summary && (
                    <div className="bg-slate-950/50 p-2 rounded text-xs text-slate-400 italic line-clamp-2">
                        &quot;{report.summary}&quot;
                    </div>
                )}
            </CardContent>
            <CardFooter className="pt-0 flex gap-2">
                {report.attachments && report.attachments.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-slate-700 hover:bg-slate-800 hover:text-white"
                        onClick={() => window.open(report.attachments[0], '_blank')}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View Report
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
