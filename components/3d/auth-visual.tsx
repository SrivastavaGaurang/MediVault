"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export function AuthVisual() {
    return (
        <div className="absolute inset-0 z-0 bg-slate-950">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <color attach="background" args={["#020617"]} />
                <ambientLight intensity={0.5} />
                <DigitalSynapse />
            </Canvas>
        </div>
    );
}

function DigitalSynapse() {
    const ref = useRef<THREE.Points>(null);
    const count = 200;

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 7;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime();
            ref.current.rotation.x = time * 0.05;
            ref.current.rotation.y = time * 0.07;

            // Subtle breathing effect
            const scale = 1 + Math.sin(time * 0.5) * 0.1;
            ref.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#22d3ee" // Cyan-400
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
            <Connections positions={positions} />
        </Float>
    );
}

function Connections({ positions }: { positions: Float32Array }) {
    const linesGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const linePositions = [];
        const count = positions.length / 3;

        // Create random connections between nearby points (simplified)
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dist = Math.sqrt(
                    Math.pow(positions[i * 3] - positions[j * 3], 2) +
                    Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
                    Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
                );

                if (dist < 2.5) { // Connection threshold
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        return geometry;
    }, [positions]);

    return (
        <lineSegments geometry={linesGeometry}>
            <lineBasicMaterial color="#a78bfa" opacity={0.15} transparent blending={THREE.AdditiveBlending} />
        </lineSegments>
    );
}
