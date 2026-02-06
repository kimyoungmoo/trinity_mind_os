# NEO Execution Spec v1.0 — (Trinity SSoT × Cube Standard) 통합 실행 규격

- 생성일: 2026-02-04T02:41:05

이 문서는 다음 4개 SSoT를 **완전 결합**하여, NEO가 **(x,y,z) 큐브 셀을 생성**하고 **DoD 충족 시 자동 전이**하는 실행 규격을 정의한다.

- `trinity.phase.json` (13위상 정의)
- `trinity.transitions.json` (13전이 정의)
- `trinity.agents.json` (13에이전트 정의)
- `trinity_cube_color_map.json` (2197 큐브 축 + HSL 매칭 규칙)


## 1) 핵심 개념

- **상태(state)**: `phase_ascii` (CE+, CE0, …, SR0)

- **작업 단위(work unit)**: 큐브 셀 `CubeCell(x,y,z)`

- **완료 판단**: 셀의 `dodChecklist`(선언형 predicate) 전부 true

- **전이(trigger)**: 현재 phase의 **필수 셀(required cells)** 전부 DoD 만족 → 다음 phase로 전이


## 2) Phase → Required Cells(필수 셀) 규칙

아래는 각 위상에서 최소로 확보해야 하는 대표 산출물 셀이다.

표기: `X(artifact) / Y(lane) / Z(phase)`


| Phase | Required Artifact | Default Lane | Allowed Lanes | Coordinate(Default) | DoD(요약) |
|---|---|---|---|---|---|
| CE+ | `build_env` | `deploy` | `deploy`, `dev`, `docs` | `X09_Y02_Z00` | file_exists, file_exists, ci_green |
| CE0 | `requirements` | `product` | `product`, `docs` | `X01_Y00_Z01` | file_exists, contains_sections |
| CE- | `data_model` | `dev` | `dev`, `docs` | `X04_Y01_Z02` | file_exists, contains_sections |
| AQ+ | `context_brief` | `docs` | `docs`, `product` | `X00_Y10_Z03` | file_exists, contains_sections |
| AQ0 | `tests` | `dev` | `dev`, `docs` | `X08_Y01_Z04` | tests_pass |
| AQ- | `integration` | `dev` | `dev`, `docs` | `X06_Y01_Z05` | contains_sections, tests_pass |
| GF+ | `spec_prd` | `docs` | `docs`, `product` | `X02_Y10_Z06` | contains_sections |
| GF0 | `architecture` | `docs` | `docs`, `dev` | `X03_Y10_Z07` | file_exists, file_exists |
| GF- | `business_logic` | `dev` | `dev` | `X05_Y01_Z08` | file_exists, tests_pass |
| HM+ | `ui_ux` | `product` | `product`, `docs` | `X10_Y00_Z09` | file_exists, contains_sections |
| HM0 | `stability` | `dev` | `dev`, `analytics` | `X07_Y01_Z10` | file_exists, tests_pass |
| HM- | `release` | `deploy` | `deploy`, `docs` | `X11_Y02_Z11` | file_exists, contains_sections, ci_green |
| SR0 | `analytics_auto` | `analytics` | `analytics`, `meta` | `X12_Y08_Z12` | file_exists, file_exists |

## 3) DoD Predicate Contract (선언형)

DoD는 “체크박스”가 아니라, **검증 가능한 predicate**들의 집합이다.

NEO는 각 predicate를 evaluator로 위임한다.


```json

{
  "file_exists": {
    "type": "predicate",
    "args": [
      "path_or_ref"
    ],
    "meaning": "산출물 파일/링크가 존재"
  },
  "contains_sections": {
    "type": "predicate",
    "args": [
      "markdown_ref",
      "required_headings[]"
    ],
    "meaning": "문서에 필수 섹션 포함"
  },
  "tests_pass": {
    "type": "predicate",
    "args": [
      "test_report_ref"
    ],
    "meaning": "테스트 통과"
  },
  "ci_green": {
    "type": "predicate",
    "args": [
      "ci_run_ref"
    ],
    "meaning": "CI 파이프라인 성공"
  },
  "metric_below": {
    "type": "predicate",
    "args": [
      "metric",
      "threshold"
    ],
    "meaning": "지표가 임계값 이하"
  },
  "metric_above": {
    "type": "predicate",
    "args": [
      "metric",
      "threshold"
    ],
    "meaning": "지표가 임계값 이상"
  }
}

```

## 4) 셀 생성 정책

- 필수 셀이 없으면 NEO는 **stub를 생성**한다.

- stub는 `trinity_cube_color_map.json` 규칙으로 HSL을 계산해 저장한다.

- stub에는 해당 artifact의 DoD 템플릿을 자동 주입한다.


## 5) 전이(Transition) 정책

- 기본: `on_all_required_cells_done → next phase`

- blocked: `on_blocked → prev phase`

- risk: `on_risk → CE-`

- reboot: `on_reboot → CE+`

- SR0 종료 조건(권장): prod_deployed, payment_ok, monitoring_ok, retro_written


## 6) NEO Runner Pseudocode (실행 루프)

```pseudo

load phaseSSoT from trinity.phase.json
load transitionSSoT from trinity.transitions.json
load agentSSoT from trinity.agents.json
load cubeSSoT from trinity_cube_color_map.json
load executionSpec from neo.execution_spec.v1.json

state.phase = current_phase_ascii()   # CE+..SR0
loop:
  required = executionSpec.required_cells_per_phase[state.phase]

  # 1) ensure required cells exist (create stubs)
  for rc in required:
    cell = db.find_or_create_cell(x=rc.x, y=rc.lane_default_y, z=rc.z,
                                  phase_ascii=rc.phase,
                                  lane_slug=rc.lane_default_slug,
                                  artifact_slug=rc.artifact_slug,
                                  color=compute_hsl_from_cubeSSoT(x,y,z),
                                  dodChecklist=rc.dod)

  # 2) run agent for the current phase (planner/executor)
  agent = agentSSoT.by_phase[state.phase]
  agent.run(context = collect_cells(required), workspace = cube_addr_prefix(state.phase))

  # 3) evaluate DoD for required cells
  all_done = true
  for rc in required:
    cell = db.get_cell(x=rc.x, y=rc.lane_default_y, z=rc.z)
    if not evaluate_predicates(cell.dodChecklist, evaluators):
      all_done = false

  # 4) transition if done
  if all_done:
    next_phase = transitionSSoT.next(state.phase)  # CE+ -> CE0 -> ... -> SR0
    write_handoff(state.phase, next_phase, evidence = required)
    state.phase = next_phase
    continue

  # 5) event-driven overrides
  event = poll_events()
  if event == "blocked": state.phase = transitionSSoT.prev(state.phase)
  if event == "risk": state.phase = "CE-"
  if event == "reboot" and state.phase == "SR0": state.phase = "CE+"

```

## 7) 구현 체크리스트(최소)

- [ ] cube_cells 테이블(또는 파일 기반 저장소)에서 (x,y,z) unique 보장

- [ ] predicate evaluator 구현: file_exists / contains_sections / tests_pass / ci_green / metric_*

- [ ] 에이전트 실행기: agentSSoT의 toolchain(OpenClaw 등) 바인딩

- [ ] 전이 로그: phase change + handoff + evidence 링크 기록
