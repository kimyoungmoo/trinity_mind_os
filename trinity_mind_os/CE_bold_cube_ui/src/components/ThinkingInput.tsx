import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

interface ThinkingInputProps {
    onRouteDetermined: (route: string, explanation: string) => void;
}

const ThinkingInput: React.FC<ThinkingInputProps> = ({ onRouteDetermined }) => {
    const [thought, setThought] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!thought.trim()) return;

        setIsProcessing(true);
        try {
            // Call the Hexad Router in Backend
            const result: string = await invoke('cmd_determine_route', { payload: thought });
            const parsed = JSON.parse(result);
            onRouteDetermined(parsed.route, parsed.explanation);
            setThought(''); // Clear input after send
        } catch (err) {
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            zIndex: 10,
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            <form onSubmit={handleAnalyze} style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="Inject Thought Stream..."
                    style={{
                        width: '100%',
                        padding: '16px 24px',
                        fontSize: '16px',
                        background: 'rgba(10, 10, 18, 0.75)',
                        border: '1px solid rgba(0, 255, 240, 0.3)',
                        borderRadius: '12px',
                        color: '#00fff0',
                        backdropFilter: 'blur(12px)',
                        outline: 'none',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#00fff0'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 240, 0.3)'}
                />
                <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: isProcessing ? 'rgba(0, 255, 240, 0.5)' : '#00fff0',
                        cursor: isProcessing ? 'wait' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    {isProcessing ? 'ROUTING...' : 'INJECT >'}
                </button>
            </form>
        </div>
    );
};

export default ThinkingInput;
