"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, Suspense } from "react";
import { usePathname } from "next/navigation";

function ParticleField() {
    const ref = useRef<THREE.Points>(null);
    const count = 1000; // Reduced count for performance

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            // Bring them much closer to the camera (Camera is at +10)
            // Z range: -5 to +5 means some are IN FRONT of 0, closer to camera
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (ref.current) {
            // Add wave motion
            ref.current.rotation.x -= delta * 0.05;
            ref.current.rotation.y -= delta * 0.08;

            // Optional: slight pulse
            const pulse = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
            ref.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00ffff" // Bright Cyan
                    size={0.15} // Very large points
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={1.0} // Full opacity
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export function BackgroundVisual() {
    const pathname = usePathname();
    // Hide on specific pages to improve performance or aesthetics
    // Also hide on Auth pages since they have their own visual (AuthVisual)
    const isHidden =
        pathname === "/share" ||
        pathname === "/profile" ||
        pathname === "/login" ||
        pathname === "/signup";

    return (
        <div
            className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isHidden ? 'opacity-0' : 'opacity-100'}`}
            aria-hidden={isHidden}
        >
            <Canvas
                frameloop={isHidden ? "never" : "always"}
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 1.5]}
                className="w-full h-full pointer-events-none"
            >
                <Suspense fallback={null}>
                    <ParticleField />
                </Suspense>
            </Canvas>
            {/* Gradient Overlay for Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none" />
        </div>
    );
}
