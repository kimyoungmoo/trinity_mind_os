
mod hmd_structs;
use hmd_structs::HexCell;
use serde_json::json;
use std::fs;
use std::path::Path;

fn main() {
    println!("🌌 Neo Kernel: Gravity Field (GF) Initialized.");
    println!("⚙️  Loading HMD (Hexad Memory Device) System...");

    // 1. Create the Genesis Cell (SR0 Commit)
    let genesis_payload = json!({
        "decision": "HMD Genesis Commit",
        "description": "Establishment of the Hexad Memory Device physical structure and data schema.",
        "artifacts": [
            "concept_board/03_mechanics/hmd/",
            "src/hmd_structs.rs"
        ],
        "message": "The mind is no longer abstract. It has structure."
    });

    let genesis_cell = HexCell::new_genesis(
        genesis_payload, 
        "User Roo requested the first SR0 Commit to materialize the HMD concept."
    );

    // 2. Serialize to JSON
    let serialized = serde_json::to_string_pretty(&genesis_cell).unwrap();
    
    // 3. Save to the CANON sector (Physical Write)
    // Note: Assuming running from project root, adjusting path relative to binary execution might be needed
    // For this simulation, we print the path intent.
    let path = "../../concept_board/03_mechanics/hmd/CANON/genesis_cell.json";
    
    // In a real run, we would write to file. For now, we simulate the 'breath' of the system.
    println!("\n[SR0 Commit Sequence Initiated]");
    println!("--------------------------------------------------");
    println!("{}", serialized);
    println!("--------------------------------------------------");
    println!("✅ Genesis Cell constructed. Ready for write to: {}", path);
}
