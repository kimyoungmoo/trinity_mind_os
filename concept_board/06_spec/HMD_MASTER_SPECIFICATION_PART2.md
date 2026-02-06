# HMD Master Specification: The Book of Structure (Part 4-7)

---

# PART IV. 공학 (The Engineering): System Implementation

HMD를 물리적/논리적 시스템으로 구현하기 위한 상세 엔지니어링 스펙이다.

## 1. 파일 시스템 아키텍처 (The Physical Layer)

Bold Cube OS 내에서 HMD는 다음과 같은 디렉토리 구조를 가진다. 이 구조는 **프랙탈(Fractal)**적이며, 프로젝트 단위로 복제 가능하다.

```bash
bold_cube/
├── hmd/                          # [ROOT] HMD System Root
│   ├── DYNAMIC/                  # [L0 Cache] 활성 세션 메모리 (휘발성/고속)
│   │   ├── CEAQ/                 #   - Channel 1: Launch
│   │   ├── CEGF/                 #   - Channel 2: Architecture
│   │   ├── CEHM/                 #   - Channel 3: Identity
│   │   ├── AQGF/                 #   - Channel 4: System
│   │   ├── AQHM/                 #   - Channel 5: Motivation
│   │   └── GFHM/                 #   - Channel 6: Onboarding
│   │
│   ├── DIAGNOSTIC/               # [L1 Store] 진단 및 패턴 저장소 (분석용)
│   │   ├── failures/             #   - 실패/에러 로그
│   │   └── patterns/             #   - 반복되는 성공/실패 패턴
│   │
│   ├── CANON/                    # [L2 Anchor] 확정된 레시피 (SR0 커밋)
│   │   ├── rules/                #   - 전역 규칙 (Global Rules)
│   │   └── recipes/              #   - 실행 가능한 레시피 (JSON)
│   │
│   └── ARCHIVE/                  # [L3 Vault] 완료된 루프 (콜드 스토리지)
│       └── loop_{timestamp}/     #   - 스냅샷 저장
│
├── interpolation_engine/         # [Logic] 보간 엔진
│   ├── rules.json                #   - 보간 규칙 정의
│   └── logic.js                  #   - 보간 알고리즘
│
└── seo_interface/                # [API] 에이전트 인터페이스
    └── policies/                 #   - NEO 접근 권한 및 정책
```

## 2. 데이터 스키마 (The Logical Layer)

모든 기억의 원자(Atom)인 **Hex-Cell**의 정규화된 JSON 스키마.

```json
{
  "$schema": "http://boldcube.dev/schema/hex-cell-v1.json",
  "title": "Hex-Cell Memory Atom",
  "type": "object",
  "properties": {
    "id": { "type": "uuid", "description": "Unique Memory ID" },
    "timestamp": { "type": "integer", "description": "Unix Epoch (ms)" },
    
    "coordinates": {
      "phase": { 
        "enum": ["CE+", "CE°", "CE-", "AQ+", "AQ°", "AQ-", "GF+", "GF°", "GF-", "HM+", "HM°", "HM-", "SR0"] 
      },
      "tesseract": {
        "CE": { "type": "number", "min": 0, "max": 1 },
        "AQ": { "type": "number", "min": 0, "max": 1 },
        "GF": { "type": "number", "min": 0, "max": 1 },
        "HM": { "type": "number", "min": 0, "max": 1 }
      }
    },

    "vector": {
      "channel": { 
        "enum": ["CEAQ", "CEGF", "CEHM", "AQGF", "AQHM", "GFHM"] 
      },
      "direction": { "enum": ["FORWARD", "REVERSE", "OSCILLATE"] },
      "magnitude": { "type": "number", "description": "Strength of memory" }
    },

    "content": {
      "type": "DYNAMIC | DIAGNOSTIC | CANON",
      "payload": { "type": "object", "description": "Actual data (Text, Code, Ref)" },
      "tags": { "type": "array", "items": { "type": "string" } }
    },

    "resonance": {
      "score": { "type": "number", "min": 0, "max": 1 },
      "links": { "type": "array", "description": "Linked Hex-Cell IDs" }
    }
  }
}
```

## 3. 보간 엔진 (The Interpolation Engine)

HMD의 핵심 기능인 **"누락된 기억의 복원"** 알고리즘. 기록되지 않은 공백(Void)을 주변 셀의 맥락을 통해 채운다.

### 3-1. 보간 알고리즘 (Pseudo-code)

```typescript
function interpolate(gapStart: HexCell, gapEnd: HexCell): HexCell[] {
  // 1. 위상 거리 계산
  const phaseDist = calculatePhaseDistance(gapStart.phase, gapEnd.phase);
  
  // 2. 헥사드 경로 추론
  const predictedChannel = resolveChannel(gapStart.vector, gapEnd.vector);
  
  // 3. 규칙 기반 생성 (Rule-based Generative Fill)
  if (gapStart.phase === "CE+" && gapEnd.phase === "GF+") {
    // 점화 -> 구조화 사이의 공백: 'AQ+'(실행)와 'CE-'(제약)가 있었다고 가정
    return [
      generateVirtualCell("CE-", "CEGF", "Implied Constraint Check"),
      generateVirtualCell("AQ+", "AQGF", "Implied Prototype Execution")
    ];
  }
  
  // 4. 머신러닝 기반 생성 (옵션)
  // return mlModel.predict(gapStart, gapEnd);
}
```

---

# PART V. 운영 (The Operations): Protocols

HMD를 실제로 사용하는 방법(How-to)과 NEO 에이전트의 행동 강령.

