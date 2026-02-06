
import React from 'react';

export interface UiHexCell {
    id: string;
    phase: string;
    pos: [number, number, number];
    density: number;
    label: string;
    payload?: string;
}

interface HexCellDetailProps {
    cell: UiHexCell | null;
    onClose: () => void;
}

const HexCellDetail: React.FC<HexCellDetailProps> = ({ cell, onClose }) => {
    if (!cell) return null;

    let parsedPayload = {};
    try {
        parsedPayload = cell.payload ? JSON.parse(cell.payload) : {};
    } catch (e) {
        parsedPayload = { raw: cell.payload };
    }

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '300px',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: 'rgba(20, 20, 35, 0.7)', // Deep space glass
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 215, 0, 0.2)', // Faint gold border
            color: '#e0e0e0',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            zIndex: 100,
            fontFamily: "'Inter', sans-serif",
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#ffd700', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
                    {cell.label}
                </h2>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#888',
                        cursor: 'pointer',
                        fontSize: '1.2rem'
                    }}
                >
                    ×
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>PHASE IDENTITY</div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{cell.phase}</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>RESONANCE DENSITY</div>
                <div style={{
                    height: '6px',
                    background: '#333',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${cell.density * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #4fdcca, #ffd700)'
                    }} />
                </div>
            </div>

            <div>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>PAYLOAD DATA</div>
                <pre style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '10px',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    fontSize: '0.75rem',
                    color: '#a0a0a0',
                    margin: 0
                }}>
                    {JSON.stringify(parsedPayload, null, 2)}
                </pre>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default HexCellDetail;
