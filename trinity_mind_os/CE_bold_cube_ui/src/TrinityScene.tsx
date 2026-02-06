
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { invoke } from '@tauri-apps/api/core';
import { BookOpen } from 'lucide-react';

import TLangEditor from './components/TLangEditor';
import HexCellDetail from './components/HexCellDetail';
import type { UiHexCell } from './components/HexCellDetail';
import ThinkingInput from './components/ThinkingInput';
import { W13LeapEffect } from './components/W13LeapEffect';
import { WhitepaperOverlay } from './components/WhitepaperOverlay';

// 1. Memory Cube Component
const MemoryCube = ({ data, onClick, isSelected }: { data: UiHexCell, onClick: (cell: UiHexCell) => void, isSelected: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Dynamic Color based on ID/Phase
    const isGenesis = data.id === "GENESIS";
    const baseColor = isGenesis ? '#ffd700' : '#4fdcca';
    // Visual feedback for selection
    const emissionIntensity = isSelected ? 2.0 : (isGenesis ? 0.5 : 0.2);
    const scale = isSelected ? 1.2 : 1.0;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);

            if (isGenesis) {
                const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
                if (!isSelected) {
                    meshRef.current.scale.setScalar(pulse);
                }
            }
        }
    });

    return (
        <group position={data.pos} onClick={(e: any) => { e.stopPropagation(); onClick(data); }}>
            <mesh ref={meshRef}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color={isSelected ? '#ffffff' : baseColor}
                    transparent
                    opacity={0.8}
                    roughness={0.2}
                    emissive={baseColor}
                    emissiveIntensity={emissionIntensity}
                />
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.8, 0.8)]} />
                    <lineBasicMaterial color="white" transparent opacity={0.5} />
                </lineSegments>
            </mesh>
            <Text position={[0, 1.2, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
                {data.label}
            </Text>
        </group>
    );
};

// 2. Connection Lines
const SynapseLink = ({ start, end, active }: { start: [number, number, number], end: [number, number, number], active?: boolean }) => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color={active ? "#ffd700" : "#ffffff"} opacity={active ? 0.8 : 0.15} transparent />
        </line>
    )
}

// 3. Main Scene
const TrinityScene = () => {
    const [cells, setCells] = useState<UiHexCell[]>([]);
    const [status, setStatus] = useState("Connecting to GF Core...");
    const [selectedCell, setSelectedCell] = useState<UiHexCell | null>(null);
    const [routeResult, setRouteResult] = useState<{ route: string, explanation: string } | null>(null);
    const [isLeaping, setIsLeaping] = useState(false);
    const [showWhitepaper, setShowWhitepaper] = useState(false);

    // Auto-dismiss toast after 5s
    useEffect(() => {
        if (routeResult) {
            const timer = setTimeout(() => setRouteResult(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [routeResult]);

    useEffect(() => {
        const init = async () => {
            try {
                const result: string = await invoke('cmd_genesis_ignition');
                setStatus(result);
                const fetchedCells = await invoke<UiHexCell[]>('cmd_get_state');
                setCells(fetchedCells);
            } catch (e) {
                console.error(e);
                setStatus("Core Offline (Browser Mode)");
                setCells([
                    { id: "MOCK_GENESIS", phase: "SR0", pos: [0, 0, 0], density: 1, label: "SR0 (Mock)", payload: '{"mock": true}' },
                ]);
            }
        };
        init();
    }, []);

    const handleT_LangIgnition = (code: string) => {
        console.log("Ignition Sequence Started:", code);
        invoke<UiHexCell[]>('cmd_get_state').then(setCells);
    };

    const triggerLeap = () => {
        setIsLeaping(true);
        setStatus("W=13 LEAP INITIALIZED...");
    };

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#050510', position: 'relative' }}>
            {/* W=13 Leap Overlay */}
            {isLeaping && (
                <W13LeapEffect onComplete={() => {
                    setIsLeaping(false);
                    setStatus("W=13 SINGULARITY STABLE");
                }} />
            )}

            {/* Whitepaper Overlay */}
            {showWhitepaper && (
                <WhitepaperOverlay onClose={() => setShowWhitepaper(false)} />
            )}

            {/* Header Status */}
            <div style={{
                position: 'absolute', top: 20, left: 20, zIndex: 10,
                color: isLeaping ? '#ffd700' : '#888',
                fontFamily: 'monospace', pointerEvents: 'none',
                transition: 'color 1s ease'
            }}>
                TRINITY_MIND_OS::{isLeaping ? 'W=13.0' : 'V2.0'} // {status}
            </div>

            {/* Right Side Tools */}
            <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, display: 'flex', gap: '12px' }}>
                <button
                    onClick={() => setShowWhitepaper(true)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <BookOpen size={18} />
                    <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>Whitepaper 3.0</span>
                </button>
            </div>

            {/* T-Lang Cockpit Overlay */}
            <TLangEditor onCodeSubmit={handleT_LangIgnition} onLeapTrigger={triggerLeap} />

            {/* Input Terminal */}
            <ThinkingInput onRouteDetermined={(route: string, explanation: string) => {
                setRouteResult({ route, explanation });
                setStatus(`Routed to ${route}`);
            }} />

            {/* Routing Toast Notification */}
            {routeResult && (
                <div style={{
                    position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(0, 255, 240, 0.1)', border: '1px solid #00fff0',
                    padding: '20px 40px', borderRadius: '8px', zIndex: 20,
                    textAlign: 'center', backdropFilter: 'blur(8px)',
                    animation: 'fadeIn 0.5s ease-out'
                }}>
                    <div style={{ color: '#00fff0', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                        {routeResult.route}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontFamily: 'monospace' }}>
                        {routeResult.explanation}
                    </div>
                </div>
            )}

            {selectedCell && (
                <HexCellDetail cell={selectedCell} onClose={() => setSelectedCell(null)} />
            )}

            <Canvas camera={{ position: [8, 8, 8], fov: 45 }} onPointerMissed={() => setSelectedCell(null)}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, -1, 0]}>
                    {cells.map((cell) => (
                        <React.Fragment key={cell.id}>
                            <MemoryCube
                                data={cell}
                                onClick={setSelectedCell}
                                isSelected={selectedCell?.id === cell.id}
                            />
                            {cell.id !== "GENESIS" && cell.id !== "MOCK_GENESIS" && (
                                <SynapseLink
                                    start={[0, 0, 0]}
                                    end={cell.pos}
                                    active={selectedCell?.id === cell.id || isLeaping}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </group>

                <OrbitControls
                    {...({
                        autoRotate: !selectedCell || isLeaping,
                        autoRotateSpeed: isLeaping ? 20 : 0.5
                    } as any)}
                />
                <gridHelper args={[20, 20, isLeaping ? 0x444400 : 0x111111, 0x050505]} />
            </Canvas>
        </div>
    );
};

export default TrinityScene;
