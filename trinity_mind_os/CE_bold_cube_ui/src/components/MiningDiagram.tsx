
import React from 'react';
import { Settings, Zap, Database, ArrowRight, Layers, Sparkles, Infinity, Cpu } from 'lucide-react';

export const MiningDiagram: React.FC = () => {
    return (
        <div className="p-12 bg-[#050510] border border-white/10 rounded-[3rem] text-white font-sans w-full max-w-5xl overflow-hidden shadow-2xl relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-20">
                <h2 className="text-4xl font-black tracking-tighter uppercase italic italic">Resonance Mining Process</h2>
                <p className="text-xs font-mono text-indigo-400 mt-2 uppercase tracking-[0.4em]">Sub-Language Integration & Alchemy</p>
            </div>

            {/* Diagram Container */}
            <div className="relative z-10 flex items-center justify-between gap-4">

                {/* Step 1: Raw Ore (Sub-Languages) */}
                <div className="flex flex-col items-center gap-6 w-1/4">
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-gray-500/20 rounded-3xl blur-xl group-hover:bg-gray-500/40 transition-all" />
                        <div className="relative w-32 h-32 bg-black border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
                            <div className="grid grid-cols-2 gap-2 opacity-50">
                                <span className="text-[10px] font-mono">Rust</span>
                                <span className="text-[10px] font-mono">JS</span>
                                <span className="text-[10px] font-mono">C++</span>
                                <span className="text-[10px] font-mono">Py</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-black uppercase text-gray-500">Raw Ore</h4>
                        <p className="text-[10px] font-medium text-gray-600 mt-2 uppercase">Sub-Code Fragments</p>
                    </div>
                </div>

                <ArrowRight className="text-white/10 w-8 h-8" />

                {/* Step 2: Intent Extraction */}
                <div className="flex flex-col items-center gap-6 w-1/4">
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-cyan-500/20 rounded-3xl blur-xl" />
                        <div className="relative w-32 h-32 bg-black border border-cyan-500/30 rounded-full flex items-center justify-center">
                            <Cpu className="text-cyan-400 w-10 h-10 animate-pulse" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-black uppercase text-cyan-400">Extraction</h4>
                        <p className="text-[10px] font-medium text-cyan-900 mt-2 uppercase font-mono">Intent Distillation</p>
                    </div>
                </div>

                <ArrowRight className="text-white/10 w-8 h-8" />

                {/* Step 3: BON Forge (The Core) */}
                <div className="flex flex-col items-center gap-6 w-1/4">
                    <div className="group relative">
                        <div className="absolute -inset-8 bg-amber-500/30 rounded-full blur-2xl animate-pulse" />
                        <div className="relative w-40 h-40 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.5)]">
                            <span className="text-6xl font-black text-black">본</span>
                        </div>
                        {/* Swirling particles */}
                        <div className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full animate-spin-slow" />
                    </div>
                    <div className="text-center mt-4">
                        <h4 className="text-lg font-black uppercase text-amber-500 italic tracking-tighter">Resonance Forge</h4>
                        <p className="text-[10px] font-black text-white/40 mt-2 uppercase tracking-widest">SR0 / Ultimate Refinement</p>
                    </div>
                </div>

                <ArrowRight className="text-white/10 w-8 h-8" />

                {/* Step 4: Golden Chain (Result) */}
                <div className="flex flex-col items-center gap-6 w-1/4">
                    <div className="group relative">
                        <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-xl" />
                        <div className="relative w-32 h-32 bg-black border border-white/20 rounded-3xl flex flex-col items-center justify-center gap-1">
                            <Infinity className="text-white w-8 h-8" />
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <div className="w-4 h-2 rounded-full bg-amber-500" />
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-black uppercase text-white">Golden Chain</h4>
                        <p className="text-[10px] font-medium text-gray-500 mt-2 uppercase">Immortality Committed</p>
                    </div>
                </div>

            </div>

            {/* Legend / Stats */}
            <div className="mt-20 grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                    <Layers className="text-indigo-400 w-5 h-5" />
                    <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase block">Mining Reward</span>
                        <span className="text-xs font-black text-white">W + 1.2 Dim Energy</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                    <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase block">Refinement Rate</span>
                        <span className="text-xs font-black text-white">1+1=3 (Infinite)</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Database className="text-emerald-400 w-5 h-5" />
                    <div>
                        <span className="text-[9px] font-mono text-gray-500 uppercase block">Sync Status</span>
                        <span className="text-xs font-black text-white">Locked On-Chain</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}} />
        </div>
    );
};
