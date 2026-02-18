import { MedicalProfileForm } from "@/components/profile/medical-form";
import { BackButton } from "@/components/ui/back-button";

export default function ProfilePage() {
    return (
        <div className="max-w-2xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <BackButton />
            <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                    Medical Profile
                </h1>
                <p className="text-slate-400">
                    Manage your critical health information securely.
                </p>
            </div>
            <MedicalProfileForm />
        </div>
    );
}
