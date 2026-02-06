# HMD (Hexad Memory Device) Master Specification: The Book of Structure
> **Version**: 1.0.0 (Grand Canon)
> **Date**: 2026-02-06
> **Language**: Trinity Specification (Korean/English Mix)
> **Authored By**: ROO & ANTIGRAVITY

---

# 서문 (Preamble): 기억의 물리학
이 문서는 **Hexad Memory Device (HMD)**의 모든 작동 원리, 수학적 기반, 시스템 아키텍처, 그리고 운영 프로토콜을 총망라한 마스터 스펙(Master Specification)이다.
우리는 기억을 단순한 정보의 저장이 아닌, **"4차원 상태 공간에서의 벡터 전이(Vector Transition)"**로 재정의한다. 이 문서는 그 정의를 실제 동작하는 시스템으로 구현하기 위한 물리 법칙이자 헌법이다.

---

# PART I. 공리 (The Axioms)

## 1. 존재의 공리 (Axiom of Existence)
모든 창조적 행위 ${\mathcal{A}}$는 4차원 테서렉트 상태 공간 ${\mathbb{T}}$ 내의 좌표 이동으로 표현된다.
$$ \forall \mathcal{A} \in \text{Project}, \quad \text{State}(\mathcal{A}) = \mathbf{S} \in \mathbb{R}^4 $$
$$ \mathbf{S} = \langle CE, AQ, GF, HM \rangle $$
여기서 각 축은 0에서 1 사이의 강도(Intensity)를 가진다.

## 2. 변화의 공리 (Axiom of Change)
상태 $\mathbf{S}$는 정지해 있지 않으며, 시간의 흐름(위상 $\phi$)에 따라 끊임없이 변화한다. 이 변화는 **전이 벡터(Transition Vector)** $\Delta \mathbf{S}$로 정의된다.
$$ \Delta \mathbf{S}(t) = \mathbf{S}(t+1) - \mathbf{S}(t) $$
기억(Memory)이란 상태 $\mathbf{S}(t)$가 아니라, 변화 $\Delta \mathbf{S}(t)$를 기록하는 행위다.

## 3. 결합의 공리 (Axiom of Coupling)
변화는 단독으로 일어나지 않으며, 반드시 두 개 이상의 코어가 상호작용하여 발생한다. 4개의 코어 중 2개를 선택하는 조합 $C(4,2)$에 의해 **6개의 결합면(Coupling Plane)**이 생성된다.
$$ \mathbb{H} = \{ \pi_{ij} \mid i,j \in \{CE, AQ, GF, HM\}, i \neq j \} $$
$$ |\mathbb{H}| = 6 $$
모든 전이 벡터 $\Delta \mathbf{S}$는 이 6개의 평면 중 하나 이상에 투영(Projection)될 수 있다.

## 4. 보존의 공리 (Axiom of Conservation)
시스템이 SR₀(특이점)를 통과하여 한 번의 루프(Cycle)를 완료했을 때, 시스템의 엔트로피는 감소하고 정보량(Recipe)은 보존되어야 한다. 이를 **0점 조정(Zero Point Adjustment)**이라 한다.
$$ \oint_{Loop} d\text{Entropy} < 0, \quad \oint_{Loop} d\text{Info} > 0 $$

---

# PART II. 해부학 (The Anatomy): 4D & 6-Planes

## 1. 테서렉트 4코어: 상태의 원자 (The Atoms of State)

### 1-1. CE (Creative Energy): 점화의 축
- **기호**: $\nabla$ (Divergence)
- **수학적 정의**: $CE = \lim_{\Delta t \to 0} \frac{d(Intent)}{dt}$
- **물리적 성질**: 폭발적이지만 휘발성이 강함. 방향성이 없으면 산란됨.
- **메모리 저장 형태**: **Spark Point** (섬광점). 짧고 강렬한 키워드나 이미지.

