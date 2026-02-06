# HMD (Hexad Memory Device) v1.0 Architectural Specification

## 1. Definition (System Identity)

**Hexad Memory Device (HMD)** is a **transition-based memory module** that decomposes the 4-Core Bold Cube states (CE/AQ/GF/HM) into **6 Coupling Planes (Hexad)**. It records the "vectors of change" across the 13-Phase Cycle and commits them into reproducible recipes at the SR₀ Singularity.

> **Recall Formula**: Memory = (Core State Strength) + (Hexad Coupling Vector) + (Phase Timestamp)

---

## 2. Core Structure: The Tesseract & Hexad

### 2.1 Tesseract 4-Core (State Space)
The 4 coordinate axes of the system state:
- **CE (Creative Energy)**: Ignition, Spark, Concept.
- **AQ (Active Quantum)**: Flow, Acceleration, Prototype.
- **GF (Gravity Field)**: Consolidate, Structure, System.
- **HM (Human Mind)**: Resonate, Meaning, Narrative.

### 2.2 Hexad Couplings (Transition Planes)
The 6 pathways through which energy flows between cores:

| Hexad ID | Coupling | Essence | Representative Symptom/Use |
|:---:|:---:|:---:|:---|
| **CEAQ** | Ignition↔Flow | **Launch** | "Idea to Action", Prototyping |
| **CEGF** | Ignition↔Structure | **Architecture** | "Concept to Spec", Constraints |
| **CEHM** | Ignition↔Meaning | **Identity** | "Spark to Story", Branding, Why |
| **AQGF** | Flow↔Structure | **Systemize** | "Routine to Automation", Optimization |
| **AQHM** | Flow↔Meaning | **Motivation** | "Action to Emotion", Team Dynamics |
| **GFHM** | Structure↔Meaning | **Onboarding** | "System to Explanation", Docs |

---

## 3. The 13-Phase Write Protocol

Memory is not written randomly; it follows the 13 Phases of the Trinity Loop.

| Phase | Block | Dominant Hexad | Storage Type |
|:---:|:---:|:---:|:---|
| **CE+** | Ignite | **CEAQ** / CEHM | **Dynamic Point** (Seeds) |
| **CE°** | Cluster | CEHM / CEGF | Dynamic Point (Tags) |
| **CE-** | Prune | CEGF | **Diagnostic Point** (Constraints) |
| **AQ+** | Launch | **CEAQ** / AQGF | Dynamic Point (Logs) |
| **AQ°** | Flow | AQGF | Dynamic Point (Rules) |
| **AQ-** | Friction | AQHM | Diagnostic Point (Blockers) |
| **GF+** | Lock | **CEGF** / AQGF | Dynamic Point (Schemas) |
| **GF°** | Optimize | GFHM | Hybrid (Tuning) |
| **GF-** | Collapse | **GFHM** | Diagnostic Point (Risks) |
| **HM+** | Pulse | CEHM | Dynamic Point (Vibes) |
| **HM°** | Narrate | GFHM | Dynamic Point (Docs) |
| **HM-** | Reframe | AQHM | Diagnostic Point (Retrospect) |
| **SR₀** | Commit | **ALL** | **CANON** (Recipe/Release) |

---

## 4. Interpolation Engine (The Void Filler)

The HMD does not record every millisecond. It records **Dynamic Points** (Key Decisions) and **Diagnostic Points** (Failures). The gaps are filled by the **Interpolation Engine** using specific rules based on the 13 Phases.
- **Goal**: Restore continuity from sparse data.
- **Method**: If Phase=AQ° and Hexad=AQGF, assume "Routine Optimization" between points.

---

## 5. SR₀ Commit Gate (The Convergence)

SR₀ is the singularity where the 6-channel waves collapse into a single **Recipe**.
- **Input**: 13 Phases of logs across 6 Channels.
- **Process**: Conflict Resolution → Pattern Recognition → Abstraction.
- **Output**: A reproducible `recipe.json` (Canon).

---

## 6. Physical Architecture (Folder Structure)

```text
bold_cube/
├── hmd/                          # Hexad Memory Device Root
│   ├── DYNAMIC/                  # L0: Active Session Memory
│   │   ├── CEAQ/                 # Launch Channel
│   │   ├── CEGF/                 # Architecture Channel
│   │   ├── CEHM/                 # Identity Channel
│   │   ├── AQGF/                 # System Channel
│   │   ├── AQHM/                 # Motivation Channel
│   │   └── GFHM/                 # Onboarding Channel
│   │
│   ├── DIAGNOSTIC/               # L1: Failure & Pattern Archive
│   │   ├── failures/
│   │   └── patterns/
│   │
│   ├── CANON/                    # L2: SR₀ Committed Recipes
│   │   └── recipes/
│   │
│   └── ARCHIVE/                  # L3: Completed Loops
│
├── interpolation_engine/         # Logic for filling gaps
│   └── rules.json
│
└── neo_policies/                 # Policies for Agent interaction
```
