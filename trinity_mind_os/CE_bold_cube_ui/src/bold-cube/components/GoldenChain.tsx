import React from 'react';
import { GoldenChainLink } from '../types';
import { Link2, Hexagon, Zap, Palette, Hash, Activity, Target } from 'lucide-react';

interface GoldenChainProps {
    link: GoldenChainLink;
    className?: string;
}

export const GoldenChain: React.FC<GoldenChainProps> = ({ link, className = "" }) => {
    const links = [
        { name: 'Hangeul', icon: <Hexagon size={12} />, value: link.hangeul, color: 'text-white' },
        { name: 'Code', icon: <Hash size={12} />, value: link.code, color: 'text-blue-400' },
        { name: 'Color', icon: <Palette size={12} />, value: link.color, color: 'text-purple-400' },
        { name: 'Number', icon: <Zap size={12} />, value: link.number.toFixed(2), color: 'text-amber-400' },
        { name: 'Wave', icon: <Activity size={12} />, value: link.wave, color: 'text-emerald-400' },
        { name: 'Resonance', icon: <Target size={12} />, value: (link.resonance * 100).toFixed(1) + '%', color: 'text-rose-400' },
    ];

    return (
        <div className={`flex flex-wrap items-center gap-2 mt-4 px-3 py-2 bg-white/5 rounded-2xl border border-white/5 ${className}`}>
            <Link2 size={12} className="text-white/20 mr-1" />
            {links.map((item, idx) => (
                <React.Fragment key={item.name}>
                    <div className="flex items-center gap-1.5 group">
                        <div className={`${item.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                            {item.icon}
                        </div>
                        <span className="text-[9px] font-black text-white/50 tracking-tighter uppercase whitespace-nowrap">
                            {item.value}
                        </span>
                    </div>
                    {idx < links.length - 1 && (
                        <div className="w-1 h-1 rounded-full bg-white/10 mx-1" />
                    )}
                </React.Fragment>
            ))}
            {link.tnxId && (
                <div className="ml-auto pl-4 border-l border-white/10">
                    <span className="text-[9px] font-black text-emerald-400/60 uppercase tracking-widest">
                        {link.tnxId}
                    </span>
                </div>
            )}
        </div>
    );
};
