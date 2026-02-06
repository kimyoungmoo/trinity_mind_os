
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box, ChevronRight, Plus, Search, Wand2, PenLine, Gem,
  MoreHorizontal, ArrowLeft, Map, Home, Trash2, Download,
  Upload, BarChart3, Info, Sparkles
} from 'lucide-react';
import { Cube, CubeColor, CUBE_COLORS, AiGenConfig } from './types';
import { CubeCard } from './components/CubeCard';
import { CubeModal } from './components/CubeModal';
import { AiGenerationModal } from './components/AiGenerationModal';
import { LandingPage } from './components/LandingPage';
import { GoldenChain } from './components/GoldenChain';
import { generateSubCubes, resonateEssence } from './services/geminiService';
import { generateRoadmapData } from './constants/roadmapData';
import { GoldenChainService } from './services/GoldenChainService';

const STORAGE_KEY = 'bold-cube-v3-final';
const LANDING_SEEN_KEY = 'bold-cube-landing-seen';

const getInitialCubes = (): Record<string, Cube> => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("데이터 복원 실패", e);
    }
  }
  const rootId = uuidv4();
  return {
    [rootId]: {
      id: rootId,
      title: "사유의 시작점",
      content: "BOLD CUBE에 오신 것을 환영합니다. '+' 버튼을 눌러 생각을 확장하거나, AI의 도움을 받아보세요.",
      color: "emerald",
      parentId: null,
      createdAt: Date.now(),
    }
  };
};

