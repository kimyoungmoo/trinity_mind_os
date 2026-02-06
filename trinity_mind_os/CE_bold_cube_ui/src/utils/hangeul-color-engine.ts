
/**
 * 🇰🇷 Hangeul-Color Resonance Mapping (H-CRM)
 * Part of Trinity Mind OS v1.2.5 (Unified Field Theory)
 * Incorporating Sonic Alchemy & Narrative Logic
 */

// Added .js extension for node16 module resolution
import { TRINITY_COLORS, TrinityColorSpec } from '../trinity_mind_os/TRINITY_COLOR_PALETTE_V1.js';

// 1. Choseong (Initial) -> OSC.1 Waveform & X-Axis Phase
export const CHOSEONG_DATA: Record<string, { phase: number, waveform: 'sine' | 'saw' | 'square' }> = {
    'ㄱ': { phase: 15, waveform: 'square' },
    'ㄲ': { phase: 20, waveform: 'square' },
    'ㄴ': { phase: 105, waveform: 'sine' },
    'ㄷ': { phase: 145, waveform: 'square' },
    'ㄸ': { phase: 150, waveform: 'square' },
    'ㄹ': { phase: 125, waveform: 'sine' },
    'ㅁ': { phase: 195, waveform: 'sine' },
    'ㅂ': { phase: 215, waveform: 'square' },
    'ㅃ': { phase: 220, waveform: 'square' },
    'ㅅ': { phase: 285, waveform: 'saw' },
    'ㅆ': { phase: 295, waveform: 'saw' },
    'ㅇ': { phase: 55, waveform: 'sine' },
    'ㅈ': { phase: 305, waveform: 'saw' },
    'ㅉ': { phase: 315, waveform: 'saw' },
    'ㅊ': { phase: 325, waveform: 'saw' },
    'ㅋ': { phase: 30, waveform: 'square' },
    'ㅌ': { phase: 160, waveform: 'square' },
    'ㅍ': { phase: 235, waveform: 'square' },
    'ㅎ': { phase: 35, waveform: 'sine' }
};

// 2. Jungseong (Medial) -> VCF.2 Timbre
export const JUNGSEONG_TIMBRE: Record<string, 'bright' | 'deep' | 'complex'> = {
    'ㅏ': 'bright', 'ㅐ': 'bright', 'ㅣ': 'bright',
    'ㅓ': 'deep', 'ㅜ': 'deep', 'ㅠ': 'deep',
    'ㅗ': 'complex', 'ㅡ': 'complex', 'ㅕ': 'complex',
    // Defaulting others
    'ㅑ': 'bright', 'ㅒ': 'bright', 'ㅔ': 'deep', 'ㅖ': 'deep', 'ㅛ': 'complex'
};

// 3. Jongseong (Final) -> ENV.3 ADSR & Z-Axis Depth
export const JONGSEONG_DATA: Record<string, { luminance: number, adsr: 'long' | 'sustain' | 'short' }> = {
    '': { luminance: 0.95, adsr: 'long' },
    'ㅇ': { luminance: 0.80, adsr: 'sustain' },
    'ㄴ': { luminance: 0.65, adsr: 'sustain' },
    'ㄹ': { luminance: 0.65, adsr: 'sustain' },
    'ㅁ': { luminance: 0.65, adsr: 'sustain' },
    'ㅅ': { luminance: 0.45, adsr: 'sustain' },
    'ㅈ': { luminance: 0.45, adsr: 'sustain' },
    'ㅊ': { luminance: 0.45, adsr: 'sustain' },
    'ㄱ': { luminance: 0.25, adsr: 'short' },
    'ㄷ': { luminance: 0.25, adsr: 'short' },
    'ㅂ': { luminance: 0.25, adsr: 'short' },
    'ㅎ': { luminance: 0.90, adsr: 'long' }
};

export interface SonicSpec extends TrinityColorSpec {
    waveform: 'sine' | 'saw' | 'square';
    timbre: 'bright' | 'deep' | 'complex';
    adsr: 'long' | 'sustain' | 'short';
}

/**
 * Resolver: Convert a single Hangeul character to a Sonic Color Spec v1.2.5
 */
export const resolveHangeulColor = (char: string): SonicSpec => {
    const HANGUL_BASE = 0xac00;
    const unicode = char.charCodeAt(0);

    const defaultSpec: SonicSpec = {
        phase: '', hex: '#fff', h: 0, s: 0, l: 100, v: 1.0, htec32: '0x0', description: '',
        waveform: 'sine', timbre: 'bright', adsr: 'long'
    };

    if (unicode < HANGUL_BASE || unicode > 0xd7a3) return defaultSpec;

    const offset = unicode - HANGUL_BASE;
    const choseongIdx = Math.floor(offset / 588);
    const jungseongIdx = Math.floor((offset % 588) / 28);
    const jongseongIdx = offset % 28;

    const CHOSEONG_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const JUNGSEONG_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const JONGSEONG_LIST = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const cho = CHOSEONG_LIST[choseongIdx];
    const jung = JUNGSEONG_LIST[jungseongIdx];
    const jong = JONGSEONG_LIST[jongseongIdx] || '';

    const cData = CHOSEONG_DATA[cho] || { phase: 0, waveform: 'sine' };
    const jTimbre = JUNGSEONG_TIMBRE[jung] || 'bright';
    const joData = JONGSEONG_DATA[jong] || { luminance: 0.95, adsr: 'long' };

    return {
        phase: cho,
        hex: '#fff',
        h: cData.phase,
        s: 80,
        l: joData.luminance * 100,
        v: 1.0,
        htec32: '0x' + unicode.toString(16),
        description: `Resonant ${cho}-${jung}-${jong}`,
        waveform: cData.waveform,
        timbre: jTimbre,
        adsr: joData.adsr
    };
};

/**
 * Calculate Narrative Trajectory Pattern
 */
export const calculateNarrativePattern = (specs: SonicSpec[]) => {
    if (specs.length < 2) return 'Stable';

    const lightnessValues = specs.map(s => s.l);
    const diff = lightnessValues[lightnessValues.length - 1] - lightnessValues[0];

    if (diff > 20) return 'Ascending';    // Heavy -> Light (Freedom)
    if (diff < -20) return 'Grounding';  // Light -> Heavy (Manifestation)

    // Checking for arch
    const middle = lightnessValues[Math.floor(lightnessValues.length / 2)];
    if (middle > lightnessValues[0] && middle > lightnessValues[lightnessValues.length - 1]) return 'Returning';

    return 'Steady';
};
