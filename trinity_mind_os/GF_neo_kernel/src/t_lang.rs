use serde::{Deserialize, Serialize};
use crate::hmd_structs::{TesseractState, PhaseDetector};

#[derive(Debug, Serialize, Deserialize)]
pub struct TrinityCell {
    #[serde(rename = "ID")]
    pub id: String,
    #[serde(rename = "Phase")]
    pub phase: String,
    #[serde(rename = "Payload")]
    pub payload: String,
    #[serde(rename = "Density", default)]
    pub density: Option<f32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrinityLink {
    #[serde(rename = "From")]
    pub from: String,
    #[serde(rename = "To")]
    pub to: String,
    #[serde(rename = "Relation")]
    pub relation: String,
    #[serde(rename = "Flow", default)]
    pub flow: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TrinityProject {
    #[serde(rename = "Project")]
    pub project: String,
    #[serde(rename = "Phase")]
    pub phase: String,
    #[serde(rename = "Cells")]
    pub cells: Vec<TrinityCell>,
    #[serde(rename = "Links")]
    pub links: Vec<TrinityLink>,
}

pub struct TLangParser;

impl TLangParser {
    pub fn parse(content: &str) -> Result<TrinityProject, serde_yaml::Error> {
        serde_yaml::from_str(content)
    }

    // Convert T-Lang types to Kernel Types
    pub fn materialize(_project: TrinityProject) -> TesseractState {
        let state = TesseractState::default();
        // state.phase = PhaseDetector::detect_now(); // TesseractState only holds coordinates

        // TODO: Full Materialization logic 
        
        state
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_simple_project() {
        let yaml_content = r#"
Project: "Genesis_Test"
Phase: "SR0"
Cells:
  - ID: "ZERO_POINT"
    Phase: "SR0"
    Payload: "The Void"
Links: []
"#;
        let project = TLangParser::parse(yaml_content).expect("Failed to parse YAML");
        assert_eq!(project.project, "Genesis_Test");
        assert_eq!(project.cells.len(), 1);
        assert_eq!(project.cells[0].id, "ZERO_POINT");
    }
}