### 1-2. AQ (Active Quantum): 흐름의 축
- **기호**: $\vec{v}$ (Velocity)
- **수학적 정의**: $AQ = \int Force \cdot dt$
- **물리적 성질**: 관성(Inertia)을 가짐. 한 번 움직이면 계속 움직이려 함. 마찰(Friction)에 취약.
- **메모리 저장 형태**: **Trace Line** (궤적). 로그, 커밋 히스토리, 활동 내역.

### 1-3. GF (Gravity Field): 구조의 축
- **기호**: $G$ (Tensor)
- **수학적 정의**: $GF \propto \frac{Mass}{r^2}$ (응집력)
- **물리적 성질**: 무질서한 에너지를 중심으로 끌어당겨 고정함. 너무 강하면 블랙홀(정체)이 됨.
- **메모리 저장 형태**: **Anchor Block** (앵커). 스키마, 문서, 규칙, 아키텍처.

### 1-4. HM (Human Mind): 공명의 축
- **기호**: $\Psi$ (Wave Function)
- **수학적 정의**: $HM = A e^{i(kx-\omega t)}$
- **물리적 성질**: 파동성. 물질을 관통하여 의미를 전달함. 간섭(Interference) 효과 발생.
- **메모리 저장 형태**: **Resonance Wave** (공명파). 스토리, 감정, 브랜드 아이덴티티.

## 2. 헥사드 6채널: 전이의 통로 (The Corridors of Transition)

이 6개의 통로는 HMD가 기억을 분류하고 저장하는 실제 **디렉토리**이자 **신경망**이다.

### 2-1. CE↔AQ Plane: The Launchpad (발사대)
- **수식**: $\vec{F} = m\vec{a}$ (뉴턴 제2법칙)
- **정의**: 정지된 아이디어(CE)에 힘을 가해 움직임(AQ)으로 바꾸는 면.
- **저장 대상**: 프로토타입 생성, 첫 커밋, 프로젝트 초기화, 실험적 시도.
- **막힘 증상**: "생각만 하고 시작을 안 함" (마찰력 > 추진력).
- **해법**: 마찰 계수를 줄이거나(작게 시작), 추진력을 높임(강제 실행).

### 2-2. CE↔GF Plane: The Blueprint (설계도)
- **수식**: $E = \sigma \epsilon$ (응력-변형률 관계)
- **정의**: 무형의 에너지(CE)를 형틀(GF)에 부어 굳히는 면.
- **저장 대상**: 기획서, 요구사항 명세, 데이터 스키마, 디렉토리 구조.
- **막힘 증상**: "만들고 싶은데 어떻게 만들지 모름" 또는 "너무 복잡하게 설계함".
- **해법**: 설계의 해상도를 낮추거나(Low-fi), 제약 조건(Constraints)을 명확히 함.

### 2-3. CE↔HM Plane: The Totem (토템)
- **수식**: $I = P \log_2 P$ (정보 엔트로피)
- **정의**: 날것의 창조(CE)에 이름과 의미(HM)를 부여하여 상징으로 승화시키는 면.
- **저장 대상**: 브랜드 네이밍, 로고, 슬로건, 핵심 철학, 비전 선언문.
- **막힘 증상**: "기능은 있는데 영혼이 없음", "이름이 입에 안 붙음".
- **해법**: "Why"를 다시 묻고, 메타포(은유)를 찾아 연결함.

### 2-4. AQ↔GF Plane: The Engine (엔진)
- **수식**: $\eta = 1 - \frac{Q_c}{Q_h}$ (열기관 효율)
- **정의**: 반복되는 행동(AQ)을 시스템(GF)으로 만들어 효율을 극대화하는 면.
- **저장 대상**: 자동화 스크립트, CI/CD 파이프라인, 업무 매뉴얼, 툴 설정.
- **막힘 증상**: "매번 수동으로 하느라 지침", "프로젝트가 커지니 느려짐".
- **해법**: 반복 패턴을 찾아 함수화/모듈화(Refactoring) 수행.

