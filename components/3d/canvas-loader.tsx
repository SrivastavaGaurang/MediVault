"use client";

import { Html, useProgress } from "@react-three/drei";

export function CanvasLoader() {
    const { progress } = useProgress();
    return (
        <Html as="div" center className="flex flex-col items-center justify-center">
            <span className="jumping-dots flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>
            </span>
            <p className="mt-2 text-xs font-medium text-slate-500">{progress.toFixed(0)}%</p>
        </Html>
    );
}
