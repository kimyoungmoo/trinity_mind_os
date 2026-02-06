const fs = require('fs');
const path = require('path');

// SSoT Data (Normally we would load these from JSON, but for now we hardcode or read if files exist)
// In a real scenario, we'd read from ../core/trinity.agents.json etc.

const STATE_FILE = path.join(process.cwd(), '.neo_state');

class NeoBridge {
    constructor() {
        this.agents = this.loadAgents();
    }

    loadAgents() {
        // In production, we need to know where these files are. 
        // For now, let's look in the expected development path or fallback
        try {
            const corePath = path.resolve(__dirname, '../../../../core/trinity.agents.json'); // dev path
            if (fs.existsSync(corePath)) {
                return JSON.parse(fs.readFileSync(corePath, 'utf8')).agents;
            }
        } catch (e) {
            console.error("Failed to load agents:", e);
        }

        // Fallback if file not found (lite version)
        return [
            { id: 'A01', name: 'The One', codename: 'neo', phase: 'CE+', signature_quote: 'Vision ignited.' },
            { id: 'A02', name: 'The Mentor', codename: 'morpheus', phase: 'CE0', signature_quote: 'Clarity is path.' },
            // ... we can implement efficient loading later
        ];
    }

    getCurrentState() {
        let state = { phase: 'CE+', history: [] };
        if (fs.existsSync(STATE_FILE)) {
            try {
                state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
            } catch (e) {
                console.error("State load error:", e);
            }
        }
        return state;
    }

    async executeAgent(phaseId) {
        // This connects to the real neo_runner logic
        // For this prototype, we will simulate the runner's effect

        // 1. Read state
        const state = this.getCurrentState();

        // 2. Simulate work (delay)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 3. Update state (mock transition for now if real runner isn't imported)
        // In full version, we'd require('../core/neo_runner.js').main()

        return {
            success: true,
            agent: this.getAgentByPhase(phaseId),
            output: "Work simulated."
        };
    }

    getAgentByPhase(phaseId) {
        // Mock simple lookup or load from SSoT
        const map = {
            'CE+': { name: 'The One', codename: 'neo' },
            'CE0': { name: 'The Mentor', codename: 'morpheus' },
            'CE-': { name: 'The Hacker', codename: 'trinity' },
            'AQ+': { name: 'The Operator', codename: 'tank' },
            'AQ0': { name: 'The Guardian', codename: 'seraph' },
            'AQ-': { name: 'The Captain', codename: 'niobe' },
            'GF+': { name: 'The Seer', codename: 'oracle' },
            'GF0': { name: 'The Program', codename: 'sati' },
            'GF-': { name: 'The Executor', codename: 'agent_smith' },
            'HM+': { name: 'The Council', codename: 'zion_council' },
            'HM0': { name: 'The Awakener', codename: 'spoon_boy' },
            'HM-': { name: 'The Defender', codename: 'mifune' },
            'SR0': { name: 'The Creator', codename: 'architect' }
        };
        return map[phaseId] || map['CE+'];
    }
}

module.exports = new NeoBridge();
