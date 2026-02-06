#![allow(non_camel_case_types)]
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

// 1. Tesseract State (4D Coordinate)
#[derive(Serialize, Deserialize, Debug, Clone, Default)]
pub struct TesseractState {
    pub ce: f32, // Creative Energy (Ignition)
    pub aq: f32, // Active Quantum (Execution)
    pub gf: f32, // Gravity Field (Structure)
    pub hm: f32, // Human Mind (Meaning)
}

// 2. Hexad Coupling (6 Planes)
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Eq, Hash)]
pub enum CouplingIdentity {
    CEAQ, // Ignition <-> Acceleration
    CEGF, // Creation <-> Structure
    CEHM, // Creation <-> Meaning
    AQGF, // Execution <-> System
    AQHM, // Action <-> Motivation
    GFHM, // Structure <-> Interpretation
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct HexadCoupling {
    pub id: CouplingIdentity,
    pub direction: String, // e.g., "CE->AQ"
    pub strength: f32,
}

// 3. 13 Phases (Time Orbit)
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, Default)]
pub enum Phase {
    CE_Plus, CE_Zero, CE_Minus,
    AQ_Plus, AQ_Zero, AQ_Minus,
    GF_Plus, GF_Zero, GF_Minus,
    HM_Plus, HM_Zero, HM_Minus,
    #[default]
    SR0_Commit,
}

// 4. Hex-Cell Data Unit (The Atom of Memory)
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct HexCell {
    pub id: Uuid,
    pub timestamp: DateTime<Utc>,
    
    // Core Identity
    pub phase: Phase,
    pub cell_type: String, // "dynamic", "diagnostic", "canon"
    
    // Topology
    pub tesseract: TesseractState,
    pub coupling: HexadCoupling,
    
    // Dynamics
    pub resonance_score: f32, // 0.0 to 1.0
    
    // Data
    pub payload: serde_json::Value, // Flexible JSON payload
    pub trace: TraceInfo,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TraceInfo {
    pub source: String,
    pub why: String,
    pub refs: Vec<String>,
}

impl HexCell {
    // SR0 Genesis Constructor
    pub fn new_genesis(payload: serde_json::Value, why: &str) -> Self {
        HexCell {
            id: Uuid::new_v4(),
            timestamp: Utc::now(),
            phase: Phase::SR0_Commit,
            cell_type: "canon".to_string(),
            // SR0 State: High Synchronization
            tesseract: TesseractState { ce: 1.0, aq: 1.0, gf: 1.0, hm: 1.0 },
            // Convergence Coupling (All Channels) - Represented by AQGF (Systemizing)
            coupling: HexadCoupling {
                id: CouplingIdentity::AQGF,
                direction: "ALL->ONE".to_string(),
                strength: 1.0,
            },
            resonance_score: 1.0, // Absolute Truth (Genesis)
            payload,
            trace: TraceInfo {
                source: "User_Roo".to_string(),
                why: why.to_string(),
                refs: vec!["HEXAD_MATH_MODEL.md".to_string()],
            },
        }
    }
}

// 5. Phase Detector (The Clock)
pub struct PhaseDetector;

impl PhaseDetector {
    // Detects the current phase based on the "Universal Clock" (System Time)
    // In a real system, this would be based on project state or user intent.
    pub fn detect_now() -> Phase {
        let now = Utc::now().timestamp();
        // 13-Phase Cycle (Simple Modulo for dynamic simulation)
        match now % 13 {
            0 => Phase::CE_Plus,
            1 => Phase::CE_Zero,
            2 => Phase::CE_Minus,
            3 => Phase::AQ_Plus,
            4 => Phase::AQ_Zero,
            5 => Phase::AQ_Minus,
            6 => Phase::GF_Plus,
            7 => Phase::GF_Zero,
            8 => Phase::GF_Minus,
            9 => Phase::HM_Plus,
            10 => Phase::HM_Zero,
            11 => Phase::HM_Minus,
            12 => Phase::SR0_Commit,
            _ => Phase::SR0_Commit, // Fallback
        }
    }

    pub fn phase_to_string(phase: &Phase) -> String {
        match phase {
            Phase::CE_Plus => "CE⁺ (Creative Force)".to_string(),
            Phase::CE_Zero => "CE⁰ (Creative Energy)".to_string(),
            Phase::CE_Minus => "CE⁻ (Energy Flow)".to_string(),
            Phase::AQ_Plus => "AQ⁺ (Energy Flow)".to_string(),
            Phase::AQ_Zero => "AQ⁰ (Active Quantum)".to_string(),
            Phase::AQ_Minus => "AQ⁻ (Quantum Map)".to_string(),
            Phase::GF_Plus => "GF⁺ (Gravity Link)".to_string(),
            Phase::GF_Zero => "GF⁰ (Gravity Field)".to_string(),
            Phase::GF_Minus => "GF⁻ (Field Core)".to_string(),
            Phase::HM_Plus => "HM⁺ (Heart Sense)".to_string(),
            Phase::HM_Zero => "HM⁰ (Heart-Mind)".to_string(),
            Phase::HM_Minus => "HM⁻ (Mind Logic)".to_string(),
            Phase::SR0_Commit => "SR₀ (Genesis)".to_string(),
        }
    }
}

// 6. Hexad Router (The Logic)
// "The neural network that decides where a memory belongs."
pub struct HexadRouter;

impl HexadRouter {
    pub fn route(payload_str: &str) -> CouplingIdentity {
        let content = payload_str.to_lowercase();
        
        // Simple keyword-based routing (Phase 1 Logic)
        if content.contains("action") || content.contains("run") || content.contains("fast") || content.contains("flow") {
            return CouplingIdentity::CEAQ; // Ignition -> Acceleration
        }
        if content.contains("struct") || content.contains("logic") || content.contains("code") || content.contains("system") {
            return CouplingIdentity::AQGF; // Execution -> Structure
        }
        if content.contains("idea") || content.contains("vision") || content.contains("concept") || content.contains("dream") {
            return CouplingIdentity::CEGF; // Creation -> Structure (Blueprint)
        }
        if content.contains("story") || content.contains("user") || content.contains("meaning") || content.contains("why") {
            return CouplingIdentity::GFHM; // Structure -> Meaning
        }
        if content.contains("people") || content.contains("love") || content.contains("emotion") || content.contains("soul") {
             return CouplingIdentity::AQHM; // Action -> Meaning
        }
        if content.contains("art") || content.contains("muse") || content.contains("magic") || content.contains("god") {
             return CouplingIdentity::CEHM; // Creation -> Meaning
        }

        // Default to Genesis Coupling (Convergence) if unsure
        CouplingIdentity::AQGF 
    }

    pub fn explain_route(id: &CouplingIdentity) -> String {
        match id {
            CouplingIdentity::CEAQ => "CE->AQ: Accelerating Idea into Action".to_string(),
            CouplingIdentity::CEGF => "CE->GF: Structuring Abstract Intent".to_string(),
            CouplingIdentity::CEHM => "CE->HM: Finding Meaning in Creation".to_string(),
            CouplingIdentity::AQGF => "AQ->GF: Systemizing Execution".to_string(),
            CouplingIdentity::AQHM => "AQ->HM: Humanizing Action".to_string(),
            CouplingIdentity::GFHM => "GF->HM: Intepreting Structure".to_string(),
        }
    }
}