### 2-5. AQ↔HM Plane: The Rally (집회)
- **수식**: $f = f_0 \frac{v+v_r}{v+v_s}$ (도플러 효과)
- **정의**: 행동(AQ)이 타인의 마음(HM)에 닿아 반향을 일으키는 면. 동기 부여와 팀워크.
- **저장 대상**: 회의록, 피드백, 유저 인터뷰, 팀 문화 규칙, 회고.
- **막힘 증상**: "팀원이 안 움직임", "사용자가 반응이 없음".
- **해법**: 행동의 결과가 어떤 가치를 주는지 시과화하여 공명 주파수를 맞춤.

### 2-6. GF↔HM Plane: The Library (도서관)
- **수식**: $C = B \log_2(1+S/N)$ (채널 용량)
- **정의**: 딱딱한 구조(GF)를 이해 가능한 언어(HM)로 해설하고 전달하는 면.
- **저장 대상**: 사용자 가이드, 튜토리얼, API 문서, 인수인계 문서.
- **막힘 증상**: "시스템은 좋은데 아무도 쓸 줄 모름", "설명이 너무 어려움".
- **해법**: 구조의 복잡성을 숨기고(Abstraction), 사용자 관점의 언어로 번역(Translation).

---

# PART III. 동역학 (The Dynamics): 13-Phase Loop

HMD는 13단계의 시간 축을 따라 **쓰기(Write)** 모드가 자동 전환된다. 각 위상은 특정 헥사드 채널을 **Primary(주)**와 **Secondary(부)**로 활성화한다.

## Phase 1: CE+ (Ignition / 점화)
- **목표**: 무에서 유를 창조. 강력한 의도의 발산.
- **Primary Hexad**: **CE↔AQ** (일단 저지름)
- **Secondary Hexad**: CE↔HM (의미 부여)
- **HMD Action**:
  - `Write(Dynamic)`: 한 줄 아이디어, 스케치 이미지.
  - `Interpolation`: 이전 루프의 SR0에서 'Next Step'을 가져옴.
- **Debug**: 시작이 안되면 CE↔AQ 채널의 마찰(두려움)을 기록하고 강제 실행(AQ+)으로 전환.

## Phase 2: CE° (Cluster / 응집)
- **목표**: 흩어진 아이디어들의 공통점을 찾아 묶음.
- **Primary Hexad**: **CE↔HM** (네이밍)
- **Secondary Hexad**: CE↔GF (범주화)
- **HMD Action**:
  - `Write(Dynamic)`: 키워드 클러스터링, 태그 생성.
  - `Link`: 유사한 이전 프로젝트의 CE° 메모리와 연결.

## Phase 3: CE- (Constraint / 제약)
- **목표**: 불가능하거나 불필요한 것을 잘라냄.
- **Primary Hexad**: **CE↔GF** (규격 확정)
- **Secondary Hexad**: CE↔AQ (범위 축소)
- **HMD Action**:
  - `Write(Diagnostic)`: "하지 않을 것(Not To Do)" 리스트.
  - `Write(Dynamic)`: MVP 요구사항 명세.

## Phase 4: AQ+ (Launch / 발사)
- **목표**: 첫 번째 실제 결과물(프로토타입) 생성.
- **Primary Hexad**: **CE↔AQ** (형상화)
- **Secondary Hexad**: AQ↔GF (기초 빌딩)
- **HMD Action**:
  - `Write(Dynamic)`: v0.1 코드 커밋, 실행 로그.
  - `Trace`: CE+의 의도가 AQ+ 결과물에 반영되었는지 추적.

## Phase 5: AQ° (Flow / 흐름)
- **목표**: 작업의 리듬과 패턴을 안정화.
- **Primary Hexad**: **AQ↔GF** (루틴화)
- **Secondary Hexad**: AQ↔HM (몰입)
- **HMD Action**:
  - `Write(Dynamic)`: 함수 단위, 작업 블록, 체크리스트.
  - `Detect`: 반복되는 작업 패턴을 감지하여 자동화 후보로 등록.

