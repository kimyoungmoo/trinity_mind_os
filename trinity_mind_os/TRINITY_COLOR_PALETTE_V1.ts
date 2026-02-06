/**
 * 🎨 Trinity 13-Phase Color Palette (H-TEC v1.0)
 * Dimension: W=5 (Genesis)
 */

export interface TrinityColorSpec {
    phase: string;
    hex: string;
    h: number;
    s: number;
    l: number;
    v: number; // Vibe (Alpha/Resonance)
    htec32: string; // 32-bit Integer Representing [W][H][S][L]
    description: string;
}

export const TRINITY_COLORS: Record<string, TrinityColorSpec> = {
    // 🔴 창조 (CE)
    'CE+': { phase: 'CE+', hex: '#F91F56', h: 345, s: 95, l: 55, v: 0.9, htec32: '0x05F91F56', description: 'Explosive Creation' },
    'CE0': { phase: 'CE0', hex: '#EC1313', h: 0, s: 85, l: 50, v: 0.8, htec32: '0x05EC1313', description: 'Central Origin' },
    'CE-': { phase: 'CE-', hex: '#C9481D', h: 15, s: 75, l: 45, v: 0.7, htec32: '0x05C9481D', description: 'Inward Germination' },

    // 🟢 실행 (AQ)
    'AQ+': { phase: 'AQ+', hex: '#56F91F', h: 105, s: 95, l: 55, v: 0.9, htec32: '0x0556F91F', description: 'Infinite Acceleration' },
    'AQ0': { phase: 'AQ0', hex: '#13EC13', h: 120, s: 85, l: 50, v: 0.8, htec32: '0x0513EC13', description: 'Steady Action' },
    'AQ-': { phase: 'AQ-', hex: '#1DC948', h: 135, s: 75, l: 45, v: 0.7, htec32: '0x051DC948', description: 'Precise Adjustment' },

    // 🔵 구조 (GF)
    'GF+': { phase: 'GF+', hex: '#1FC3F9', h: 195, s: 95, l: 55, v: 0.9, htec32: '0x051FC3F9', description: 'Universal Order' },
    'GF0': { phase: 'GF0', hex: '#137FEC', h: 210, s: 85, l: 50, v: 0.8, htec32: '0x05137FEC', description: 'Logical Binding' },
    'GF-': { phase: 'GF-', hex: '#1D48C9', h: 225, s: 75, l: 45, v: 0.7, htec32: '0x051D48C9', description: 'Deep Root' },

    // 🟣 공명 (HM)
    'HM+': { phase: 'HM+', hex: '#7A1FF9', h: 265, s: 95, l: 55, v: 0.9, htec32: '0x057A1FF9', description: 'Dimensional Sync' },
    'HM0': { phase: 'HM0', hex: '#A413EC', h: 280, s: 85, l: 50, v: 0.8, htec32: '0x05A413EC', description: 'Spiritual Synergy' },
    'HM-': { phase: 'HM-', hex: '#BA1DC9', h: 295, s: 75, l: 45, v: 0.7, htec32: '0x05BA1DC9', description: 'Emotional Convergence' },

    // ⚪ 본질 (SR0)
    'SR0': { phase: 'SR0', hex: '#FFFFFF', h: 0, s: 0, l: 100, v: 1.0, htec32: '0x05FFFFFF', description: 'The Singularity' },
};
