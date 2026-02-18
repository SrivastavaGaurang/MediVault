"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldAlert, History as HistoryIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BackButton } from "@/components/ui/back-button";

interface AccessLog {
    id: string;
    accessor: string;
    role: "Doctor" | "Emergency" | "Pharmacy" | "System";
    action: "Viewed Record" | "Updated Medication" | "Scanned QR";
    timestamp: string;
    location: string;
    status: "Authorized" | "Flagged";
}

const MOCK_LOGS: AccessLog[] = [
    {
        id: "1",
        accessor: "Dr. Sarah Smith",
        role: "Doctor",
        action: "Viewed Record",
        timestamp: "2024-03-15 14:30",
        location: "City General Hospital",
        status: "Authorized",
    },
    {
        id: "2",
        accessor: "Emergency Response",
        role: "Emergency",
        action: "Scanned QR",
        timestamp: "2024-03-10 09:15",
        location: "Ambulance Unit 42",
        status: "Authorized",
    },
    {
        id: "3",
        accessor: "CVS Pharmacy",
        role: "Pharmacy",
        action: "Updated Medication",
        timestamp: "2024-03-01 11:45",
        location: "Downtown Branch",
        status: "Authorized",
    },
    {
        id: "4",
        accessor: "Unknown Device",
        role: "System",
        action: "Scanned QR",
        timestamp: "2024-02-28 03:22",
        location: "Unknown Location",
        status: "Flagged",
    },
];

export default function HistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLogs = MOCK_LOGS.filter((log) =>
        log.accessor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto py-8 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <BackButton />

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Access Logs</h1>
                <p className="text-slate-400">
                    Monitor who has accessed your medical vault and when.
                </p>
            </div>

            <Card className="border-slate-800 bg-slate-900/40 backdrop-blur-xl">
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                            <CardDescription className="text-slate-400">
                                Your data access history for the past 30 days.
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                    type="search"
                                    placeholder="Search logs..."
                                    className="pl-8 w-full md:w-[250px] bg-slate-950/50 border-slate-800 text-white focus:border-cyan-500/50 focus:ring-cyan-500/20"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-900">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredLogs.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                No logs found matching your search.
                            </div>
                        ) : (
                            filteredLogs.map((log) => (
                                <div
                                    key={log.id}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-800/50 rounded-lg hover:bg-slate-800/30 transition-colors bg-slate-950/30"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-full ${log.status === 'Flagged' ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                            {log.status === 'Flagged' ? <ShieldAlert className="h-5 w-5" /> : <HistoryIcon className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-slate-200">{log.accessor}</p>
                                                <Badge variant={log.role === 'Emergency' ? 'destructive' : 'outline'} className="border-slate-700 text-slate-400">
                                                    {log.role}
                                                </Badge>
                                                {log.status === 'Flagged' && (
                                                    <Badge variant="destructive" className="animate-pulse bg-red-500/80 text-white">Suspicious</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500">
                                                {log.action} • {log.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-right">
                                        <p className="text-sm font-medium text-slate-300">{log.timestamp.split(' ')[0]}</p>
                                        <p className="text-xs text-slate-500">{log.timestamp.split(' ')[1]}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center">
                <Button variant="ghost" className="text-slate-500 hover:text-cyan-400 hover:bg-transparent">
                    View Older Logs
                </Button>
            </div>
        </div>
    );
}
