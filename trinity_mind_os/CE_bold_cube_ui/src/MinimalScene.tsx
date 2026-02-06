import React from 'react';
import { Canvas } from '@react-three/fiber';

const MinimalScene = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="gold" />
                </mesh>
            </Canvas>
        </div>
    );
};

export default MinimalScene;