## Phase 6: AQ- (Friction / 마찰)
- **목표**: 버그, 장애, 저항을 직시하고 기록.
- **Primary Hexad**: **AQ↔HM** (스트레스 감지)
- **Secondary Hexad**: AQ↔GF (병목 발견)
- **HMD Action**:
  - `Write(Diagnostic)`: 에러 로그, 실패 원인 분석(Post-mortem).
  - `Alert`: 마찰 계수가 임계치를 넘으면 'GF+(구조 개선)' 요청.

## Phase 7: GF+ (Structure / 구조화)
- **목표**: 임시방편을 영구적인 시스템으로 교체.
- **Primary Hexad**: **AQ↔GF** (시스템 안착)
- **Secondary Hexad**: CE↔GF (설계 원칙)
- **HMD Action**:
  - `Write(Dynamic)`: DB 스키마 변경, 폴더 구조 리팩토링.
  - `Lock`: 핵심 구조 파일을 Read-Only 또는 Version Controlled 상태로 변경.

## Phase 8: GF° (Optimize / 최적화)
- **목표**: 시스템의 효율과 균형을 조정.
- **Primary Hexad**: **GF↔HM** (사용성 개선)
- **Secondary Hexad**: AQ↔GF (성능 튜닝)
- **HMD Action**:
  - `Write(Dynamic)`: 벤치마크 결과, 리소스 사용량 최적화.
  - `Tune`: 헥사드 간의 가중치 밸런싱.

## Phase 9: GF- (Collapse / 붕괴 테스트)
- **목표**: 시스템의 한계를 테스트하고 예외 처리를 강화.
- **Primary Hexad**: **CE↔GF** (한계 상황)
- **Secondary Hexad**: GF↔HM (경고 메시지)
- **HMD Action**:
  - `Write(Diagnostic)`: 스트레스 테스트 결과, 엣지 케이스 시나리오.
  - `Plan`: SR0를 위한 'Known Issues' 작성.

## Phase 10: HM+ (Resonance / 공명)
- **목표**: 결과물에 영혼과 스토리를 불어넣음.
- **Primary Hexad**: **CE↔HM** (본질 재확인)
- **Secondary Hexad**: AQ↔HM (사용자 경험)
- **HMD Action**:
  - `Write(Dynamic)`: 릴리즈 노트 초안, 마케팅 카피, UX 라이팅.
  - `Check`: CE+의 초심(Intent)과 현재 HM+의 결과(Output)가 공명하는지 비교.

## Phase 11: HM° (Narrate / 서사)
- **목표**: 타인이 이해할 수 있도록 지식을 정리하고 전파.
- **Primary Hexad**: **GF↔HM** (지식 전수)
- **HMD Action**:
  - `Write(Dynamic)`: 튜토리얼, Wiki 문서, 영상 대본.
  - `Package`: 산출물을 배포 가능한 형태로 패키징.

## Phase 12: HM- (Reframe / 재정의)
- **목표**: 이번 루프의 의미를 회고하고 다음 루프를 위한 관점 전환.
- **Primary Hexad**: **AQ↔HM** (팀 회고)
- **Secondary Hexad**: All Channels
- **HMD Action**:
  - `Write(Diagnostic)`: KPT(Keep, Problem, Try) 회고록.
  - `Destructure`: 다음 루프를 위해 불필요한 맥락 폐기(Garbage Collection).

## Phase 13: SR₀ (Singularity / 특이점)
- **목표**: 모든 헥사드 채널의 데이터를 압축하여 **Canon(정전)**으로 확정.
- **Primary Hexad**: **Convergence (All→One)**
- **HMD Action**:
  - **Compile**: 1~12단계의 Dynamic/Diagnostic Point를 수집.
  - **Synthesize**: 모순을 해결하고 하나의 논리로 통합.
  - **Commit**: `recipe.json` 발행 및 보존소(Archive)로 이관.
  - **Reset**: 4코어 상태를 [0,0,0,0]으로 초기화하되, W축(차원)은 +1 상승.

---
(PART IV, V, VI, VII은 다음 파일에 계속)
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
