const fs = require('fs');

const guardians = [
    { id: "G01", phase: "P01_CE+", base: "Zen", role: "Igniter", attr: "Fire (🔥)", skill1: "Spark" },
    { id: "G02", phase: "P02_CE0", base: "Focus", role: "Mentor", attr: "Fire (🔥)", skill1: "Clarity Ping" },
    { id: "G03", phase: "P03_CE-", base: "Seed", role: "Blueprint", attr: "Fire (🔥)", skill1: "Core Scan" },
    { id: "G04", phase: "P04_AQ+", base: "Diver", role: "Researcher", attr: "Insight (🌿)", skill1: "Data Pulse" },
    { id: "G05", phase: "P05_AQ0", base: "Linker", role: "Resonator", attr: "Insight (🌿)", skill1: "Pattern Sense" },
    { id: "G06", phase: "P06_AQ-", base: "Maker", role: "Modeler", attr: "Insight (🌿)", skill1: "Merge Node" },
    { id: "G07", phase: "P07_GF+", base: "Anchor", role: "Analyst", attr: "Standard (🌊)", skill1: "Gravity Step" },
    { id: "G08", phase: "P08_GF0", base: "Architect", role: "Engineer", attr: "Standard (🌊)", skill1: "Structure Line" },
    { id: "G09", phase: "P09_GF-", base: "Builder", role: "Implementor", attr: "Standard (🌊)", skill1: "Quick Run" },
    { id: "G10", phase: "P10_HM+", base: "Speaker", role: "UX/Story", attr: "Empathy (💜)", skill1: "Heart Echo" },
    { id: "G11", phase: "P11_HM0", base: "Kid", role: "Reflector", attr: "Empathy (💜)", skill1: "Loop Reflection" },
    { id: "G12", phase: "P12_HM-", base: "Knight", role: "Releaser", attr: "Empathy (💜)", skill1: "Fade Shift" },
    { id: "G13", phase: "P13_SR0", base: "Deus", role: "Rebooter", attr: "Zero (⚪)", skill1: "Zero Pulse" }
];

const tiers = [
    { rank: "01", name: "Proto", effect: "눈을 뜨는 단계" },
    { rank: "02", name: "Spark", effect: "기초 스킬 개방" },
    { rank: "03", name: "Focus", effect: "본질적 형태 완성" },
    { rank: "04", name: "Flow", effect: "능력의 흐름 안정화" },
    { rank: "05", name: "Pattern", effect: "시스템 규칙 학습" },
    { rank: "06", name: "Circuit", effect: "에너지 회로 확장" },
    { rank: "07", name: "Dual", effect: "이중 위상 동시 구동" },
    { rank: "08", name: "Sync", effect: "타 계열과의 연동" },
    { rank: "09", name: "Matrix", effect: "시스템 전체 관조" },
    { rank: "10", name: "Core", nickname: "Absolute", effect: "전문성 극의 도달" },
    { rank: "11", name: "Meta", effect: "한계 돌파 및 초월" },
    { rank: "12", name: "Trans", effect: "완전한 위상 전이" },
    { rank: "13", name: "Origin", effect: "영점 회귀 및 창세" }
];

const fullMatrix = [];

guardians.forEach(g => {
    const growth = [];
    tiers.forEach(t => {
        let formName = `${t.name}-${g.base}`;
        if (t.rank === "10") formName = `Core-${g.base} (Alpha)`;
        if (t.rank === "13") formName = `Origin-${g.base} (Ω)`;

        growth.push({
            tier: t.rank,
            tier_name: t.name,
            form_name: formName,
            status: t.effect,
            power_level: parseInt(t.rank) * 10,
            primary_skill: (t.rank === "01") ? g.skill1 : `${g.skill1} v${t.rank}`
        });
    });
    fullMatrix.push({
        guardian_id: g.id,
        guardian_name: g.base,
        phase: g.phase,
        archetype: g.role,
        attribute: g.attr,
        evolution_path: growth
    });
});

const output = {
    project: "Trinity-Evolution-169",
    timestamp: new Date().toISOString(),
    matrix: fullMatrix
};

fs.writeFileSync('./trinity_full_matrix_v1.json', JSON.stringify(output, null, 2));
console.log("Generated 169-form matrix to trinity_full_matrix_v1.json");
