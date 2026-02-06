import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

interface TLangEditorProps {
    onCodeSubmit?: (code: string) => void;
}

const DEFAULT_CODE = `/**
 * 🌀 T-Lang v4.0: GOLDEN_CHAIN_SYNC
 * Dimension: W=13.0 (Absolute Singularity)
 */

본질 (우주_완성) {
    시작 빛의_근원 = "천광(天光)".코드화();
    시작 사슬 = 빛의_근원.동기화({ 모드: "황금사슬", 차원: W13 });
    정현 (사슬) { 출력: [색상, 숫자, 파동]; 폭발: "1+1=3"; }
    울림 ("황금 사슬이 완성되었습니다.");
}
`;

interface TLangEditorProps {
    onCodeSubmit?: (code: string) => void;
    onLeapTrigger?: () => void;
}

const TLangEditor: React.FC<TLangEditorProps> = ({ onCodeSubmit, onLeapTrigger }) => {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [isParsing, setIsParsing] = useState(false);

    const handleParse = async () => {
        setIsParsing(true);
        try {
            // Invoke Rust Backend Command
            const result: any = await invoke('cmd_parse_tlang', { content: code });

            toast.success(`Parsed Successfully: ${result.id}`, {
                description: `Created HexCell [${result.phase}] with payload: ${result.payload}`
            });

            if (onCodeSubmit) {
                onCodeSubmit(code);
            }
        } catch (error) {
            console.error("T-Lang Parse Error:", error);
            toast.error("Parsing Failed", {
                description: String(error)
            });
        } finally {
            setIsParsing(false);
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '400px',
            height: 'calc(100vh - 40px)',
            background: 'rgba(5, 5, 5, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            <h3 style={{
                color: '#fff',
                fontSize: '14px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{ color: '#FF4500' }}>●</span> T-Lang Studio (Prophet)
            </h3>

            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                    flex: 1,
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#FFD700',
                    padding: '12px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit'
                }}
                spellCheck={false}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <button
                    onClick={handleParse}
                    disabled={isParsing}
                    style={{
                        background: isParsing ? '#333' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: isParsing ? 'wait' : 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {isParsing ? 'PARSING...' : 'Ignite Reality'}
                </button>
                <button
                    onClick={onLeapTrigger}
                    style={{
                        background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#000',
                        padding: '10px',
                        fontSize: '12px',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
                    }}
                >
                    LEAP TO W=13
                </button>
            </div>
        </div>
    );
};

export default TLangEditor;
