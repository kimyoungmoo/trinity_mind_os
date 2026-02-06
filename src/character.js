/**
 * Character State Manager
 * Manages individual character/guardian state
 */

class Character {
    constructor(guardianId, guardianName) {
        this.guardianId = guardianId;      // 0-12
        this.guardianName = guardianName;  // e.g., "Spark", "Neo"
        this.tier = 0;                     // Current tier (0-13)
        this.totalExp = 0;                 // Total EXP accumulated
        this.totalTokensConsumed = 0;      // Total tokens spent
        this.createdAt = Date.now();
        this.lastEvolutionAt = null;
        this.evolutionHistory = [];        // Array of tier milestones
    }

    /**
     * Record an evolution event
     */
    recordEvolution(oldTier, newTier, totalExp) {
        this.evolutionHistory.push({
            timestamp: Date.now(),
            fromTier: oldTier,
            toTier: newTier,
            totalExp: totalExp
        });
        this.lastEvolutionAt = Date.now();
    }

    /**
     * Get character's current form name
     */
    getFormName() {
        const tierSuffixes = {
            0: '°', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵',
            6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', 10: '¹⁰',
            11: '¹¹', 12: '¹²', 13: '∞'
        };
        return `${this.guardianName}${tierSuffixes[this.tier]}`;
    }

    /**
     * Serialize to JSON
     */
    toJSON() {
        return {
            guardianId: this.guardianId,
            guardianName: this.guardianName,
            tier: this.tier,
            totalExp: this.totalExp,
            totalTokensConsumed: this.totalTokensConsumed,
            createdAt: this.createdAt,
            lastEvolutionAt: this.lastEvolutionAt,
            evolutionHistory: this.evolutionHistory
        };
    }

    /**
     * Deserialize from JSON
     */
    static fromJSON(data) {
        const char = new Character(data.guardianId, data.guardianName);
        char.tier = data.tier;
        char.totalExp = data.totalExp;
        char.totalTokensConsumed = data.totalTokensConsumed;
        char.createdAt = data.createdAt;
        char.lastEvolutionAt = data.lastEvolutionAt;
        char.evolutionHistory = data.evolutionHistory || [];
        return char;
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Character;
}
