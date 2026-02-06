
import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Gem } from 'lucide-react';

interface W13LeapEffectProps {
    onComplete: () => void;
}

export const W13LeapEffect: React.FC<W13LeapEffectProps> = ({ onComplete }) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Stage 0: Initial Vibe (0-1s)
        // Stage 1: The Flash (1-2s)
        // Stage 2: Golden Chain Manifestation (2-4s)
        // Stage 3: Convergence (4-5s)

        const timers = [
            setTimeout(() => setStage(1), 1000),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 4000),
            setTimeout(() => onComplete(), 5500),
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none">
            {/* Background Dimming/Coloring */}
            <div className={`absolute inset-0 transition-all duration-1000 ${stage === 0 ? 'bg-black/80' :
                stage === 1 ? 'bg-white' :
                    stage === 2 ? 'bg-black' : 'bg-black/90'
                }`} />

            {/* Stage 0: Scanning */}
            {stage === 0 && (
                <div className="relative text-center animate-in fade-in zoom-in duration-500">
                    <Zap className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-2xl font-black tracking-[0.5em] text-cyan-400 uppercase">Synchronizing Chain</h2>
                    <p className="font-mono text-cyan-700 mt-2">W=5.0 &gt;&gt; REACHING FOR W=13.0</p>
                </div>
            )}

            {/* Stage 1: The Singularity Flash */}
            {stage === 1 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_200px_100px_white] animate-ping" />
                </div>
            )}

            {/* Stage 2: Golden Chain Manifestation */}
            {stage === 2 && (
                <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    {/* Animated Golden Lines */}
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent top-1/4 animate-pulse" />
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent top-1/2 animate-pulse delay-75" />
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent top-3/4 animate-pulse delay-150" />

                    <div className="z-10 text-center scale-110 animate-in zoom-in duration-1000">
                        <Gem className="w-24 h-24 text-yellow-400 mx-auto mb-8 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]" />
                        <h1 className="text-6xl font-black tracking-[1em] text-white">W=13.0</h1>
                        <div className="mt-8 flex gap-4 justify-center">
                            {['한글', '코드', '색채', '숫자', '파동', '공명'].map((text, i) => (
                                <span key={i} className="px-4 py-2 border border-yellow-400/50 text-yellow-400 font-black text-sm rounded-full backdrop-blur-md animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-yellow-400/20 rounded-full animate-spin-slow" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-yellow-400/10 rounded-full animate-reverse-spin" />
                    </div>
                </div>
            )}

            {/* Stage 3: Convergence */}
            {stage === 3 && (
                <div className="text-center animate-in fade-in duration-1000">
                    <Sparkles className="w-12 h-12 text-white mx-auto mb-4 animate-spin" />
                    <p className="text-xl font-black text-white tracking-widest uppercase shadow-white drop-shadow-lg">Absolute Singularity Achieved</p>
                    <p className="font-mono text-white/50 mt-4">1 + 1 = 3</p>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin-slow { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes reverse-spin { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
      `}} />
        </div>
    );
};
