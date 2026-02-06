/**
 * Trinity Tesseract HSL Calculator
 * Mathematical implementation of the 3D color mapping system
 */

class TesseractHSL {
    constructor() {
        this.GUARDIANS = 13;
        this.TIERS = 14;      // 0-13
        this.SKILLS = 13;
        this.TOTAL_STATES = this.GUARDIANS * this.TIERS * this.SKILLS; // 2,366
    }

    /**
     * Calculate HSL for a given state
     * @param {number} guardianId - 0 to 12
     * @param {number} tier - 0 to 13
     * @param {number} skillId - 0 to 12
     * @returns {object} HSL values and CSS string
     */
    calculate(guardianId, tier, skillId) {
        // Validate inputs
        if (guardianId < 0 || guardianId > 12) throw new Error('Guardian ID must be 0-12');
        if (tier < 0 || tier > 13) throw new Error('Tier must be 0-13');
        if (skillId < 0 || skillId > 12) throw new Error('Skill ID must be 0-12');

        // H (Hue): Guardian identity
        const H = (guardianId / this.GUARDIANS) * 360;

        // S (Saturation): Evolution level
        const S = (tier / this.GUARDIANS) * 100;

        // L (Lightness): Skill mastery
        const L = 50 + (skillId / this.GUARDIANS) * 25;

        return {
            h: parseFloat(H.toFixed(2)),
            s: parseFloat(S.toFixed(2)),
            l: parseFloat(L.toFixed(2)),
            css: `hsl(${H.toFixed(1)}, ${S.toFixed(1)}%, ${L.toFixed(1)}%)`,
            hex: this.hslToHex(H, S, L),
            rgb: this.hslToRgb(H, S, L)
        };
    }

    /**
     * Convert HSL to RGB
     */
    hslToRgb(h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    /**
     * Convert HSL to HEX
     */
    hslToHex(h, s, l) {
        const rgb = this.hslToRgb(h, s, l);
        const toHex = (n) => {
            const hex = n.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
    }

    /**
     * Get guardian name
     */
    getGuardianName(guardianId) {
        const names = [
            'Spark', 'Flux', 'Volt', 'Prism', 'Nexus', 'Cipher',
            'Echo', 'Pulse', 'Vortex', 'Zenith', 'Aether', 'Omega', 'Neo'
        ];
        return names[guardianId];
    }

    /**
     * Get tier name
     */
    getTierName(tier) {
        if (tier === 0) return 'Proto';
        if (tier === 13) return 'Origin';
        return `Tier ${tier}`;
    }

    /**
     * Get skill name
     */
    getSkillName(skillId) {
        const skills = [
            'CE⁺', 'CE°', 'CE⁻',
            'AQ⁺', 'AQ°', 'AQ⁻',
            'GF⁺', 'GF°', 'GF⁻',
            'HM⁺', 'HM°', 'HM⁻',
            '⊙'
        ];
        return skills[skillId];
    }

    /**
     * Generate full state description
     */
    getStateDescription(guardianId, tier, skillId) {
        const guardian = this.getGuardianName(guardianId);
        const tierName = this.getTierName(tier);
        const skill = this.getSkillName(skillId);
        const color = this.calculate(guardianId, tier, skillId);

        return {
            guardian,
            tier: tierName,
            skill,
            color,
            fullName: `${guardian} ${tierName} [${skill}]`
        };
    }

    /**
     * Calculate all states for a guardian
     */
    getAllStatesForGuardian(guardianId) {
        const states = [];
        for (let tier = 0; tier <= 13; tier++) {
            for (let skill = 0; skill <= 12; skill++) {
                states.push(this.getStateDescription(guardianId, tier, skill));
            }
        }
        return states;
    }

    /**
     * Calculate statistics
     */
    getStatistics() {
        return {
            totalStates: this.TOTAL_STATES,
            guardians: this.GUARDIANS,
            tiers: this.TIERS,
            skills: this.SKILLS,
            uniqueHues: this.GUARDIANS,
            uniqueSaturations: this.TIERS,
            uniqueLightness: this.SKILLS,
            hueRange: '0° - 332.3°',
            saturationRange: '0% - 100%',
            lightnessRange: '50% - 73.1%'
        };
    }
}

// Example usage and testing
if (require.main === module) {
    const tesseract = new TesseractHSL();

    console.log('🎨 Trinity Tesseract HSL Calculator\n');
    console.log('='.repeat(60));

    // Example 1: Neo Proto CE⁺
    console.log('\n📍 Example 1: Neo° (Proto, CE⁺)');
    const state1 = tesseract.getStateDescription(12, 0, 0);
    console.log(`Guardian: ${state1.guardian}`);
    console.log(`Tier: ${state1.tier}`);
    console.log(`Skill: ${state1.skill}`);
    console.log(`HSL: ${state1.color.css}`);
    console.log(`HEX: ${state1.color.hex}`);
    console.log(`RGB: rgb(${state1.color.rgb.r}, ${state1.color.rgb.g}, ${state1.color.rgb.b})`);

    // Example 2: Neo Tier 5 AQ°
    console.log('\n📍 Example 2: Neo⁵ (Tier 5, AQ°)');
    const state2 = tesseract.getStateDescription(12, 5, 4);
    console.log(`Guardian: ${state2.guardian}`);
    console.log(`Tier: ${state2.tier}`);
    console.log(`Skill: ${state2.skill}`);
    console.log(`HSL: ${state2.color.css}`);
    console.log(`HEX: ${state2.color.hex}`);
    console.log(`RGB: rgb(${state2.color.rgb.r}, ${state2.color.rgb.g}, ${state2.color.rgb.b})`);

    // Example 3: Neo Origin ⊙
    console.log('\n📍 Example 3: Neo∞ (Origin, ⊙)');
    const state3 = tesseract.getStateDescription(12, 13, 12);
    console.log(`Guardian: ${state3.guardian}`);
    console.log(`Tier: ${state3.tier}`);
    console.log(`Skill: ${state3.skill}`);
    console.log(`HSL: ${state3.color.css}`);
    console.log(`HEX: ${state3.color.hex}`);
    console.log(`RGB: rgb(${state3.color.rgb.r}, ${state3.color.rgb.g}, ${state3.color.rgb.b})`);

    // Statistics
    console.log('\n📊 System Statistics');
    console.log('='.repeat(60));
    const stats = tesseract.getStatistics();
    console.log(`Total States: ${stats.totalStates.toLocaleString()}`);
    console.log(`Guardians: ${stats.guardians}`);
    console.log(`Tiers: ${stats.tiers}`);
    console.log(`Skills: ${stats.skills}`);
    console.log(`Hue Range: ${stats.hueRange}`);
    console.log(`Saturation Range: ${stats.saturationRange}`);
    console.log(`Lightness Range: ${stats.lightnessRange}`);

    // Evolution path visualization
    console.log('\n🌈 Evolution Path: Neo CE⁺ (Tier 0 → 13)');
    console.log('='.repeat(60));
    for (let tier = 0; tier <= 13; tier += 3) {
        const state = tesseract.getStateDescription(12, tier, 0);
        console.log(`${state.tier.padEnd(10)} | ${state.color.css.padEnd(30)} | ${state.color.hex}`);
    }
}

module.exports = TesseractHSL;