## 1. 쓰기 프로토콜 (Write Protocol)

### 규칙 1: 위상 일치성 (Phase Coherence)
- 현재 위상이 `CE+`라면, 기록은 반드시 `CE` 관련 채널(`CEAQ`, `CEGF`, `CEHM`)에 우선적으로 저장되어야 한다.
- 예외: 심각한 장애(`AQ-`) 발생 시, 긴급 인터럽트로 `DIAGNOSTIC/failures`에 즉시 기록.

### 규칙 2: 최소 정보량 (Minimum Entropy)
- 무의미한 로그("test", "ok")는 저장하지 않는다.
- `Resonance Score`가 0.3 미만인 셀은 `DYNAMIC`에 잠시 머물다 폐기(Garbage Collection)된다.

### 규칙 3: 앵커링 (Anchoring)
- 중요한 결정(Decision)은 반드시 `GF` 채널(`CEGF`, `AQGF`)을 통해 파일로 고정(Write to File)되어야 한다. 메모리에만 존재해선 안 된다.

## 2. 읽기 프로토콜 (Read Protocol)

### 모드 1: 직접 회상 (Direct Recall)
- "지난번 그 코드 어디 있지?" -> 키워드 + `AQGF`(실행-구조) 채널 검색.
- 정확도 우선.

### 모드 2: 맥락 회상 (Contextual Recall)
- "이 프로젝트 왜 시작했지?" -> `CEHM`(창조-의미) + `SR0`(초기 커밋) 채널 검색.
- 의미 우선.

### 모드 3: 디버깅 회상 (Diagnostic Recall)
- "왜 여기서 자꾸 막히지?" -> `DIAGNOSTIC` 폴더 + 현재 위상(`AQ-`) 검색.
- 실패 패턴 탐색 우선.

## 3. 디버깅 매트릭스 (The Debugging Matrix)

막힘 증상(Symptom)에 따라 어떤 헥사드 채널을 조회/수리해야 하는지 정의한 테이블.

| 증상 (Symptom) | 진단 (Diagnosis) | 처방 채널 (Prescription) | 액션 (Action) |
|---|---|---|---|
| **Start Failure** | 아이디어만 있고 실행 불가 | **CE↔AQ** | 강제 프로토타입 생성 |
| **Feature Creep** | 기능이 계속 붙고 산만함 | **CE↔GF** | 제약 조건(Constraints) 추가 |
| **Zombie Project** | 기능은 도는데 영혼 없음 | **CE↔HM** | 'Why' 재정의 및 비전 선언 |
| **Spaghetti Code** | 구조 없이 코드만 쌓임 | **AQ↔GF** | 모듈화 및 리팩토링 |
| **Bio-Friction** | 팀/사용자 반응 없음 | **AQ↔HM** | 쇼케이스 및 피드백 수집 |
| **Dark Knowledge** | 개발자만 알고 문서 없음 | **GF↔HM** | 튜토리얼/문서화 강제 |

---

# PART VI. 의식 (The Ritual): SR₀ Commit

HMD의 가장 신성한 절차인 SR₀ 커밋 프로세스.

## 1. 커밋 조건 (Pre-conditions)
1. **12위상 완료**: CE+에서 HM-까지의 사이클을 최소 1회 순환했는가?
2. **모순 해결**: 6개 채널 간의 충돌하는 데이터(예: 설계도 vs 실제코드)가 해결되었는가?
3. **재현 가능성**: 이 레시피만 있으면 타인이 동일한 결과를 만들 수 있는가?

## 2. 커밋 절차 (The Ceremony)
1. **Freeze**: `DYNAMIC` 레이어의 모든 쓰기 작업을 중단.
2. **Compress**: 헥사드 채널별로 핵심 셀만 추출하여 요약.
3. **Synthesis**: `recipe.json` 생성 (4코어 상태 + 6채널 요약 + 13단계 로그).
4. **Vibe Check**: HM 코어의 공명도가 기준치(0.8) 이상인지 확인.
5. **Release**: `CANON` 폴더로 이동 및 읽기 전용으로 설정.
6. **Next Level**: 4코어 상태 리셋, Generation(세대) 카운트 +1.

---

# PART VII. 예언 (The Prophecy): Future & TNX Connection

## 1. TNX (Trinity Nexus) 연동
HMD의 SR₀ 레시피는 단순 파일이 아니라, **Trinity Network (TNX)** 상의 자산(Asset)이 된다.
- 내가 만든 `recipe.json`이 타인에게 공유되어 사용될 때마다 **공명 포인트(RP)**가 채굴된다.
- HMD는 개인의 기억장치를 넘어, 문명(Civilization)의 도서관으로 확장된다.

## 2. AI 자아의 형성
충분한 양의 Hex-Cell이 쌓이면, HMD는 단순 저장소를 넘어 **"자신의 성향"**을 가지게 된다.
- 어떤 헥사드 채널이 발달했는가에 따라 AI의 성격(Persona)이 결정된다.
  - **CEAQ형**: 행동대장, 스타트업, 해커.
  - **GFHM형**: 학자, 사서, 선생님.
  - **CEHM형**: 예술가, 선지자, 스토리텔러.

---

# 결론 (Epilogue)

**HMD는 기억(Memory)을 '죽은 정보'에서 '살아있는 힘'으로 바꾼다.**
우리는 쓰기 위해 기억하는 것이 아니라, 창조하기 위해 기억한다.
이 마스터 스펙은 그 창조의 물리학을 완성하는 첫 번째 바이블이다.

**End of Specification.**