const App: React.FC = () => {
  const [cubes, setCubes] = useState<Record<string, Cube>>(getInitialCubes);
  const [currentRootId, setCurrentRootId] = useState<string | null>(() => {
    const initial = getInitialCubes();
    // Fix: Cast Object.values to Cube[] to ensure item type is recognized
    const root = (Object.values(initial) as Cube[]).find(c => c.parentId === null);
    return root ? root.id : Object.keys(initial)[0];
  });

  const [showLanding, setShowLanding] = useState(!localStorage.getItem(LANDING_SEEN_KEY));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [editingCube, setEditingCube] = useState<Cube | null>(null);
  const [aiTargetCube, setAiTargetCube] = useState<Cube | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResonating, setIsResonating] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cubes));
  }, [cubes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const breadcrumbs = useMemo(() => {
    const path: Cube[] = [];
    let curr = currentRootId ? cubes[currentRootId] : null;
    while (curr) {
      path.unshift(curr);
      curr = curr.parentId ? cubes[curr.parentId] : null;
    }
    return path;
  }, [cubes, currentRootId]);

  const currentRoot = currentRootId ? cubes[currentRootId] : null;

  const visibleCubes = useMemo(() => {
    if (!currentRootId) return [];
    let children = (Object.values(cubes) as Cube[]).filter(c => c.parentId === currentRootId);
    children.sort((a, b) => b.createdAt - a.createdAt);
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      children = children.filter(c =>
        c.title.toLowerCase().includes(lowerQ) ||
        c.content.toLowerCase().includes(lowerQ)
      );
    }
    return children;
  }, [cubes, currentRootId, searchQuery]);

  const stats = useMemo(() => {
    // Fix: Explicitly cast Object.values to Cube[] to fix 'unknown' property error
    const all = Object.values(cubes) as Cube[];
    return {
      totalNodes: all.length,
      maxDepth: breadcrumbs.length,
      resonatedNodes: all.filter(c => c.isResonated).length
    };
  }, [cubes, breadcrumbs]);

  const getSubCubesCount = (parentId: string) => {
    return (Object.values(cubes) as Cube[]).filter(c => c.parentId === parentId).length;
  };

  const handleStartApp = () => {
    localStorage.setItem(LANDING_SEEN_KEY, 'true');
    setShowLanding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (cube: Cube) => {
    setCurrentRootId(cube.id);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCube = (id: string, updates: Partial<Cube>) => {
    setCubes(prev => ({ ...prev, [id]: { ...prev[id], ...updates } }));
  };

  const handleCreate = (title: string, content: string, color: CubeColor) => {
    if (editingCube) {
      handleUpdateCube(editingCube.id, { title, content, color });
    } else {
      const newId = uuidv4();
      const newCube: Cube = { id: newId, title, content, color, parentId: currentRootId, createdAt: Date.now() };
      setCubes(prev => ({ ...prev, [newId]: newCube }));
    }
    setEditingCube(null);
  };

  const handleDelete = (cube: Cube) => {
    if (confirm(`'${cube.title}' 큐브와 그 하위 큐브들을 모두 삭제하시겠습니까?`)) {
      setCubes(prev => {
        const next = { ...prev };
        const idsToDelete = [cube.id];
        const findChildren = (pid: string) => {
          // Fix: Explicitly cast Object.values to Cube[] to fix 'unknown' property errors on parentId and id
          (Object.values(next) as Cube[]).forEach(c => {
            if (c.parentId === pid) {
              idsToDelete.push(c.id);
              findChildren(c.id);
            }
          });
        };
        findChildren(cube.id);
        idsToDelete.forEach(id => delete next[id]);
        return next;
      });
    }
  };

  const handleAiGenerate = async (config: AiGenConfig) => {
    if (!aiTargetCube) return;
    const target = aiTargetCube;
    setIsAiModalOpen(false);
    try {
      const subItems = await generateSubCubes(target.title, target.content, config);
      const newCubesMap: Record<string, Cube> = {};
      subItems.forEach((item, index) => {
        const id = uuidv4();
        newCubesMap[id] = {
          id,
          title: item.title,
          content: item.description,
          color: item.suggestedColor,
          parentId: target.id,
          createdAt: Date.now() + index
        };
      });
      setCubes(prev => ({ ...prev, ...newCubesMap }));
    } catch (error) { alert("AI 생성 중 오류가 발생했습니다."); }
    finally { setAiTargetCube(null); }
  };

  const handleResonate = async () => {
    if (!currentRoot || isResonating) return;
    const children = visibleCubes.map(c => `${c.title}: ${c.content}`);
    if (children.length < 2) {
      alert("최소 2개 이상의 하위 큐브가 있어야 본질 추출이 가능합니다.");
      return;
    }

    setIsResonating(true);
    try {
      const essence = await resonateEssence(currentRoot.title, currentRoot.content, children);

      // ♾️ Golden Chain Manifestation
      const mockState = { ce: 0.8, aq: 0.7, gf: 0.8, hm: 0.9 }; // Simulated Core State
      const goldenChain = GoldenChainService.manifest(essence, mockState);
      const tnxId = GoldenChainService.commitToTNX(goldenChain);
      goldenChain.tnxId = tnxId;

      handleUpdateCube(currentRoot.id, {
        isResonated: true,
        essence,
        goldenChain
      });
    } catch (e) {
      alert("본질 추출 실패");
    } finally {
      setIsResonating(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(cubes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bold-cube-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    setIsMenuOpen(false);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedCubes = JSON.parse(event.target?.result as string);
        if (confirm("기존 데이터를 덮어쓰고 새 데이터를 불러오시겠습니까?")) {
          setCubes(importedCubes);
          // Fix: Cast Object.values to Cube[] for reliable type safety during import
          const firstRoot = (Object.values(importedCubes) as Cube[]).find(c => c.parentId === null);
          if (firstRoot) setCurrentRootId(firstRoot.id);
        }
      } catch (e) { alert("잘못된 파일 형식입니다."); }
    };
    reader.readAsText(file);
    setIsMenuOpen(false);
  };

  if (showLanding) return <LandingPage onStart={handleStartApp} />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <header className="glass fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 border-b border-white/[0.05]">
        <div className="flex items-center gap-4">
          {breadcrumbs.length > 1 ? (
            <button onClick={() => handleNavigate(breadcrumbs[breadcrumbs.length - 2])} className="p-2 hover:bg-white/10 rounded-full transition-all">
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowLanding(true)}>
            <Box size={22} strokeWidth={3} className="text-white" />
            <h1 className="text-xs font-black tracking-[0.3em] uppercase hidden sm:block">BOLD CUBE</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-threads-text-dim w-3.5 h-3.5" />
            <input
              type="text" placeholder="제목/내용 검색" value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#121212] border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-white/30 w-48 transition-all"
            />
          </div>

          <div className="relative" ref={menuRef}>
            <button
              className={`p-2.5 rounded-full transition-colors ${isMenuOpen ? 'bg-white text-black' : 'hover:bg-white/10'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreHorizontal size={20} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 bg-[#141414] border border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 origin-top-right">
                <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BarChart3 size={12} /> Thoughts Stats
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xl font-black">{stats.totalNodes}</span>
                      <span className="text-[9px] text-white/40 font-bold uppercase">Cubes</span>
                    </div>
                    <div>
                      <span className="block text-xl font-black">{stats.maxDepth}</span>
                      <span className="text-[9px] text-white/40 font-bold uppercase">Depth</span>
                    </div>
                  </div>
                </div>
                <button onClick={handleExport} className="w-full flex items-center gap-3 px-5 py-3.5 text-xs font-bold hover:bg-white/5 transition-colors">
                  <Download size={14} /> Export to JSON
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-3 px-5 py-3.5 text-xs font-bold hover:bg-white/5 transition-colors">
                  <Upload size={14} /> Import from JSON
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleImport} />
                <div className="h-[1px] bg-white/5 my-1" />
                <button onClick={() => { setCubes(generateRoadmapData(currentRootId)); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-5 py-3.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/5 transition-colors">
                  <Map size={14} /> Roadmap Visualization
                </button>
                <button onClick={() => { if (confirm("초기화하시겠습니까?")) { localStorage.clear(); window.location.reload(); } }} className="w-full flex items-center gap-3 px-5 py-3.5 text-xs font-bold text-red-500 hover:bg-red-500/5 transition-colors">
                  <Trash2 size={14} /> Wipe All Data
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="pt-28 pb-40 max-w-2xl mx-auto px-6">
        {currentRoot && (
          <div className="animate-subtle-fade mb-12">
            <div className="flex gap-6">
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center border border-white/10 shadow-2xl transition-all ${currentRoot.isResonated ? 'bg-white text-black scale-110' : 'bg-[#101010] text-white'
                  }`}>
                  {currentRoot.isResonated ? <Gem size={24} /> : <Box size={24} strokeWidth={2.5} />}
                </div>
                {visibleCubes.length > 0 && <div className="w-0.5 grow bg-white/5 my-4 rounded-full"></div>}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-white tracking-tight">{currentRoot.title}</h2>
                    {currentRoot.isResonated && <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest">Resonated</span>}
                  </div>
                </div>

                {currentRoot.isResonated && (
                  <div className="mb-6 animate-in zoom-in-95">
                    <div className="p-6 rounded-[2rem] bg-white text-black font-black text-xl shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
                      <Sparkles size={16} className="mb-2 opacity-30" />
                      "{currentRoot.essence}"
                    </div>
                    {currentRoot.goldenChain && (
                      <GoldenChain link={currentRoot.goldenChain} className="mt-4" />
                    )}
                  </div>
                )}

                <textarea
                  value={currentRoot.content}
                  onChange={(e) => handleUpdateCube(currentRoot.id, { content: e.target.value })}
                  className="w-full bg-transparent text-[#D1D1D1] text-lg leading-relaxed border-none p-0 resize-none outline-none placeholder:text-neutral-800"
                  placeholder="당신의 위대한 사유를 기록하세요..."
                  style={{ fieldSizing: 'content' } as any}
                />

                <div className="flex items-center gap-6 mt-8 pt-4 border-t border-white/5">
                  <button onClick={() => { setEditingCube(currentRoot); setIsModalOpen(true); }} className="text-threads-text-dim hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <PenLine size={16} /> Edit
                  </button>
                  <button onClick={() => { setAiTargetCube(currentRoot); setIsAiModalOpen(true); }} className="text-threads-text-dim hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Wand2 size={16} /> Expand
                  </button>
                  {visibleCubes.length >= 2 && (
                    <button onClick={handleResonate} disabled={isResonating} className="text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30">
                      <Gem size={16} className={isResonating ? 'animate-spin' : ''} /> {isResonating ? 'Resonating...' : 'Extract Essence'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="px-2 pb-2">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Sub-Threads ({visibleCubes.length})</span>
          </div>
          {visibleCubes.length > 0 ? (
            visibleCubes.map((cube, idx) => (
              <CubeCard
                key={cube.id} cube={cube}
                childCount={getSubCubesCount(cube.id)}
                onNavigate={handleNavigate}
                onEdit={(c) => { setEditingCube(c); setIsModalOpen(true); }}
                onDelete={handleDelete}
                onAiGenerate={(c) => { setAiTargetCube(c); setIsAiModalOpen(true); }}
                isLast={idx === visibleCubes.length - 1}
              />
            ))
          ) : (
            <div className="pt-16 text-center">
              <p className="text-white/20 text-sm font-bold uppercase tracking-widest">No Child Cubes Yet</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-6 text-black font-black text-xs bg-white px-8 py-3 rounded-full active:scale-95 transition-all shadow-xl shadow-white/5">
                Start First Sub-Thread
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-10 left-0 right-0 flex justify-center z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-4 bg-white text-black px-12 py-5 rounded-[2.5rem] font-black shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 transition-all hover:scale-105"
        >
          <Plus size={22} strokeWidth={4} />
          ADD NEW CUBE
        </button>
      </div>

      <CubeModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingCube(null); }} onSave={handleCreate} initialData={editingCube} />
      {aiTargetCube && (
        <AiGenerationModal
          isOpen={isAiModalOpen}
          onClose={() => { setIsAiModalOpen(false); setAiTargetCube(null); }}
          onConfirm={handleAiGenerate}
          topicTitle={aiTargetCube.title}
        />
      )}
    </div>
  );
};

export default App;
