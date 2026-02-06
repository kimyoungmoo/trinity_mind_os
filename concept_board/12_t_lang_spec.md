# Concept: T-Lang Specification (`.trinity`)

> "The Syntax of Creation."

**T-Lang** is the human-readable interface for the Trinity Core Engine. It allows Operators to define Quantum Thoughts (Cells) and Entanglements (Links) in a structured text format.

## 1. File Structure
The file is **YAML-based** for readability and ease of parsing.

```yaml
# Header: Global Context
Project: "Neo_Genesis"   # Name of the Thought Complex
Phase: "AQ+"             # Current Phase Alignment (Time)

# Section 1: Memory Atoms (The Dots)
Cells:
  - ID: "VISION_CORE"
    Phase: "CE"
    Payload: "Create a world of pure thought."
    Density: 1.0  # Optional (0.0 - 1.0)
  
  - ID: "EXEC_ENGINE"
    Phase: "AQ"
    Payload: "Rust Backend + React Frontend"

# Section 2: Entanglements (The Lines)
Links:
  - From: "VISION_CORE"
    To: "EXEC_ENGINE"
    Relation: "CE-AQ"  # The Coupling Type
    Flow: "Ignition"   # The 12-Flow Direction (Optional, inferred from Relation)
```

## 2. Keywords & Enums

### Phase Types (The 12+1 Canon)
*   **CE (Creative Energy)**
    *   `CE+`: Creative Force (Ignition)
    *   `CE0`: Creative Energy (Pure State)
    *   `CE-`: Energy Flow (Transition to AQ)
*   **AQ (Active Quantum)**
    *   `AQ+`: Energy Flow (Reception from CE)
    *   `AQ0`: Active Quantum (Pure Action)
    *   `AQ-`: Quantum Map (Transition to GF)
*   **GF (Gravity Field)**
    *   `GF+`: Gravity Link (Reception from AQ)
    *   `GF0`: Gravity Field (Pure Structure)
    *   `GF-`: Field Core (Transition to HM)
*   **HM (Heart-Mind)**
    *   `HM+`: Heart Sense (Reception from GF)
    *   `HM0`: Heart-Mind (Pure Meaning)
    *   `HM-`: Mind Logic (Transition to CE)
*   **SR0**: The Void (Genesis)

### Relation Types (The Hexad)
*   `CE-AQ` (Ignition)
*   `AQ-GF` (Systemization)
*   `GF-HM` (Interpretation)
*   `CE-GF` (Blueprint)
*   `AQ-HM` (Empathy)
*   `CE-HM` (Inspiration)

## 3. Parsing Logic
1.  **Read**: Load `.trinity` file string.
2.  **Parse**: Convert YAML to Rust Structs (`TrinityProject`, `TrinityCell`, `TrinityLink`).
3.  **Materialize**: Transform into `UiHexCell` and `HexadCoupling` for the 3D Engine.
