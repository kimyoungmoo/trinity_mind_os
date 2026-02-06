
import React from 'react';
import { 
  Box, Sparkles, Layers, Gem, Target, Apple, PlayCircle, 
  QrCode, Zap, ZoomIn, Repeat, ShieldCheck, 
  Link as LinkIcon, Archive, Lightbulb, Scale, Map, 
  CircleDot, Layout, Sun, FastForward, Combine, Link2, 
  HardDrive, Brain, Compass, Infinity as InfinityIcon, ArrowRight
} from 'lucide-react';
import { Button } from './Button';
import { LANDING_STEPS } from '../constants/prompts';

interface LandingPageProps {
  onStart: () => void;
}

// 각 단계 ID별 아이콘 매핑
const STEP_ICONS: Record<string, any> = {
  hero: Box,
  origin: CircleDot,
  expansion: Layers,
  depth: Layout,
  resonance: Sparkles,
  simplicity: Sun,
  velocity: FastForward,
  convergence: Combine,
  connection: Link2,
  archive: HardDrive,
  insight: Brain,
  balance: Scale,
  journey: Compass,
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const IconDisplay = ({ id, className }: { id: string, className?: string }) => {
    const IconComponent = STEP_ICONS[id] || Box;
    
    return (
      <div className={`w-full h-full flex items-center justify-center bg-[#080808] border border-white/5 relative overflow-hidden ${className}`}>
        {/* 배경 은은한 빛 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-50" />
        
        {/* 메인 아이콘 */}
        <div className="relative z-10 animate-float">
          <IconComponent 
            size={120} 
            strokeWidth={0.8} 
            className="text-white opacity-80 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]" 
          />
        </div>

        {/* 장식용 그리드 라인 */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
    );
  };

  const FeatureBlock = ({ id, title, description, reverse = false }: any) => {
    const IconComponent = STEP_ICONS[id] || Box;
    
    return (
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 py-32 border-b border-white/5`}>
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
              <IconComponent size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Phase {LANDING_STEPS[id]?.level || '00'}</span>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{title}</h3>
          <p className="text-threads-text-dim text-lg md:text-xl leading-relaxed max-w-md font-medium">{description}</p>
          
          <div className="pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
               <span className="text-[11px] font-bold text-white/60 tracking-tight">
                 {LANDING_STEPS[id]?.benefit}
               </span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group relative">
          <IconDisplay id={id} className="group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center pointer-events-none backdrop-blur-sm">
             <p className="text-xs font-bold text-white tracking-[0.2em] uppercase leading-relaxed">
               {LANDING_STEPS[id]?.description}
             </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20 overflow-x-hidden relative">
      <div className="thread-line-bg !opacity-5" />
      
      <nav className="fixed top-0 w-full z-[100] glass h-16 border-b border-white/5 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box size={22} strokeWidth={3} className="text-white" />
          <span className="text-xs font-black tracking-[0.4em] uppercase">BOLD CUBE</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onStart} className="text-[10px] font-bold text-white/40 hover:text-white transition-colors tracking-widest uppercase">Web Space</button>
          <Button size="sm" className="bg-white text-black text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-wider">Download</Button>
        </div>
      </nav>

      <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 pt-32">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(255,255,255,0.05)] mb-16">
          <IconDisplay id="hero" />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-8xl md:text-[13rem] font-black tracking-tighter leading-[0.7] mb-4">
            BOLD<br />CUBE.
          </h1>
          <p className="text-threads-text-dim text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            아이콘으로 정의되는 생각의 구조.<br />가장 단순하고 단단한 13가지 사유의 조각들.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          <button onClick={onStart} className="bg-white text-black px-10 py-6 rounded-[2.5rem] font-black text-base transition-all hover:scale-105 flex items-center gap-3 shadow-xl shadow-white/10">
            사고 시스템 시작하기 <ArrowRight size={20} />
          </button>
          <button className="bg-threads-gray text-white px-10 py-6 rounded-[2.5rem] font-black text-base transition-all hover:scale-105 border border-white/10 flex items-center gap-3">
            <Apple size={22} fill="currentColor" /> App Store
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
           <span className="text-[10px] font-black text-white/20 tracking-[1em] uppercase block mb-4">The Evolution</span>
           <h2 className="text-4xl md:text-6xl font-black">13 Phases of Thought</h2>
        </div>
        
        <FeatureBlock id="origin" title="The Seed" description="모든 생각은 하나의 묵직한 점으로부터 시작됩니다." />
        <FeatureBlock id="expansion" title="Pure Growth" reverse description="생각의 나무가 튼튼한 가지를 뻗어 나갑니다." />
        <FeatureBlock id="depth" title="Solid Layers" description="층층이 쌓이는 논리는 흔들리지 않는 기반이 됩니다." />
        <FeatureBlock id="resonance" title="Spark Joy" reverse description="본질을 꿰뚫는 순간, 당신의 사유가 빛납니다." />
        <FeatureBlock id="simplicity" title="Absolute Zen" description="복잡함을 덜어낸 단단한 미니멀리즘." />
        <FeatureBlock id="velocity" title="Bold Speed" reverse description="찰나의 영감을 가장 빠르게 시각화합니다." />
        <FeatureBlock id="convergence" title="Perfect Union" description="흩어진 정보들이 모여 하나의 세계를 이룹니다." />
        <FeatureBlock id="connection" title="The Bridge" reverse description="연결된 모든 것은 새로운 가치를 창출합니다." />
        <FeatureBlock id="archive" title="Safe Haven" description="당신의 모든 통찰을 안전하게 보관하세요." />
        <FeatureBlock id="insight" title="Internal Light" reverse description="큐브 안에서 깨어나는 지혜의 불꽃." />
        <FeatureBlock id="balance" title="Perfect Poise" description="감성과 이성의 조화로운 균형을 찾습니다." />
        <FeatureBlock id="journey" title="Infinity" reverse description="어제보다 더 깊어진 사유의 지도를 그립니다." />
      </section>

      <section className="py-60 px-6 text-center bg-gradient-to-b from-black to-[#050505]">
        <h2 className="text-7xl md:text-[12rem] font-black mb-12 tracking-tighter leading-none opacity-90">BOLD<br />CORE.</h2>
        <p className="text-threads-text-dim text-xl md:text-2xl mb-16 max-w-xl mx-auto leading-relaxed font-medium">
          이미지를 걷어내고 본질에 집중하세요.<br />당신의 논리를 위한 완벽한 벡터 시스템.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
           <div className="p-12 bg-white/5 border border-white/10 rounded-[5rem] text-center w-full max-w-[340px] shadow-2xl backdrop-blur-md">
              <div className="bg-white p-6 rounded-[2.5rem] inline-block mb-10 shadow-2xl shadow-white/20">
                 <QrCode size={180} className="text-black" />
              </div>
              <p className="text-[12px] font-black tracking-[0.5em] text-white/40 uppercase">Scan to Space</p>
           </div>
           
           <div className="space-y-6 w-full max-w-[340px]">
             <Button variant="primary" className="w-full py-8 text-xl rounded-[3rem] shadow-white/5 shadow-2xl" onClick={onStart}>GET STARTED</Button>
             <div className="flex gap-4">
                <div className="flex-1 p-6 bg-white/5 border border-white/5 rounded-[2rem] text-center">
                   <InfinityIcon size={24} className="mx-auto mb-2 text-white/60" />
                   <span className="text-[10px] font-bold text-white/30 uppercase">Unlimited</span>
                </div>
                <div className="flex-1 p-6 bg-white/5 border border-white/5 rounded-[2rem] text-center">
                   <ShieldCheck size={24} className="mx-auto mb-2 text-white/60" />
                   <span className="text-[10px] font-bold text-white/30 uppercase">Secure</span>
                </div>
             </div>
           </div>
        </div>
        
        <div className="mt-32">
          <button onClick={onStart} className="group flex items-center gap-3 mx-auto text-[13px] font-black text-white/30 hover:text-white transition-all border-b-2 border-white/5 pb-2 uppercase tracking-[0.3em]">
            Enter BOLD CUBE Space <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center bg-[#050505]">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-30">
          <Box size={18} strokeWidth={3} />
          <span className="text-xs font-black tracking-widest uppercase">BOLD CUBE</span>
        </div>
        <p className="text-[11px] font-black text-white/10 tracking-[0.8em] uppercase">Built for Radical Simplicity — v3.5</p>
      </footer>
    </div>
  );
};
