mod commands;

pub use commands::MemoryState;
use commands::{cmd_get_state, cmd_genesis_ignition, cmd_determine_route, cmd_parse_tlang, cmd_open_file, cmd_save_file, cmd_call_universal_llm};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(MemoryState::default())
        .invoke_handler(tauri::generate_handler![
            cmd_get_state, 
            cmd_genesis_ignition, 
            cmd_determine_route,
            cmd_parse_tlang,
            cmd_open_file,
            cmd_save_file,
            cmd_call_universal_llm
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
