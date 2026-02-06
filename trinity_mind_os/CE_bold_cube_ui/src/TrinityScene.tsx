
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { invoke } from '@tauri-apps/api/core';

// 1. Data Type for Frontend
interface UiHexCell {
    id: string;
    phase: string;
    pos: [number, number, number];
    density: number;
    label: string;
}

// 2. Memory Cube Component
const MemoryCube = ({ data }: { data: UiHexCell }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Dynamic Color based on ID/Phase
    const isGenesis = data.id === "GENESIS";
    const baseColor = isGenesis ? '#ffd700' : '#4fdcca'; // Gold for Genesis, Cyan for others

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            // Pulse effect for Genesis
            if (isGenesis) {
                meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
            }
        }
    });

    return (
        <group position={data.pos}>
            <mesh ref={meshRef}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color={baseColor}
                    transparent
                    opacity={0.6}
                    roughness={0.2}
                    emissive={baseColor}
                    emissiveIntensity={isGenesis ? 0.5 : 0.2}
                />
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.8, 0.8)]} />
                    <lineBasicMaterial color="white" transparent opacity={0.3} />
                </lineSegments>
            </mesh>
            <Text
                position={[0, 1.2, 0]}
                fontSize={0.4}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {data.label}
            </Text>
        </group>
    );
};

// 3. Connection Lines
const SynapseLink = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color="#ffffff" opacity={0.15} transparent />
        </line>
    )
}

// 4. Main Scene
const TrinityScene = () => {
    const [cells, setCells] = useState<UiHexCell[]>([]);
    const [status, setStatus] = useState("Connecting to GF Core...");

    useEffect(() => {
        // Initial Fetch
        const init = async () => {
            try {
                // Ignite Genesis in Backend
                const msg = await invoke('perform_genesis_ignition');
                setStatus(msg as string);

                // Fetch updated state
                const fetchedCells = await invoke<UiHexCell[]>('get_memory_state');
                setCells(fetchedCells);
            } catch (e) {
                console.error(e);
                setStatus("Core Offline (Browser Mode)");
                // Fallback for browser only check
                setCells([
                    { id: "MOCK_GENESIS", phase: "SR0", pos: [0, 0, 0], density: 1, label: "SR0 (Mock)" },
                    { id: "MOCK_CE", phase: "active", pos: [-2, 2, 0], density: 0.8, label: "CE (Mock)" }
                ]);
            }
        };
        init();
    }, []);

    return (
        <>
            <div style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10, color: '#888', fontSize: '12px' }}>
                GF Core Status: {status}
            </div>
            <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {cells.map((cell) => (
                    <React.Fragment key={cell.id}>
                        <MemoryCube data={cell} />
                        {/* Connect all to Genesis for star topology visualization */}
                        {cell.id !== "GENESIS" && cells.find(c => c.id === "GENESIS") && (
                            <SynapseLink start={cell.pos} end={cells.find(c => c.id === "GENESIS")!.pos} />
                        )}
                        {cell.id !== "MOCK_GENESIS" && cells.find(c => c.id === "MOCK_GENESIS") && (
                            <SynapseLink start={cell.pos} end={cells.find(c => c.id === "MOCK_GENESIS")!.pos} />
                        )}
                    </React.Fragment>
                ))}

                <OrbitControls autoRotate autoRotateSpeed={0.5} />
                <gridHelper args={[20, 20, 0x111111, 0x050505]} />
            </Canvas>
        </>
    );
};

export default TrinityScene;
