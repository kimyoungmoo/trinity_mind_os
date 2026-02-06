
export type PhaseId =
  | 'CE+' | 'CE0' | 'CE-'
  | 'AQ+' | 'AQ0' | 'AQ-'
  | 'GF+' | 'GF0' | 'GF-'
  | 'HM+' | 'HM0' | 'HM-'
  | 'SR0';

export type CoreId = 'CE' | 'AQ' | 'GF' | 'HM' | 'SR0';
export interface GoldenChainLink {
  hangeul: string;
  code: string;
  color: string;
  number: number;
  wave: string;
  resonance: number;
  tnxId?: string;
  snapshotUrl?: string;
}

export interface Cube {
  id: string;
  title: string;
  content: string;
  parentId: string | null;
  color: CubeColor;
  createdAt: number;
  isAiGenerated?: boolean;
  isResonated?: boolean;
  essence?: string;
  // Trinity Phase 메타데이터
  phase?: PhaseId;
  core?: CoreId;
  goldenChain?: GoldenChainLink;
}

export type CubeColor = 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'monotone';

export const CUBE_COLORS: CubeColor[] = ['blue', 'purple', 'emerald', 'amber', 'rose', 'indigo'];

export interface CubeGeneratedItem {
  title: string;
  description: string;
  suggestedColor: CubeColor; // AI가 제안하는 색상
}

export type AiNature = 'CE' | 'AQ' | 'GF' | 'SR0';

export interface AiGenConfig {
  count: number;
  nature: AiNature;
  customInstruction?: string;
}
