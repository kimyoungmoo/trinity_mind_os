
// Note: In a real integration, we'd reference the shared struct lib.
// For the UI demo, we'll mock the specific struct or use serde_json::Value
// to ensure type safety crossing the FFI boundary.


use tauri::State;
use serde::Serialize;
use std::sync::Mutex;

// Simplified Structs for UI Consumption
#[derive(Serialize, Clone)]
pub struct UiHexCell {
    pub id: String,
    pub phase: String,
    pub pos: [f32; 3], // [CE(x), AQ(y), GF(z)] roughly mapped
    pub density: f32, // resonance_score
    pub label: String,
}

#[derive(Default)]
pub struct MemoryState {
    pub cells: Mutex<Vec<UiHexCell>>,
}

// #[tauri::command]
pub fn get_memory_state(state: State<MemoryState>) -> Vec<UiHexCell> {
    let cells = state.cells.lock().unwrap();
    // Return a clone of the current cells
    cells.clone()
}

// #[tauri::command]
pub fn perform_genesis_ignition(state: State<MemoryState>) -> String {
    let mut cells = state.cells.lock().unwrap();
    
    // Check if Genesis already exists
    if cells.iter().any(|c| c.id == "GENESIS") {
        return "Genesis already active.".to_string();
    }

    // Create the visual representation of our Genesis Cell
    // Mapping: CE->X, AQ->Y, GF->Z. 
    // Genesis is Perfect Balance (1,1,1) -> Visual Coord (2,2,2)
    let genesis = UiHexCell {
        id: "GENESIS".to_string(),
        phase: "SR0".to_string(),
        pos: [0.0, 0.0, 0.0], // Center of the Universe
        density: 1.0,
        label: "SR0: HMD Genesis".to_string(),
    };
    
    cells.push(genesis);
    
    // Add satellite nodes to represent the Hexad structure
    let satellites = vec![
        ("CE-AQ", [-2.0, 2.0, 0.0]),
        ("CE-GF", [-2.0, -2.0, 2.0]),
        ("AQ-HM", [2.0, 4.0, 0.0]),
        ("GF-HM", [0.0, -2.0, 4.0]),
    ];

    for (label, pos) in satellites {
        cells.push(UiHexCell {
            id: label.to_string(),
            phase: "Active".to_string(),
            pos: [pos[0], pos[1], pos[2]],
            density: 0.7,
            label: label.to_string(),
        });
    }

    "Genesis Ignition Successful. 5 Cells materialized.".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(MemoryState::default())
        // .invoke_handler(tauri::generate_handler![get_memory_state, perform_genesis_ignition])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
