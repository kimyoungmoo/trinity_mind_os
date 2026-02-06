
const fs = require('fs');
const path = require('path');

const SPEC_PATH = path.resolve('./neo.execution_spec.v1.json');
const OUTPUT_DIR = path.resolve('.');

// HSL Clamp Helper
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Helper: HSL to HEX
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// Main Setup Logic
async function main() {
    console.log(`Reading spec from ${SPEC_PATH}...`);
    try {
        const specRaw = fs.readFileSync(SPEC_PATH, 'utf-8');
        const spec = JSON.parse(specRaw);

        const ssot = spec.ssot;

        // 1. Extract and Save SSoTs
        const filesToSave = [
            { key: 'trinity.phase.json', content: ssot['trinity.phase.json'] },
            { key: 'trinity.transitions.json', content: ssot['trinity.transitions.json'] },
            { key: 'trinity.agents.json', content: ssot['trinity.agents.json'] },
            { key: 'trinity_cube_color_map.json', content: ssot['trinity_cube_color_map.json'] },
        ];

        for (const file of filesToSave) {
            const outputPath = path.join(OUTPUT_DIR, file.key);
            fs.writeFileSync(outputPath, JSON.stringify(file.content, null, 2));
            console.log(`Saved ${file.key}`);
        }

        // 2. Generate 2197 Cube Cells
        console.log('Generating 2197 Cube Cells...');
        const colorMap = ssot['trinity_cube_color_map.json'];
        const phases = ssot['trinity.phase.json'].phases;
        const xTypes = colorMap.axes.x_artifact_types;
        const yLanes = colorMap.axes.y_workstream_lanes;

        const cells = [];

        // Z (Phase) -> Y (Lane) -> X (Artifact)
        for (const phase of phases) {
            const z = phase.index - 1; // 0-indexed z (0..12) based on P01..P13

            for (const lane of yLanes) {
                const y = lane.y;

                for (const artifact of xTypes) {
                    const x = artifact.x;

                    // HSL Calculation (SSoT Formula)
                    // H = (phase.h + lane.ΔH + artifact.ΔH) mod 360
                    // S = clamp(phase.s + lane.ΔS + artifact.ΔS, 0..100)
                    // L = clamp(phase.l + lane.ΔL + artifact.ΔL, 0..100)

                    const baseH = phase.color_hsl.h;
                    const baseS = phase.color_hsl.s;
                    const baseL = phase.color_hsl.l;

                    let h = (baseH + lane.h_shift + artifact.h_shift) % 360;
                    if (h < 0) h += 360;

                    const s = clamp(baseS + lane.s_delta + artifact.s_delta, 0, 100);
                    const l = clamp(baseL + lane.l_delta + artifact.l_delta, 0, 100);

                    const cell = {
                        x,
                        y,
                        z,
                        phase_id: phase.id,
                        phase_name: phase.phase,
                        lane_slug: lane.slug,
                        artifact_slug: artifact.slug,
                        hsl: { h, s, l },
                        hex: hslToHex(h, s, l)
                    };
                    cells.push(cell);
                }
            }
        }

        const outputCellsPath = path.join(OUTPUT_DIR, 'cube_cells.json');
        fs.writeFileSync(outputCellsPath, JSON.stringify(cells, null, 2));
        console.log(`Generated ${cells.length} cells to ${outputCellsPath}`);

    } catch (e) {
        console.error('Error running setup:', e);
    }
}

main();
