/**
 * Trinity Evolution Engine
 * Converts token consumption into character evolution
 */

class EvolutionEngine {
    constructor() {
        this.TIER_THRESHOLDS = {
            0: 0,        // Proto
            1: 1000,     // Tier 1
            2: 5000,     // Tier 2
            3: 15000,    // Tier 3
            4: 35000,    // Tier 4
            5: 70000,    // Tier 5
            6: 120000,   // Tier 6
            7: 200000,   // Tier 7
            8: 300000,   // Tier 8
            9: 450000,   // Tier 9
            10: 650000,  // Tier 10
            11: 900000,  // Tier 11
            12: 1200000, // Tier 12
            13: 1690000  // Origin
        };

        this.TOKEN_TO_EXP_RATIO = 1; // 1 token = 1 EXP
    }

    /**
     * Calculate current tier based on total EXP
     */
    calculateTier(totalExp) {
        for (let tier = 13; tier >= 0; tier--) {
            if (totalExp >= this.TIER_THRESHOLDS[tier]) {
                return tier;
            }
        }
        return 0;
    }

    /**
     * Get progress to next tier
     */
    getProgressToNextTier(totalExp) {
        const currentTier = this.calculateTier(totalExp);
        if (currentTier === 13) {
            return { percent: 100, current: totalExp, needed: 0 };
        }

        const currentThreshold = this.TIER_THRESHOLDS[currentTier];
        const nextThreshold = this.TIER_THRESHOLDS[currentTier + 1];
        const progress = totalExp - currentThreshold;
        const needed = nextThreshold - currentThreshold;
        const percent = (progress / needed) * 100;

        return {
            percent: Math.min(percent, 100),
            current: progress,
            needed: needed
        };
    }

    /**
     * Process token consumption and return evolution event
     */
    consumeTokens(character, tokensUsed) {
        const expGained = tokensUsed * this.TOKEN_TO_EXP_RATIO;
        const oldTier = character.tier;
        const oldExp = character.totalExp;

        character.totalExp += expGained;
        character.tier = this.calculateTier(character.totalExp);

        const leveledUp = character.tier > oldTier;

        return {
            expGained,
            oldTier,
            newTier: character.tier,
            leveledUp,
            totalExp: character.totalExp,
            progress: this.getProgressToNextTier(character.totalExp)
        };
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
     * Get character's full form name
     */
    getFormName(guardianId, tier) {
        // guardianId: 0-12 (13 guardians)
        // tier: 0-13
        const guardianNames = [
            'Spark', 'Flux', 'Volt', 'Prism', 'Nexus', 'Cipher',
            'Echo', 'Pulse', 'Vortex', 'Zenith', 'Aether', 'Omega', 'Neo'
        ];

        const tierSuffixes = {
            0: '°',
            1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵',
            6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', 10: '¹⁰',
            11: '¹¹', 12: '¹²', 13: '∞'
        };

        return `${guardianNames[guardianId]}${tierSuffixes[tier]}`;
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EvolutionEngine;
}
