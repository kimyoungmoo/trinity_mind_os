# 🏗️ Trinity Mind OS: Technical Constitution

> **"One Mind, Four Cores."**
> This document defines the technological foundation of the Trinity Mind OS.

## 1. The 4-Core Stack Overview

| Core | Sector | Role | Language | Status |
| :--- | :--- | :--- | :--- | :--- |
| **CE** | `bold_cube_ui` | Interface (Face) | **TypeScript** | ✅ Ready (`v25.6.0`) |
| **AQ** | `neural_bridge` | Intelligence (Brain) | **Python** | ✅ Ready (`v3.9.6`) |
| **GF** | `neo_kernel` | Stability (Core) | **Rust** | ❌ **Missing** |
| **HM** | `t_lang_spec` | Soul (Language) | **TCE-L** | 🚧 In Architecture |

---

## 2. Environment Setup Guide

### 🔴 CE: TypeScript (Node.js)
- **Status**: Installed.
- **Action**: Ready to initialize `package.json`.

### 🟢 AQ: Python
- **Status**: Installed (System Python).
- **Recommendation**: Create a virtual environment (`venv`) for the project to manage dependencies cleanly.
  ```bash
  python3 -m venv trinity_mind_os/AQ_neural_bridge/venv
  ```

### ⚓ GF: Rust
- **Status**: **Not Installed**.
- **Action Required**: Rust is the backbone of our system logic (GF). You must install it to proceed with the `neo_kernel`.
- **Installation Command** (Run this in your terminal):
  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

### 🟣 HM: TCE-L
- **Status**: Spec Design Phase.
- **Action**: We will define the grammar in `HM_t_lang_spec`.

---

## 3. Project Roadmap

1.  **[Phase 1] Foundation**
    -   Install Rust.
    -   Initialize projects for CE (Next.js), AQ (venv), GF (Cargo).
2.  **[Phase 2] Connection**
    -   Connect CE Dashboard to AQ Brain.
    -   Establish T-Lang parsing in Node.js (CE) initially.
3.  **[Phase 3] Evolution**
    -   Migrate Core Logic to Rust (GF).
    -   Full T-Lang Compiler implementation.
