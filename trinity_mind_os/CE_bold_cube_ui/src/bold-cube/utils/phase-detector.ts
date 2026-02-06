import { PhaseId } from '../constants/trinity-colors';

// AI 없이 키워드 기반으로 Phase 감지
export function detectPhase(content: string, title: string): PhaseId {
    const text = `${title} ${content}`.toLowerCase();

    // SR0 감지 (본질/완료/릴리즈)
    if (
        text.includes('본질') ||
        text.includes('완료') ||
        text.includes('릴리즈') ||
        text.includes('결론') ||
        text.includes('최종')
    ) {
        return 'SR0';
    }

    // CE 감지 (창조/아이디어)
    if (
        text.includes('아이디어') ||
        text.includes('영감') ||
        text.includes('창조') ||
        text.includes('새로운')
    ) {
        if (text.includes('폭발') || text.includes('점화')) return 'CE+';
        if (text.includes('흐름') || text.includes('확장')) return 'CE-';
        return 'CE0';
    }

    // AQ 감지 (실행/행동)
    if (
        text.includes('실행') ||
        text.includes('행동') ||
        text.includes('작업') ||
        text.includes('진행')
    ) {
        if (text.includes('시작') || text.includes('가속')) return 'AQ+';
        if (text.includes('최적화') || text.includes('맵핑')) return 'AQ-';
        return 'AQ0';
    }

    // GF 감지 (구조/설계)
    if (
        text.includes('구조') ||
        text.includes('설계') ||
        text.includes('연결') ||
        text.includes('시스템')
    ) {
        if (text.includes('링크') || text.includes('연결')) return 'GF+';
        if (text.includes('코어') || text.includes('확정')) return 'GF-';
        return 'GF0';
    }

    // HM 감지 (감정/의미)
    if (
        text.includes('감정') ||
        text.includes('의미') ||
        text.includes('공감') ||
        text.includes('마음')
    ) {
        if (text.includes('공명') || text.includes('직감')) return 'HM+';
        if (text.includes('논리') || text.includes('정리')) return 'HM-';
        return 'HM0';
    }

    // 기본값: CE0 (창조 에너지)
    return 'CE0';
}

// Phase에서 색상 추천
export function getColorFromPhase(phase: PhaseId): string {
    const phaseToColor: Record<PhaseId, string> = {
        'CE+': 'rose',
        'CE0': 'rose',
        'CE-': 'amber',
        'AQ+': 'emerald',
        'AQ0': 'emerald',
        'AQ-': 'emerald',
        'GF+': 'blue',
        'GF0': 'blue',
        'GF-': 'indigo',
        'HM+': 'purple',
        'HM0': 'purple',
        'HM-': 'purple',
        'SR0': 'indigo',
    };

    return phaseToColor[phase];
}
