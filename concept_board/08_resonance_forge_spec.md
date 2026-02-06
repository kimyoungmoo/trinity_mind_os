# Resonance Forge (RF): Trinity Mind SaaS Specification

**Based on User Provision (2026-02-06)**

## 1. Core Concept
**"Abstract Intent → Concrete Reality via 12-Phase Loop"**
A web-based Trinity WorkOS that automates the journey from idea to release using the Trinity Mind architecture (CE/AQ/GF/HM/SR₀).

## 2. Trinity Mind Alignment

| Core | Role | UI Component | Artifact |
| :--- | :--- | :--- | :--- |
| **CE** | Ignite (Intent) | **Intent Canvas** | Thesis, Questionnaire |
| **AQ** | Flow (Action) | **Flow Board** | Action Plan, Sprint Map |
| **GF** | Structure (Blueprint) | **Blueprint Tree** | PRD/FS/IA, Dependency Graph |
| **HM** | Meaning (Narrative) | **Meaning Studio** | Story, FAQ, Narrative Kit |
| **SR₀** | Release (Recipe) | **Release Gate** | **SR₀ Recipe**, Export Bundle |

## 3. Key Data Structures

### 3.1. SR₀ Recipe (The "Product")
The fundamental unit of value. A "Recipe" is a reproduceable package of thought and spec.
```json
{
  "recipe_id": "sr0_2026_0001",
  "cube_id": "cube_abc",
  "version": "1.0.0",
  "inputs": { "thesis": "...", "target": "..."},
  "artifacts": [{ "type": "prd", "ref": "artifact_id" }],
  "blueprint_summary": { "features_count": 12, "pages_count": 8 },
  "release_checks": ["integrity_ok", "tests_ok"],
  "exports": ["markdown", "json_schema", "png_maps"]
}
```

### 3.2. Tree Node (Unified Model)
Integrates FS (Functional Spec) and IA (Info Architecture) into a single polymorphic tree.
- `tree_type`: `fs` | `ia`
- `node_type`: `req` | `feat` | `spec` | `page`
- `meta_json`: flexible storage for priority, AC, paths, etc.

## 4. System Architecture
- **Frontend**: React (3-Pane Layout: Nav / Canvas / Inspector)
- **Backend**: Node.js/Rust + PostgreSQL (pgvector for RAG)
- **AI Agents (NEO)**:
    - `CE Scout`: Intent/Question generation
    - `GF Structurer`: PRD -> FS -> IA conversion
    - `SR₀ Auditor`: Integrity check
- **MCP Server**: Exposes internal structures to IDEs (Cursor).

## 5. User Journey (13 Phases)
1.  **Ignite (CE)**: Define one-line thesis.
2.  **blueprint (GF)**: Generate PRD/FS/IA structure automatically.
3.  **Flow (AQ)**: Define action items and sprints.
4.  **Narrative (HM)**: Generate FAQ and user stories.
5.  **Release (SR₀)**: Validate integrity and package as SR₀ Recipe.

## 6. Strategic value
- **Spec-Code Alignment**: Logic (Spec) maps directly to Code via MCP.
- **Connectivity**: Changes in PRD propagate to FS and IA automatically (or via alerts).
- **Asset/Recipe**: Projects become reusable assets ("Forkable Recipes").
