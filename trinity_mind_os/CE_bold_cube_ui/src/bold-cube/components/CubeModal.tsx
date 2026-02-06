
import React, { useState, useEffect } from 'react';
/* Added Box to the imports from lucide-react */
import { X, Sparkles, Palette, Box } from 'lucide-react';
import { Cube, CubeColor, CUBE_COLORS } from '../types';
import { Button } from './Button';
import { elaborateNote } from '../services/geminiService';

interface CubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, color: CubeColor) => void;
  initialData?: Cube | null;
}

const colorStyles: Record<string, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  indigo: "bg-indigo-500",
};

export const CubeModal: React.FC<CubeModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<CubeColor>('emerald');
  const [isElaborating, setIsElaborating] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setColor(initialData.color);
    } else if (isOpen) {
      setTitle(''); setContent(''); setColor('emerald');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title, content, color);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#101010] border border-white/5 w-full max-w-xl h-[85vh] sm:h-auto overflow-y-auto sm:rounded-[2rem] shadow-2xl animate-subtle-fade">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] sticky top-0 bg-[#101010]/80 backdrop-blur-xl z-10">
          <button onClick={onClose} className="text-sm font-medium text-white">취소</button>
          <span className="text-sm font-bold tracking-tight">새 스레드</span>
          <button 
            onClick={handleSubmit} 
            disabled={!title.trim()}
            className="text-sm font-bold text-blue-500 disabled:opacity-20"
          >
            게시
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-threads-gray border border-white/10 flex items-center justify-center shrink-0">
              {/* Box component is now available after import fix */}
              <Box size={20} className="text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full bg-transparent text-lg font-bold text-white border-none focus:ring-0 p-0 placeholder-threads-text-dim"
                autoFocus
              />
              <textarea
                value={content} onChange={(e) => setContent(e.target.value)}
                placeholder="무슨 생각을 하고 계신가요?"
                rows={6}
                className="w-full bg-transparent text-base font-medium text-[#E5E5E5] border-none focus:ring-0 p-0 resize-none placeholder-threads-text-dim"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.05] pt-6">
             <div className="flex gap-3">
                {CUBE_COLORS.map((c) => (
                  <button
                    key={c} type="button" onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-all border-2 ${color === c ? 'border-white scale-110' : 'border-transparent opacity-30'}`}
                    style={{ backgroundColor: colorStyles[c].split(' ')[0].replace('bg-', '') }}
                  />
                ))}
             </div>
             <button
                type="button" onClick={async () => {
                  if (!title) return;
                  setIsElaborating(true);
                  try {
                    const result = await elaborateNote(title, content);
                    setContent(result);
                  } finally {
                    setIsElaborating(false);
                  }
                }}
                disabled={isElaborating || !title}
                className="text-xs font-bold text-threads-text-dim hover:text-white flex items-center gap-2"
              >
                <Sparkles size={14} className={isElaborating ? 'animate-spin' : ''} /> AI 보조
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
