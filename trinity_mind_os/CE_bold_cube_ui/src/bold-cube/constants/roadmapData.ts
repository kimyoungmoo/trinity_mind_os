
import { v4 as uuidv4 } from 'uuid';
import { Cube } from '../types';

export const generateRoadmapData = (rootParentId: string | null = null): Record<string, Cube> => {
  const now = Date.now();
  const map: Record<string, Cube> = {};

  // Helper to create cube
  const create = (title: string, content: string, color: any, parentId: string | null): string => {
    const id = uuidv4();
    map[id] = { id, title, content, color, parentId, createdAt: now };
    return id;
  };

  // 1. Root: Project Overview
  const rootId = create(
    "BOLD CUBE Roadmap", 
    "볼드 큐브(BOLD CUBE) 프로젝트의 개발 현황과 향후 계획을 시각화한 로드맵입니다.\n\nCore Value:\n- Expand: AI를 통한 사고 확장\n- Essence: 본질 추출\n- Visualize: Bold Monotone 시각화", 
    "monotone", 
    rootParentId
  );

  // 2. Completed Features (Emerald)
  const completedId = create(
    "✅ Completed Features (v3.1)", 
    "현재까지 개발 완료된 핵심 기능들입니다.", 
    "emerald", 
    rootId
  );

    const coreAppId = create(
      "Core Application", 
      "기본적인 노트 테이킹 및 앱 구조 구현 완료.\n- Hierarchical Structure (무한 큐브)\n- CRUD Operations\n- Local Persistence (저장소)\n- Search & Filter", 
      "emerald", 
      completedId
    );
    
    const aiIntegrationId = create(
      "AI Integration (Gemini)", 
      "Google Gemini API 연동 완료.\n- Sub-cube Generation (3 Modes)\n- Note Elaboration (상세화)\n- Essence Resonance (본질 추출)", 
      "emerald", 
      completedId
    );

    const landingId = create(
      "Landing Experience", 
      "13단계 진화 로드맵 및 시각적 경험 구현.\n- 13-Step Evolution Storytelling\n- Generative Art (Bold Monotone)\n- Image Caching & Optimization", 
      "emerald", 
      completedId
    );

  // 3. Active Tasks (Amber)
  const activeId = create(
    "🚧 Active Tasks", 
    "현재 우선순위로 진행 중인 작업 목록입니다.", 
    "amber", 
    rootId
  );

    create(
      "Data Export/Import", 
      "로컬 스토리지 데이터를 JSON 파일로 백업하고 복원하는 기능 개발.", 
      "amber", 
      activeId
    );
    
    create(
      "Performance Optimization", 
      "데이터 증가에 따른 렌더링 최적화 (Virtualization, Memoization).", 
      "amber", 
      activeId
    );

    create(
      "Mobile Touch UX", 
      "모바일 환경에서의 스와이프 제스처 및 터치 인터랙션 개선.", 
      "amber", 
      activeId
    );

  // 4. Backlog (Purple)
  const backlogId = create(
    "🔮 Future Backlog", 
    "향후 업데이트 예정인 장기 과제들입니다.", 
    "purple", 
    rootId
  );

    create(
      "Visual Graph View", 
      "큐브 간의 연결 관계를 2D/3D 노드 그래프로 시각화하는 모드.", 
      "purple", 
      backlogId
    );

    create(
      "Multi-modal Input", 
      "텍스트 외에 이미지, 음성 메모를 큐브에 직접 첨부하는 기능.", 
      "purple", 
      backlogId
    );

    create(
      "Cloud Sync & Auth", 
      "Firebase/Supabase 연동을 통한 기기 간 데이터 동기화.", 
      "purple", 
      backlogId
    );

  // 5. Design & Prompts (Rose)
  const designId = create(
    "🎨 Design & Guidelines", 
    "프로젝트의 디자인 철학 및 프롬프트 엔지니어링 가이드입니다.", 
    "rose", 
    rootId
  );

    create(
      "Aesthetics", 
      "Tone: Professional, Minimal, 'Bold & Chunky'\nColor: Black (#000000), Off-black (#101010)", 
      "rose", 
      designId
    );

    create(
      "Prompt Engineering", 
      "Image Style: 'Masterpiece minimalist vector line art...'\nAI Persona: CE(확산), AQ(실행), GF(구조)", 
      "rose", 
      designId
    );

  return map;
};
