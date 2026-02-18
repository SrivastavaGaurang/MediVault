
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ReportsList } from "@/components/reports/reports-list";
import { ReportForm } from "@/components/reports/report-form";

export default function ReportsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white mb-2">Medical Reports</h1>
                    <p className="text-slate-400">
                        Centralized repository for your lab results, imaging, and diagnostic documents.
                    </p>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold shadow-lg shadow-violet-500/20 border-0">
                            <Plus className="mr-2 h-4 w-4" /> Add New Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg bg-slate-950 border-slate-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Upload Diagnostic Report</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Enter details from your lab report or scan.
                            </DialogDescription>
                        </DialogHeader>
                        <ReportForm onSuccess={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>

            <ReportsList />
        </div>
    );
}
