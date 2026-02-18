"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function HeroVisual() {
    return (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />

                <SuspendedShield />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

function SuspendedShield() {
    const meshRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.15;
            meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Wireframe Shield Core */}
            <Icosahedron args={[2.8, 1]} ref={meshRef}>
                <meshStandardMaterial
                    color="#06b6d4" // Cyan-500
                    wireframe
                    transparent
                    opacity={0.3}
                    emissive="#0891b2" // Cyan-600
                    emissiveIntensity={0.5}
                />
            </Icosahedron>

            {/* Inner Glowing Core */}
            <Icosahedron args={[2, 0]}>
                <meshBasicMaterial
                    color="#8b5cf6" // Violet-500
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </Icosahedron>

            {/* Floating Particles Ring */}
            <ParticleRing ref={particlesRef} />
        </Float>
    );
}

function ParticleRing({ ...props }) {
    const count = 100;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 4 + Math.random() * 2;
            positions[i * 3] = Math.cos(angle) * radius; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y
            positions[i * 3 + 2] = Math.sin(angle) * radius; // z
        }
        return positions;
    }, [count]);

    return (
        <points {...props}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#e879f9" // Fuchsia-400
                sizeAttenuation={true}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
