use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;
use chrono::{DateTime, Utc};

// 1. Tesseract State (4D Coordinate)
#[derive(Serialize, Deserialize, Debug, Clone)]
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
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum Phase {
    CE_Plus, CE_Zero, CE_Minus,
    AQ_Plus, AQ_Zero, AQ_Minus,
    GF_Plus, GF_Zero, GF_Minus,
    HM_Plus, HM_Zero, HM_Minus,
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
