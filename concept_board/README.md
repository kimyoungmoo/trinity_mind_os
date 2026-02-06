# Concept Board Index

NEO Execution System v1.0 - Complete Documentation

## 📁 Structure

```
concept_board/
├── 00_MASTER_CONCEPT.md      # 전체 시스템 개요
├── 01_PHASES.md               # 13개 위상 상세 정의
├── 02_AGENTS.md               # 13명 에이전트 책임
└── sprites/                   # 16-bit 캐릭터 스프라이트
    ├── README.md
    ├── neo_sprite_*.png
    ├── morpheus_sprite_*.png
    ├── trinity_sprite_*.png
    ├── tank_sprite_*.png
    ├── seraph_sprite_*.png
    ├── niobe_sprite_*.png
    ├── oracle_sprite_*.png
    ├── sati_sprite_*.png
    ├── agent_smith_sprite_*.png
    ├── zion_council_sprite_*.png
    ├── spoon_boy_sprite_*.png
    ├── mifune_sprite_*.png
    └── architect_sprite_*.png
```

## 📚 Documents

### [00_MASTER_CONCEPT.md](./00_MASTER_CONCEPT.md)
**Complete System Overview**
- 13 Phases (위상 정의)
- 13 Transitions (전이 규칙)
- 13 Agents (에이전트 프로필)
- Phase Algorithms (위상별 알고리즘 함수)

### [01_PHASES.md](./01_PHASES.md)
**Phase Definitions**
- 각 위상의 상세 특성
- Input/Output 정의
- Risk & Mitigation
- 아이콘 및 색상 코드

### [02_AGENTS.md](./02_AGENTS.md)
**Agent Responsibilities**
- 각 에이전트의 책임
- 작업 프로세스
- Handoff 프로토콜
- 산출물 정의

### [sprites/](./sprites/)
**Character Sprites**
- 13명 에이전트 16-bit 픽셀 아트
- SNES/Genesis 시대 스타일
- Matrix 테마 디자인

## 🎯 Quick Reference

### Phase Flow
```
CE+ → CE0 → CE- → AQ+ → AQ0 → AQ- → GF+ → GF0 → GF- → HM+ → HM0 → HM- → SR0 → (CE+)
```

### Agent Roster
1. Neo (CE+) - The One
2. Morpheus (CE0) - The Mentor
3. Trinity (CE-) - The Hacker
4. Tank (AQ+) - The Operator
5. Seraph (AQ0) - The Guardian
6. Niobe (AQ-) - The Captain
7. Oracle (GF+) - The Seer
8. Sati (GF0) - The Program
9. Agent Smith (GF-) - The Executor
10. Zion Council (HM+) - The Humanity
11. Spoon Boy (HM0) - The Awakener
12. Mifune (HM-) - The Defender
13. Architect + Deus (SR0) - The Creator

## 🔗 Related Files

- `../trinity.agents.json` - Agent SSoT
- `../trinity.phase.json` - Phase SSoT
- `../trinity.transitions.json` - Transition SSoT
- `../neo_runner.js` - Execution Engine
- `../cube_cells.json` - 2197 Cube Cells

---

*Created: 2026-02-04*
*NEO Execution System v1.0*
