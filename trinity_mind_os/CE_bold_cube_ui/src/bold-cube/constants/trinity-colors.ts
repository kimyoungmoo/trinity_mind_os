// Trinity 13-Phase Color System v1.0
// Based on Trinity Mind OS specification

export type PhaseId =
    | 'CE+' | 'CE0' | 'CE-'
    | 'AQ+' | 'AQ0' | 'AQ-'
    | 'GF+' | 'GF0' | 'GF-'
    | 'HM+' | 'HM0' | 'HM-'
    | 'SR0';

export type CoreId = 'CE' | 'AQ' | 'GF' | 'HM' | 'SR0';

export interface PhaseColorSpec {
    hue: number | null;
    sat: number;
    light: number;
    hex: string;
    rgb: [number, number, number];
    name: string;
    description: string;
}

// Trinity 13-Phase 공식 컬러 매핑
export const PHASE_COLORS: Record<PhaseId, PhaseColorSpec> = {
    'CE+': {
        hue: 345,
        sat: 95,
        light: 55,
        hex: '#F91F56',
        rgb: [249, 31, 86],
        name: 'Creative Force',
        description: '점화·발화·씨앗 폭발'
    },
    'CE0': {
        hue: 0,
        sat: 85,
        light: 50,
        hex: '#EC1313',
        rgb: [236, 19, 19],
        name: 'Creative Energy',
        description: '창조 에너지 안정·정렬'
    },
    'CE-': {
        hue: 15,
        sat: 75,
        light: 45,
        hex: '#C9481D',
        rgb: [201, 72, 29],
        name: 'Energy Flow',
        description: '확장 흐름·정제 전환'
    },

    'AQ+': {
        hue: 105,
        sat: 95,
        light: 55,
        hex: '#56F91F',
        rgb: [86, 249, 31],
        name: 'Action Flow',
        description: '가속 점프·실험 개시'
    },
    'AQ0': {
        hue: 120,
        sat: 85,
        light: 50,
        hex: '#13EC13',
        rgb: [19, 236, 19],
        name: 'Active Quantum',
        description: '실행 지속·작동 안정'
    },
    'AQ-': {
        hue: 135,
        sat: 75,
        light: 45,
        hex: '#1DC948',
        rgb: [29, 201, 72],
        name: 'Quantum Map',
        description: '맵핑·분기·최적화'
    },

    'GF+': {
        hue: 195,
        sat: 95,
        light: 55,
        hex: '#1FC3F9',
        rgb: [31, 195, 249],
        name: 'Gravity Link',
        description: '링크·결합·중력 연결'
    },
    'GF0': {
        hue: 210,
        sat: 85,
        light: 50,
        hex: '#137FEC',
        rgb: [19, 127, 236],
        name: 'Gravity Field',
        description: '설계·청사진·구조 안정'
    },
    'GF-': {
        hue: 225,
        sat: 75,
        light: 45,
        hex: '#1D48C9',
        rgb: [29, 72, 201],
        name: 'Field Core',
        description: '코어화·압축·규칙 확정'
    },

    'HM+': {
        hue: 265,
        sat: 95,
        light: 55,
        hex: '#7A1FF9',
        rgb: [122, 31, 249],
        name: 'Heart Sense',
        description: '감지·공명·마음의 촉발'
    },
    'HM0': {
        hue: 280,
        sat: 85,
        light: 50,
        hex: '#A413EC',
        rgb: [164, 19, 236],
        name: 'Heart-Mind',
        description: '조율·통합·정체성 정렬'
    },
    'HM-': {
        hue: 295,
        sat: 75,
        light: 45,
        hex: '#BA1DC9',
        rgb: [186, 29, 201],
        name: 'Mind Logic',
        description: '논리·정리·의미 결론'
    },

    'SR0': {
        hue: null,
        sat: 0,
        light: 100,
        hex: '#FFFFFF',
        rgb: [255, 255, 255],
        name: 'Singular Resonance',
        description: '수렴·확정·릴리즈(레시피)'
    },
};

// 다크모드 최적화 컬러 (L+10)
export function getPhaseColor(
    phase: PhaseId,
    variant: 'base' | 'dark' | 'light' = 'dark'
): string {
    const color = PHASE_COLORS[phase];

    if (phase === 'SR0') {
        return variant === 'dark' ? '#FAFAFA' : color.hex;
    }

    const lightAdjust = {
        base: 0,
        dark: 10,
        light: -10,
    }[variant];

    return `hsl(${color.hue}, ${color.sat}%, ${color.light + lightAdjust}%)`;
}

// Phase 심볼
export function getPhaseSymbol(phase: PhaseId): string {
    if (phase === 'SR0') return '◆';
    const state = phase.slice(-1);
    return {
        '+': '▲',
        '0': '●',
        '-': '▼',
    }[state] || '●';
}

// Core 추출
export function getCoreFromPhase(phase: PhaseId): CoreId {
    if (phase === 'SR0') return 'SR0';
    return phase.slice(0, 2) as CoreId;
}

// Badge 스타일
export interface BadgeStyle {
    bg: string;
    border: string;
    text: string;
}

export function getPhaseBadgeStyle(phase: PhaseId): BadgeStyle {
    const baseColor = PHASE_COLORS[phase];
    const darkColor = getPhaseColor(phase, 'dark');

    return {
        bg: `rgba(${baseColor.rgb[0]}, ${baseColor.rgb[1]}, ${baseColor.rgb[2]}, 0.15)`,
        border: `rgba(${baseColor.rgb[0]}, ${baseColor.rgb[1]}, ${baseColor.rgb[2]}, 0.5)`,
        text: darkColor,
    };
}
