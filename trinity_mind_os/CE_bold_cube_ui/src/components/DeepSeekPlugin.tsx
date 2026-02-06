
import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Bot, Send, ShieldCheck } from 'lucide-react';

export const DeepSeekPlugin: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState(''); // 실제 운영 시에는 환경 변수나 보안 저장소 권장

    const askDeepSeek = async () => {
        if (!prompt || !apiKey) return;
        setLoading(true);
        try {
            const res: { message: string } = await invoke('cmd_call_deepseek', {
                request: { prompt, api_key: apiKey }
            });
            setResponse(res.message);
        } catch (e) {
            setResponse(`Error: ${e}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-black/80 border border-white/10 rounded-3xl backdrop-blur-xl w-96 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <Bot className="text-cyan-400 w-6 h-6" />
                <h3 className="text-sm font-black uppercase tracking-widest text-white">DeepSeek Intelligence</h3>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">API Key</label>
                <div className="relative">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-cyan-500/50"
                    />
                    <ShieldCheck className="absolute right-3 top-2.5 w-4 h-4 text-emerald-500 opacity-50" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">Input Query</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask Trinity Mind..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-cyan-500/50 min-h-[80px] resize-none"
                />
            </div>

            <button
                onClick={askDeepSeek}
                disabled={loading}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
            >
                {loading ? "Processing..." : <><Send size={14} /> Ignite Intelligence</>}
            </button>

            {response && (
                <div className="mt-4 p-4 bg-white/5 border border-white/5 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                        {response}
                    </p>
                </div>
            )}
        </div>
    );
};
