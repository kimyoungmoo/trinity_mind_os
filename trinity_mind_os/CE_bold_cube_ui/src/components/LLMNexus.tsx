
import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Cpu, Plus, Trash2, Send, Shield, Globe, Zap, Settings2 } from 'lucide-react';

interface LLMModel {
    id: string;
    name: string;
    endpoint: string;
    apiKey: string;
    modelName: string;
    icon: string;
}

export const LLMNexus: React.FC = () => {
    const [models, setModels] = useState<LLMModel[]>([]);
    const [activeModelId, setActiveModelId] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfig, setShowConfig] = useState(false);

    // New Model Form State
    const [newModel, setNewModel] = useState<Partial<LLMModel>>({
        name: '',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: '',
        modelName: 'gpt-4',
    });

    const addModel = () => {
        if (!newModel.name || !newModel.endpoint) return;
        const model: LLMModel = {
            id: Math.random().toString(36).substr(2, 9),
            name: newModel.name!,
            endpoint: newModel.endpoint!,
            apiKey: newModel.apiKey || '',
            modelName: newModel.modelName || 'gpt-4',
            icon: 'Cpu'
        };
        const updated = [...models, model];
        setModels(updated);
        setActiveModelId(model.id);
        setShowConfig(false);
        setNewModel({ name: '', endpoint: 'https://api.openai.com/v1/chat/completions', apiKey: '', modelName: '' });
    };

    const removeModel = (id: string) => {
        const filtered = models.filter(m => m.id !== id);
        setModels(filtered);
        if (activeModelId === id) setActiveModelId(filtered[0]?.id || null);
    };

    const callLLM = async () => {
        const activeModel = models.find(m => m.id === activeModelId);
        if (!activeModel || !prompt) return;

        setLoading(true);
        try {
            const res: { message: string } = await invoke('cmd_call_universal_llm', {
                request: {
                    endpoint: activeModel.endpoint,
                    api_key: activeModel.apiKey,
                    model: activeModel.modelName,
                    prompt: prompt,
                    system_prompt: "You are a Trinity Mind OS AI Nexus. Provide expert insights in T-Lang and Cosmic Resonance."
                }
            });
            setResponse(res.message);
        } catch (e) {
            setResponse(`Error: ${e}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-black/90 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl w-[500px] shadow-2xl flex flex-col h-[700px] animate-in zoom-in duration-300">
            {/* Header */}
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        <Globe className="text-indigo-400 w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black tracking-tighter uppercase italic text-white">LLM Nexus</h2>
                        <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Multi-Model Citadel v1.0</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowConfig(!showConfig)}
                    className="p-3 hover:bg-white/10 rounded-xl transition-colors border border-white/5"
                >
                    <Settings2 size={20} className="text-gray-400" />
                </button>
            </header>

            {/* Config Panel (Modal Style Overlay) */}
            {showConfig && (
                <div className="absolute inset-x-8 top-32 bottom-8 bg-black border border-white/10 rounded-[2rem] z-20 p-8 space-y-6 overflow-y-auto shadow-2xl">
                    <h3 className="text-sm font-black uppercase text-indigo-400 flex items-center gap-2">
                        <Plus size={16} /> Register New Intelligence
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black font-mono text-gray-500 uppercase px-1">Model Nickname</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none"
                                value={newModel.name} onChange={e => setNewModel({ ...newModel, name: e.target.value })} placeholder="e.g. DeepSeek R1"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black font-mono text-gray-500 uppercase px-1">Endpoint URL</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none"
                                value={newModel.endpoint} onChange={e => setNewModel({ ...newModel, endpoint: e.target.value })} placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black font-mono text-gray-500 uppercase px-1">API Key</label>
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none"
                                value={newModel.apiKey} onChange={e => setNewModel({ ...newModel, apiKey: e.target.value })} placeholder="sk-..."
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] font-black font-mono text-gray-500 uppercase px-1">Model ID</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-indigo-500/50 outline-none"
                                value={newModel.modelName} onChange={e => setNewModel({ ...newModel, modelName: e.target.value })} placeholder="gpt-4 / deepseek-chat"
                            />
                        </div>
                        <button
                            onClick={addModel}
                            className="w-full py-4 bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
                        >
                            Commit To Nexus
                        </button>
                    </div>
                </div>
            )}

            {/* Main Chat Interface */}
            <div className="flex-1 flex flex-col space-y-6">
                {/* Model Selector Strip */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {models.map(m => (
                        <button
                            key={m.id}
                            onClick={() => setActiveModelId(m.id)}
                            className={`px-4 py-3 rounded-2xl flex items-center gap-2 shrink-0 border transition-all ${activeModelId === m.id
                                    ? 'bg-white text-black border-white shadow-xl scale-105'
                                    : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'
                                }`}
                        >
                            <Cpu size={14} />
                            <span className="text-[10px] font-black uppercase whitespace-nowrap">{m.name}</span>
                            {activeModelId === m.id && (
                                <Trash2 size={12} className="ml-2 opacity-30 hover:opacity-100" onClick={(e) => { e.stopPropagation(); removeModel(m.id); }} />
                            )}
                        </button>
                    ))}
                    {models.length === 0 && (
                        <div className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-center text-[10px] font-mono text-gray-600 uppercase"> No Intelligence Registered</div>
                    )}
                </div>

                {/* Conversation Box */}
                <div className="flex-1 bg-white/5 border border-white/5 rounded-[2rem] p-6 overflow-y-auto space-y-4">
                    {response ? (
                        <div className="animate-in fade-in duration-500">
                            <div className="text-[10px] font-mono text-indigo-400 mb-2 uppercase opacity-50 flex items-center gap-2">
                                <Zap size={10} /> Transmission Received
                            </div>
                            <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                                {response}
                            </p>
                        </div>
                    ) : (
                        <div className="h-full flex flex-center items-center justify-center opacity-20 flex-col gap-4">
                            <Shield size={48} className="text-white" />
                            <span className="text-[9px] font-mono tracking-widest uppercase">Waiting for Command...</span>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="relative group">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type synchronization query..."
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-6 pr-20 py-5 text-xs focus:ring-1 focus:ring-white/20 outline-none min-h-[100px] resize-none transition-all placeholder:text-gray-700"
                    />
                    <button
                        onClick={callLLM}
                        disabled={loading || !activeModelId}
                        className="absolute right-3 bottom-3 p-4 bg-white text-black rounded-2xl hover:bg-indigo-400 transition-all active:scale-90 disabled:opacity-20 disabled:grayscale"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Send size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
