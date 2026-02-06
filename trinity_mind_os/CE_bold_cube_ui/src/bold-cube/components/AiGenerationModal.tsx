
import React, { useState } from 'react';
import { X, Zap, CheckCircle2, Layers, Sliders, MessageSquareText } from 'lucide-react';
import { AiNature, AiGenConfig } from '../types';
import { Button } from './Button';

interface AiGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (config: AiGenConfig) => void;
  topicTitle: string;
}

export const AiGenerationModal: React.FC<AiGenerationModalProps> = ({ isOpen, onClose, onConfirm, topicTitle }) => {
  const [count, setCount] = useState(4);
  const [nature, setNature] = useState<AiNature>('CE');
  const [customInstruction, setCustomInstruction] = useState('');

  if (!isOpen) return null;

  const natures: { id: AiNature; label: string; desc: string; icon: any }[] = [
    { id: 'CE', label: '확산(Explore)', desc: '창의적이고 새로운 아이디어를 제안합니다.', icon: Zap },
    { id: 'AQ', label: '실행(Action)', desc: '현실적이고 즉각적인 행동 지침을 제시합니다.', icon: CheckCircle2 },
    { id: 'GF', label: '구조(System)', desc: '논리적이고 체계적인 시스템을 구축합니다.', icon: Layers },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#101010] w-full max-w-2xl h-[90vh] sm:h-auto overflow-y-auto sm:rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-subtle-fade border border-white/5">
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/5 bg-[#101010]/50 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Sliders size={24} className="text-white" />
            <span className="text-xl font-black tracking-tight">AI 사고 확장 설정</span>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 space-y-12 pb-32 sm:pb-12">
          <div className="text-center">
            <span className="text-[10px] font-black text-white/30 block mb-4 uppercase tracking-[0.4em]">Target Topic</span>
            <h3 className="text-3xl font-black tracking-tight leading-tight">"{topicTitle}"</h3>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Select Nature</label>
            <div className="grid grid-cols-1 gap-3">
              {natures.map((n) => (
                <button
                  key={n.id} type="button" onClick={() => setNature(n.id)}
                  className={`flex items-center gap-6 p-5 rounded-[1.5rem] border-2 transition-all text-left ${
                    nature === n.id ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 border-transparent text-white hover:bg-white/10'
                  }`}
                >
                  <div className={`p-4 rounded-xl ${nature === n.id ? 'bg-black text-white' : 'bg-white/10 text-neutral-400'}`}>
                    <n.icon size={22} />
                  </div>
                  <div>
                    <span className="text-lg font-black uppercase tracking-widest block leading-none">{n.label}</span>
                    <span className={`text-[11px] font-bold mt-2 block ${nature === n.id ? 'text-black/60' : 'text-white/40'}`}>{n.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
             <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
                <MessageSquareText size={14} /> Custom AI Instruction (Optional)
             </label>
             <textarea 
               value={customInstruction} 
               onChange={(e) => setCustomInstruction(e.target.value)}
               placeholder="AI에게 더 구체적인 지시를 내려보세요. (예: '비즈니스 관점에서 분석해줘', '5세 아이도 이해할 수 있게 설명해줘')"
               className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:outline-none focus:border-white/20 transition-all min-h-[100px] placeholder:text-white/10"
             />
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Nodes to Generate</label>
              <span className="text-2xl font-black">{count}개</span>
            </div>
            <input 
              type="range" min="2" max="8" step="1" value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          <Button variant="primary" size="lg" className="w-full py-6 text-xl rounded-[2rem] shadow-white/5 shadow-2xl" onClick={() => onConfirm({ count, nature, customInstruction })}>
            사고 확장 시작
          </Button>
        </div>
      </div>
    </div>
  );
};
