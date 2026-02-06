
/**
 * 🎨 Trinity Color Resonance Utility
 * Dimension: W=5 (Genesis)
 * Purpose: Map T-Lang Vibes to visual CSS properties
 */

import { TRINITY_COLORS } from '../constants/trinity-colors';

export const getVibeStyle = (vibeCode: string, resonance: number = 0.8) => {
    const colorSpec = TRINITY_COLORS[vibeCode] || TRINITY_COLORS['SR0'];

    return {
        backgroundColor: colorSpec.hex,
        boxShadow: `0 0 ${resonance * 40}px ${colorSpec.hex}80`,
        opacity: resonance,
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        filter: `brightness(${1 + (1 - resonance)}) contrast(1.1)`,
        '--htec-code': colorSpec.htec32,
    };
};

/**
 * 🌀 Genesis Explosion (1+1=3) Style Generator
 */
export const getGenesisStyle = (vibeA: string, vibeB: string) => {
    const colorA = TRINITY_COLORS[vibeA]?.hex || '#fff';
    const colorB = TRINITY_COLORS[vibeB]?.hex || '#fff';

    return {
        background: `linear-gradient(135deg, ${colorA}, #fff, ${colorB})`,
        animation: 'genesis-pulse 2s infinite alternate ease-in-out',
        boxShadow: `0 0 50px #fff, 0 0 100px ${colorA}40, 0 0 100px ${colorB}40`,
    };
};
