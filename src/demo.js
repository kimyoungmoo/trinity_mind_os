/**
 * Trinity Mind OS - Demo Runner
 * Simulates the evolution experience
 */

const EvolutionEngine = require('./evolution-engine');
const Character = require('./character');

class TrinityDemo {
    constructor() {
        this.engine = new EvolutionEngine();
        this.character = null;
    }

    /**
     * Initialize a new character
     */
    initCharacter(guardianId = 12, guardianName = 'Neo') {
        this.character = new Character(guardianId, guardianName);
        console.log(`\n🌟 Character Created: ${this.character.getFormName()}`);
        console.log(`Starting at Tier 0 (Proto) with 0 EXP\n`);
        return this.character;
    }

    /**
     * Simulate a coding task that consumes tokens
     */
    simulateTask(taskName, tokensUsed) {
        console.log(`\n📝 Task: "${taskName}"`);
        console.log(`💎 Tokens consumed: ${tokensUsed}`);

        const result = this.engine.consumeTokens(this.character, tokensUsed);
        this.character.totalTokensConsumed += tokensUsed;

        console.log(`✨ EXP gained: +${result.expGained}`);
        console.log(`📊 Total EXP: ${result.totalExp}`);
        console.log(`🎯 Progress to next tier: ${result.progress.percent.toFixed(1)}%`);

        if (result.leveledUp) {
            this.character.recordEvolution(result.oldTier, result.newTier, result.totalExp);
            console.log(`\n🎉 LEVEL UP! ${this.engine.getTierName(result.oldTier)} → ${this.engine.getTierName(result.newTier)}`);
            console.log(`🔥 New form: ${this.character.getFormName()}`);
        }

        return result;
    }

    /**
     * Display character status
     */
    displayStatus() {
        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`Character: ${this.character.getFormName()}`);
        console.log(`Tier: ${this.engine.getTierName(this.character.tier)}`);
        console.log(`Total EXP: ${this.character.totalExp}`);
        console.log(`Tokens Consumed: ${this.character.totalTokensConsumed}`);

        const progress = this.engine.getProgressToNextTier(this.character.totalExp);
        if (this.character.tier < 13) {
            console.log(`Next Tier: ${progress.current}/${progress.needed} (${progress.percent.toFixed(1)}%)`);
        } else {
            console.log(`Status: ORIGIN FORM ACHIEVED ∞`);
        }
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    }

    /**
     * Run the 5-minute demo experience
     */
    runFiveMinuteDemo() {
        console.log(`
╔═══════════════════════════════════════════╗
║   TRINITY MIND OS - 5 MINUTE DEMO        ║
║   Experience Your First Evolution        ║
╚═══════════════════════════════════════════╝
    `);

        // Initialize character
        this.initCharacter(12, 'Neo');

        // Simulate tasks
        this.simulateTask('Generate login component', 250);
        this.simulateTask('Create API endpoint', 300);
        this.simulateTask('Write unit tests', 200);
        this.simulateTask('Refactor authentication logic', 350);

        // Display final status
        this.displayStatus();

        // Show evolution history
        if (this.character.evolutionHistory.length > 0) {
            console.log(`\n📜 Evolution History:`);
            this.character.evolutionHistory.forEach((evt, idx) => {
                const date = new Date(evt.timestamp).toLocaleTimeString();
                console.log(`  ${idx + 1}. [${date}] Tier ${evt.fromTier} → Tier ${evt.toTier} (${evt.totalExp} EXP)`);
            });
        }

        console.log(`\n✨ Demo complete! Your Neo has evolved from Proto to ${this.character.getFormName()}`);
        console.log(`💡 This is just the beginning of your journey through 169 forms...\n`);
    }
}

// Run demo if executed directly
if (require.main === module) {
    const demo = new TrinityDemo();
    demo.runFiveMinuteDemo();
}

module.exports = TrinityDemo;
