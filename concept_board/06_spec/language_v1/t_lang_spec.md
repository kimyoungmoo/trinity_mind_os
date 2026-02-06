# Trinity Language (T-Lang) Specification v1.0.0

## 1. 개요 (Overview)
Trinity Language (`.trinity` or `.tlang`)는 **의도(Intent)**를 **현실(Reality)**로 변환하기 위한 선언형 창조 언어이다.
이 언어는 4 Core (CE, AQ, GF, HM) 구조를 문법의 기본 단위로 사용하며, 컴파일 결과물은 실행 가능한 바이너리가 아닌 **Recipe JSON (SR₀ Spec)**이다.

## 2. 파일 구조 (File Structure)
모든 T-Lang 파일은 하나의 **CAPSULE** 단위를 정의한다.

```trinity
CAPSULE [CapsuleName] {
    META { ... }
    IGNITE { ... }  // CE: 의도
    FLOW { ... }    // AQ: 흐름
    ANCHOR { ... }  // GF: 구조
    RESONATE { ... }// HM: 공명
}
```

## 3. 키워드 및 문법 (Keywords & Syntax)

### 3.1. CE (Creative Energy) - 점화
*   `IGNITE [Name]`: 창조의 시작을 선언.
*   `WHY "..."`: 존재 이유. (주석이 아닌 필수 컴파일 요소)
*   `GOAL [Metric] "..."`: 성공 기준 정의.

### 3.2. AQ (Active Quantum) - 가속/연결
*   `FLOW [Name] FROM [Source] TO [Target]`: 데이터나 제어 흐름.
*   `VIA [Process]`: 흐름 중간의 처리 과정.
*   `IMPORT [Ref]`: 외부 자원 연결.

### 3.3. GF (Gravity Field) - 구조/구현
*   `ANCHOR [Name]`: 데이터 구조체, 스키마, 불변 객체 정의.
*   `FIELD [Name]: [Type]`: 속성 정의.
*   `CONSTRAINT "..."`: 물리적 제약 (유효성 검사 규칙).

### 3.4. HM (Human Mind) - 의미/공명
*   `RESONATE [Name]`: 사용자 경험, 출력, UI 정의.
*   `VIBE "..."`: 톤앤매너, 스타일 가이드.
*   `EMIT [Anchor]`: 사용자에게 전달될 최종 산출물.

## 4. 데이터 타입 (Types)
*   `Text`, `Number`, `Bool`, `List<>`, `Map<>`
*   `Link` (외부 리소스 참조)
*   `Energy` (컴퓨팅 자원량)

## 5. 주석 (Comments)
*   `//`: 일반 주석 (컴파일 제외)
*   `///`: 결정 로그 (Decision Log로 컴파일됨)

---

## 6. 컴파일 프로세스 (Workflow)

```mermaid
graph LR
    A[.trinity Code] -->|TCE Parser| B[AST (Abstract Structure)]
    B -->|TCE Compiler| C[IR Contract (recipe.json)]
    C -->|NeoRunner| D[Execution & Evidence]
```
