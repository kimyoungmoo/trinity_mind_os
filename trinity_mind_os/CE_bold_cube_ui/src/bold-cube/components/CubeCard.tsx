
import React from 'react';
import { Cube } from '../types';
import { Edit3, Trash2, Sparkles, Box, Gem, MessageCircle, ChevronRight } from 'lucide-react';
import { GoldenChain } from './GoldenChain';

interface CubeCardProps {
  cube: Cube;
  childCount: number;
  onNavigate: (cube: Cube) => void;
  onEdit: (cube: Cube) => void;
  onDelete: (cube: Cube) => void;
  onAiGenerate: (cube: Cube) => void;
  isLast?: boolean;
}

const colorMap: Record<string, string> = {
  blue: "text-blue-400",
  purple: "text-purple-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
  indigo: "text-indigo-400",
  monotone: "text-white",
};

const bgColorMap: Record<string, string> = {
  blue: "bg-blue-500/10",
  purple: "bg-purple-500/10",
  emerald: "bg-emerald-500/10",
  amber: "bg-amber-500/10",
  rose: "bg-rose-500/10",
  indigo: "bg-indigo-500/10",
  monotone: "bg-white/10",
};

export const CubeCard: React.FC<CubeCardProps> = ({
  cube,
  childCount,
  onNavigate,
  onEdit,
  onDelete,
  onAiGenerate,
  isLast
}) => {
  return (
    <div
      className="relative animate-subtle-fade group cursor-pointer"
      onClick={() => onNavigate(cube)}
    >
      <div className="flex gap-6">
        <div className="flex flex-col items-center shrink-0">
          <div className={`w-14 h-14 rounded-2xl ${bgColorMap[cube.color]} border border-white/5 flex items-center justify-center transition-all group-hover:border-white/20 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
            {cube.isResonated ? <Gem size={20} className="text-white" /> : <Box size={20} strokeWidth={2.5} className={colorMap[cube.color]} />}
          </div>
          {!isLast && <div className="w-0.5 grow bg-white/[0.03] mt-3 rounded-full"></div>}
        </div>

        <div className="flex-1 pb-10 pt-1 border-b border-white/[0.03]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-black text-white group-hover:text-neutral-200 transition-colors tracking-tight">{cube.title}</h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(cube); }}
                className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(cube); }}
                className="p-2 hover:bg-red-500/10 rounded-full text-red-500/40 hover:text-red-500"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <p className="text-sm text-threads-text-dim line-clamp-2 leading-relaxed mb-5 font-medium">
            {cube.content || "기록된 내용이 없습니다."}
          </p>

          {cube.isResonated && cube.goldenChain && (
            <div className="mb-4">
              <GoldenChain link={cube.goldenChain} />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <MessageCircle size={14} className="text-white/20" />
                {childCount} Sub-Cubes
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onAiGenerate(cube); }}
                className="flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-emerald-400 transition-all uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5"
              >
                <Sparkles size={12} />
                Expand
              </button>
            </div>

            <ChevronRight size={18} className="text-white/10 group-hover:text-white/30 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
