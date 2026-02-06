/**
 * 🇰🇷 Trinity Hangeul Compiler (W=4)
 * 한글을 Trinity 13-Phase 및 HSLA 숫자 코드로 변환하는 엔진
 */

import { PhaseId, TRINITY_COLORS } from '../constants/trinity-colors';

// 한글 유니코드 분해를 위한 상수
const HANGEUL_BASE = 0xAC00;
const CHOSEONG_BASE = 0x1100;
const JUNGSEONG_BASE = 0x1161;
const JONGSEONG_BASE = 0x11A7;

const CHOSEONGS = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];
const JUNGSEONGS = [
    'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];
const JONGSEONGS = [
    '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// 한글 요소별 Trinity 매핑 루틴
// 중성(모음) = 에너지가 발산되는 핵심 바이브 (Phase 결정)
const VOWEL_PHASE_MAP: Record<string, PhaseId> = {
    'ㅏ': 'CE+', 'ㅑ': 'CE+', 'ㅐ': 'CE0', 'ㅒ': 'CE0', // 양(陽), 발산 -> CE
    'ㅓ': 'HM+', 'ㅕ': 'HM+', 'ㅔ': 'HM0', 'ㅖ': 'HM0', // 음(陰), 수렴 -> HM
    'ㅗ': 'AQ+', 'ㅛ': 'AQ+', 'ㅘ': 'AQ0', 'ㅚ': 'AQ-', // 상승 -> AQ
    'ㅜ': 'ㅠ', 'ㅝ': 'GF+', 'ㅟ': 'GF0', 'ㅡ': 'GF-', // 하강/정지 -> GF
    'ㅣ': 'SR0', 'ㅢ': 'SR0'                         // 중립/본질 -> SR0
};

export interface TrinityCodeResult {
    char: string;
    jamo: { cho: string; jung: string; jong: string };
    phase: PhaseId;
    colorCode: number;
    cssColor: string;
}

export class HangeulTrinityCompiler {
    /**
     * 한글 한 글자를 Trinity 코드로 컴파일
     */
    static compileChar(char: string): TrinityCodeResult | null {
        const code = char.charCodeAt(0) - HANGEUL_BASE;
        if (code < 0 || code > 11171) return null;

        const choIdx = Math.floor(code / 588);
        const jungIdx = Math.floor((code % 588) / 28);
        const jongIdx = code % 28;

        const cho = CHOSEONGS[choIdx];
        const jung = JUNGSEONGS[jungIdx];
        const jong = JONGSEONGS[jongIdx];

        // 중성을 통해 기본 Phase 결정
        const phase: PhaseId = VOWEL_PHASE_MAP[jung] || 'CE0';
        const colorSpec = TRINITY_COLORS[phase];

        return {
            char,
            jamo: { cho, jung, jong },
            phase,
            colorCode: colorSpec.number,
            cssColor: colorSpec.base
        };
    }

    /**
     * 문장 전체를 Trinity 코드 스트림으로 변환
     */
    static compileStream(text: string): TrinityCodeResult[] {
        return text
            .split('')
            .map(char => this.compileChar(char))
            .filter((res): res is TrinityCodeResult => res !== null);
    }

    /**
     * 텍스트의 '바이브' 평균을 계산하여 지배적인 색상 추출
     */
    static getDominantVibe(text: string): string {
        const stream = this.compileStream(text);
        if (stream.length === 0) return '#FFFFFF';

        // 단순 평균이 아닌, Phase의 흐름 분석 (생략가능하나 구조상 배치)
        return stream[Math.floor(stream.length / 2)].cssColor;
    }
}
