"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function DNAHelix() {
    return (
        <div className="h-[500px] w-full md:h-[700px] absolute inset-0 -z-10 bg-slate-950">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
                <color attach="background" args={["#020617"]} />

                <DNAStrand />
                <FloatingParticles />

                <Environment preset="city" />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.0} radius={0.4} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

function DNAStrand() {
    const group = useRef<THREE.Group>(null);
    const count = 30; // Number of base pairs
    const radius = 2;
    const height = 12;

    useFrame((state) => {
        if (group.current) {
            // Constant rotation
            group.current.rotation.y += 0.005;

            // Mouse interaction
            const { x, y } = state.pointer;
            group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, y * 0.2, 0.1);
            group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -x * 0.2, 0.1);
        }
    });

    const points = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = i / count;
            const angle = t * Math.PI * 4; // 2 full turns
            const y = (t - 0.5) * height;

            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;

            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius; // Opposite side

            temp.push({ id: i, x1, y, z1, x2, z2, color: i % 2 === 0 ? "#3b82f6" : "#06b6d4" });
        }
        return temp;
    }, []);

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={group}>
                {points.map((p) => (
                    <group key={p.id}>
                        {/* Strand 1 Node */}
                        <mesh position={[p.x1, p.y, p.z1]}>
                            <sphereGeometry args={[0.15, 12, 12]} />
                            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={2} roughness={0.1} />
                        </mesh>

                        {/* Strand 2 Node */}
                        <mesh position={[p.x2, p.y, p.z2]}>
                            <sphereGeometry args={[0.15, 12, 12]} />
                            <meshStandardMaterial color={p.color === "#3b82f6" ? "#06b6d4" : "#3b82f6"} emissive={p.color === "#3b82f6" ? "#06b6d4" : "#3b82f6"} emissiveIntensity={2} roughness={0.1} />
                        </mesh>

                        {/* Connector Line */}
                        <mesh position={[0, p.y, 0]} rotation={[0, (p.id / count) * Math.PI * 4, 0]}>
                            <cylinderGeometry args={[0.02, 0.02, radius * 2, 8]} />
                            <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
                            <lineSegments>
                                <bufferGeometry />
                                <lineBasicMaterial color="#ffffff" opacity={0.1} transparent />
                            </lineSegments>
                        </mesh>
                    </group>
                ))}
            </group>
        </Float>
    );
}

function FloatingParticles() {
    return (
        <Sparkles
            count={40}
            scale={12}
            size={3}
            speed={0.3}
            opacity={0.4}
            color="#60a5fa"
        />
    );
}
