/**
 * 4D Tesseract HSL Calculator (Complete System)
 * X=Guardian, Y=Tier, Z=Skill, W=Generation
 */

class Tesseract4D {
    constructor() {
        this.GUARDIANS = 13;
        this.TIERS = 14;      // 0-13
        this.SKILLS = 13;
        this.GENERATIONS = 13; // W0-W12
        this.TOTAL_STATES = this.GUARDIANS * this.TIERS * this.SKILLS * this.GENERATIONS; // 30,758
    }

    /**
     * Calculate complete 4D state
     * @param {number} guardianId - 0 to 12
     * @param {number} tier - 0 to 13
     * @param {number} skillId - 0 to 12
     * @param {number} generation - 0 to 12 (W-axis)
     * @returns {object} Complete state information
     */
    calculate(guardianId, tier, skillId, generation) {
        // Validate inputs
        if (guardianId < 0 || guardianId > 12) throw new Error('Guardian ID must be 0-12');
        if (tier < 0 || tier > 13) throw new Error('Tier must be 0-13');
        if (skillId < 0 || skillId > 12) throw new Error('Skill ID must be 0-12');
        if (generation < 0 || generation > 12) throw new Error('Generation must be 0-12');

        // Base HSL (3D)
        const H = (guardianId / this.GUARDIANS) * 360;
        const S = (tier / this.GUARDIANS) * 100;
        const L = 50 + (skillId / this.GUARDIANS) * 25;

        // W-axis properties
        const inheritedDNA = (generation / this.GUARDIANS) * 100;
        const evolutionSpeed = this.getFibonacci(generation);
        const auraIntensity = (generation / 12) * 100;

        return {
            coordinates: {
                x: guardianId,
                y: tier,
                z: skillId,
                w: generation
            },
            color: {
                h: parseFloat(H.toFixed(2)),
                s: parseFloat(S.toFixed(2)),
                l: parseFloat(L.toFixed(2)),
                css: `hsl(${H.toFixed(1)}, ${S.toFixed(1)}%, ${L.toFixed(1)}%)`,
                hex: this.hslToHex(H, S, L)
            },
            generation: {
                name: this.getGenerationName(generation),
                inheritedDNA: parseFloat(inheritedDNA.toFixed(1)),
                evolutionSpeed: evolutionSpeed,
                auraIntensity: parseFloat(auraIntensity.toFixed(1))
            },
            visual: {
                aura: `0 0 ${Math.round(generation * 4)}px rgba(255,255,255,${auraIntensity / 100})`,
                particles: Math.round(Math.pow(2, generation)),
                zIndex: generation
            }
        };
    }

    /**
     * Fibonacci sequence for evolution speed
     */
    getFibonacci(n) {
        if (n <= 1) return 1;
        let a = 1, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    }

    /**
     * Get generation name
     */
    getGenerationName(generation) {
        const names = [
            'Genesis', 'Awakening', 'Learning', 'Integration',
            'Acceleration', 'Transcendence', 'Fusion', 'Luminous',
            'Harmony', 'Infinite', 'Creation', 'Unity', 'The One'
        ];
        return names[generation];
    }

    /**
     * HSL to HEX conversion
     */
    hslToHex(h, s, l) {
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

        const toHex = (n) => {
            const hex = Math.round(n * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    /**
     * Get statistics
     */
    getStatistics() {
        return {
            totalStates: this.TOTAL_STATES,
            dimensions: 4,
            guardians: this.GUARDIANS,
            tiers: this.TIERS,
            skills: this.SKILLS,
            generations: this.GENERATIONS
        };
    }
}

// Demo
if (require.main === module) {
    const tesseract = new Tesseract4D();

    console.log('🌌 4D Tesseract Calculator\n');
    console.log('='.repeat(70));

    // Same position, different dimensions
    console.log('\n📍 Same Position (Neo Proto CE⁺), Different Generations:\n');

    for (let w of [0, 1, 6, 12]) {
        const state = tesseract.calculate(12, 0, 0, w);
        console.log(`W${w} (${state.generation.name}):`);
        console.log(`  Color: ${state.color.css} (${state.color.hex})`);
        console.log(`  DNA: ${state.generation.inheritedDNA}%`);
        console.log(`  Speed: ${state.generation.evolutionSpeed}x`);
        console.log(`  Aura: ${state.visual.aura}`);
        console.log(`  Particles: ${state.visual.particles}`);
        console.log('');
    }

    // Statistics
    console.log('📊 System Statistics');
    console.log('='.repeat(70));
    const stats = tesseract.getStatistics();
    console.log(`Total States: ${stats.totalStates.toLocaleString()}`);
    console.log(`Dimensions: ${stats.dimensions}D`);
    console.log(`Structure: ${stats.guardians} × ${stats.tiers} × ${stats.skills} × ${stats.generations}`);
}

module.exports = Tesseract4D;
