
export interface LandingStep {
  level: string;
  title: string;
  benefit: string;
  description: string;
}

export const LANDING_STEPS: Record<string, LandingStep> = {
  hero: {
    level: "01",
    title: "The Self",
    benefit: "사유하는 자아의 정립",
    description: "순수한 사유: 두껍고 명료한 선으로 정의된 당신의 사고 본체",
  },
  origin: {
    level: "02",
    title: "The Seed",
    benefit: "영감의 첫 번째 점",
    description: "사고의 기원: 묵직한 점으로부터 시작되는 논리적 파동",
  },
  expansion: {
    level: "03",
    title: "Growth",
    benefit: "사고의 유기적 확장",
    description: "무한한 확장: 체계적으로 뻗어나가는 생각의 레이어",
  },
  depth: {
    level: "04",
    title: "Structure",
    benefit: "논리적 계층의 구축",
    description: "계층적 논리: 듬직하게 쌓인 사고의 단단한 구조",
  },
  resonance: {
    level: "05",
    title: "Vibration",
    benefit: "본질과의 공명",
    description: "본질의 공명: 반짝이는 영감과 통찰의 순간",
  },
  simplicity: {
    level: "06",
    title: "Clarity",
    benefit: "군더더기 없는 명료함",
    description: "시각적 선: 가장 단순하고 명확한 존재의 증명",
  },
  velocity: {
    level: "07",
    title: "Inspiration",
    benefit: "순간을 포착하는 속도",
    description: "사고의 속도: 빠르게 질주하며 포착하는 아이디어",
  },
  convergence: {
    level: "08",
    title: "Synthesis",
    benefit: "파편화된 정보의 통합",
    description: "사고의 통합: 하나로 응집되는 정보의 시너지",
  },
  connection: {
    level: "09",
    title: "The Bridge",
    benefit: "아이디어 간의 관계 형성",
    description: "연결성: 아이디어와 아이디어를 잇는 강력한 논리적 가교",
  },
  archive: {
    level: "10",
    title: "Permanence",
    benefit: "영원히 기록되는 지식",
    description: "기록의 보관: 소중한 통찰을 안전하게 지켜주는 시스템",
  },
  insight: {
    level: "11",
    title: "Illumination",
    benefit: "내면에서 깨어나는 지혜",
    description: "통찰의 빛: 사고의 심부에서 깨어나는 새로운 지각",
  },
  balance: {
    level: "12",
    title: "Equilibrium",
    benefit: "이성과 감성의 균형",
    description: "균형의 감각: 서로를 완벽하게 지탱하는 논리적 평형",
  },
  journey: {
    level: "13",
    title: "Infinity",
    benefit: "끝없는 지적 성장",
    description: "사유의 여정: 끝없이 이어지는 성장의 무한한 경로",
  }
};

export const LANDING_IMAGE_PROMPTS = LANDING_STEPS;
