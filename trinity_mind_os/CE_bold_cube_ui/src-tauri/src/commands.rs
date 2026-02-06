use tauri::State;
use serde::Serialize;
use std::sync::Mutex;
use neo_kernel::hmd_structs::{PhaseDetector, HexadRouter};

// Simplified Structs for UI Consumption
#[derive(Serialize, Clone)]
pub struct UiHexCell {
    pub id: String,
    pub phase: String,
    pub pos: [f32; 3], 
    pub density: f32, 
    pub label: String,
    pub payload: String, 
}

#[derive(Default)]
pub struct MemoryState {
    pub cells: Mutex<Vec<UiHexCell>>,
}

#[derive(serde::Deserialize)]
pub struct UniversalLLMRequest {
    pub endpoint: String,
    pub api_key: String,
    pub model: String,
    pub prompt: String,
    pub system_prompt: Option<String>,
}

#[derive(Serialize)]
pub struct UniversalLLMResponse {
    pub message: String,
    pub raw_json: String,
}

#[tauri::command]
pub fn cmd_get_state(state: State<MemoryState>) -> Vec<UiHexCell> {
    let cells = state.cells.lock().unwrap();
    cells.clone()
}

#[tauri::command]
pub fn cmd_determine_route(payload: String) -> String {
    let route = HexadRouter::route(&payload);
    let explanation = HexadRouter::explain_route(&route);
    format!("{{ \"route\": \"{:?}\", \"explanation\": \"{}\" }}", route, explanation)
}

#[tauri::command]
pub fn cmd_parse_tlang(content: String) -> Result<UiHexCell, String> {
    use neo_kernel::t_lang::TLangParser;
    
    // 1. Parse YAML
    let project = TLangParser::parse(&content)
        .map_err(|e| format!("YAML Error: {}", e))?;

    // 2. Materialize (Simple conversion for PoC - taking the first cell)
    if let Some(first_cell) = project.cells.first() {
         let cell = UiHexCell {
            id: first_cell.id.clone(),
            phase: first_cell.phase.clone(), // e.g. "CE"
            label: first_cell.id.clone(),
            payload: first_cell.payload.clone(),
            density: first_cell.density.unwrap_or(0.5),
            pos: [0.0, 0.0, 0.0], // Placeholder
        };
        Ok(cell)
    } else {
        Err("No cells found in T-Lang".to_string())
    }
}

// File Operations
#[tauri::command]
pub async fn cmd_open_file(app: tauri::AppHandle) -> Result<String, String> {
    use tauri_plugin_dialog::DialogExt;
    
    let file_path = app.dialog()
        .file()
        .add_filter("Trinity Files", &["trinity"])
        .blocking_pick_file();
    
    if let Some(path) = file_path {
        match std::fs::read_to_string(path.as_path().unwrap()) {
            Ok(content) => Ok(content),
            Err(e) => Err(format!("Failed to read file: {}", e))
        }
    } else {
        Err("No file selected".to_string())
    }
}

#[tauri::command]
pub async fn cmd_save_file(app: tauri::AppHandle, content: String) -> Result<String, String> {
    use tauri_plugin_dialog::DialogExt;
    
    let file_path = app.dialog()
        .file()
        .add_filter("Trinity Files", &["trinity"])
        .set_file_name("untitled.trinity")
        .blocking_save_file();
    
    if let Some(path) = file_path {
        match std::fs::write(path.as_path().unwrap(), content) {
            Ok(_) => Ok(format!("Saved to: {:?}", path.as_path().unwrap())),
            Err(e) => Err(format!("Failed to save file: {}", e))
        }
    } else {
        Err("Save cancelled".to_string())
    }
}

#[tauri::command]
pub fn cmd_genesis_ignition(state: State<MemoryState>) -> String {
    let mut cells = state.cells.lock().unwrap();
    cells.clear();

    let current_phase = PhaseDetector::detect_now();
    let phase_str = PhaseDetector::phase_to_string(&current_phase);

    let genesis = UiHexCell {
        id: "GENESIS".to_string(),
        phase: "SR0".to_string(),
        pos: [0.0, 0.0, 0.0], 
        density: 1.0,
        label: format!("Genesis: {}", phase_str),
        payload: format!(
            r#"{{ "system_status": "ONLINE", "current_phase": "{}", "message": "The heartbeat of Trinity is active." }}"#, 
            phase_str
        ),
    };
    cells.push(genesis);
    
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
            payload: format!(r#"{{ "channel": "{}", "status": "linked" }}"#, label),
        });
    }

    "Genesis Ignition Successful.".to_string()
}

#[tauri::command]
pub async fn cmd_call_universal_llm(request: UniversalLLMRequest) -> Result<UniversalLLMResponse, String> {
    let client = reqwest::Client::new();
    
    let system_content = request.system_prompt.unwrap_or_else(|| "You are a helpful assistant.".to_string());
    
    let payload = serde_json::json!({
        "model": request.model,
        "messages": [
            {"role": "system", "content": system_content},
            {"role": "user", "content": request.prompt}
        ],
        "stream": false
    });

    let res = client.post(&request.endpoint)
        .header("Authorization", format!("Bearer {}", request.api_key))
        .json(&payload)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let json: serde_json::Value = res.json().await.map_err(|e| format!("Response parse error: {}", e))?;
    
    // OpenAI-compatible response parsing
    let message = if let Some(content) = json["choices"][0]["message"]["content"].as_str() {
        content.to_string()
    } else if let Some(content) = json["content"][0]["text"].as_str() { // Anthropic-style
        content.to_string()
    } else {
        format!("Unrecognized response format: {}", json)
    };

    Ok(UniversalLLMResponse {
        message,
        raw_json: json.to_string(),
    })
}
