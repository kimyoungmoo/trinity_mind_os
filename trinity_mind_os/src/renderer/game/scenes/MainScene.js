export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Matrix Rain Background (placeholder)
        this.createMatrixRain();

        // Title
        const title = this.add.text(width / 2, 50, 'TRINITY MIND OS', {
            font: '32px Press Start 2P',
            fill: '#00ff00',
            stroke: '#000000',
            strokeThickness: 4
        });
        title.setOrigin(0.5);

        // Status Text
        const statusText = this.add.text(width / 2, 120, 'System Initializing...', {
            font: '16px VT323',
            fill: '#00ff00'
        });
        statusText.setOrigin(0.5);

        // Agent Display
        const agentSprite = this.add.sprite(width / 2, height / 2 - 50, 'agent_neo');
        agentSprite.setScale(4); // Scale up for 16-bit look

        // We'll add animation later when we have spritesheets
        // agentSprite.play('agent_idle'); 

        // Box around agent
        const agentBox = this.add.rectangle(width / 2, height / 2, 400, 300);
        agentBox.setStrokeStyle(2, 0x00ff00);

        const agentText = this.add.text(width / 2, height / 2 - 100, 'THE ONE', {
            font: '24px Press Start 2P',
            fill: '#ffffff'
        });
        agentText.setOrigin(0.5);

        const quoteText = this.add.text(width / 2, height / 2, '"Vision ignited.\nLet\'s begin."', {
            font: '14px VT323',
            fill: '#00ff00',
            align: 'center'
        });
        quoteText.setOrigin(0.5);

        // Phase Timeline (placeholder)
        const phases = ['CE+', 'CE0', 'CE-', 'AQ+', 'AQ0', 'AQ-', 'GF+', 'GF0', 'GF-', 'HM+', 'HM0', 'HM-', 'SR0'];
        const startX = 100;
        const y = height - 100;
        const spacing = 70;

        phases.forEach((phase, index) => {
            const phaseText = this.add.text(startX + index * spacing, y, phase, {
                font: '12px Press Start 2P',
                fill: index === 0 ? '#00ff00' : '#666666'
            });
            phaseText.setOrigin(0.5);
        });

        // Console Log Area
        const consoleY = height - 50;
        const consoleText = this.add.text(20, consoleY, '> System ready. Awaiting commands...', {
            font: '12px VT323',
            fill: '#00ff00'
        });

        // Typing cursor animation
        const cursor = this.add.text(consoleText.x + consoleText.width + 5, consoleY, '█', {
            font: '12px VT323',
            fill: '#00ff00'
        });

        this.tweens.add({
            targets: cursor,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    createMatrixRain() {
        // Simple matrix rain effect using particles
        const particles = this.add.particles(0, 0, 'white', {
            x: { min: 0, max: this.cameras.main.width },
            y: -10,
            lifespan: 3000,
            speedY: { min: 100, max: 300 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 0.8, end: 0 },
            tint: 0x00ff00,
            frequency: 50,
            blendMode: 'ADD'
        });
    }

    update() {
        // Poll for state updates (simple polling for now)
        if (!this.lastPoll || Date.now() - this.lastPoll > 1000) {
            this.lastPoll = Date.now();
            this.fetchState();
        }
    }

    async fetchState() {
        if (window.neoAPI) {
            try {
                const state = await window.neoAPI.getState();
                if (state && state.phase) {
                    this.updateUI(state);
                }
            } catch (e) {
                console.error("Failed to fetch state:", e);
            }
        }
    }

    updateUI(state) {
        // Update Phase
        // console.log("Current Phase:", state.phase);

        // Update Agent Display based on phase
        const phaseMap = {
            'CE+': 'neo', 'CE0': 'morpheus', 'CE-': 'trinity',
            'AQ+': 'tank', 'AQ0': 'seraph', 'AQ-': 'niobe',
            'GF+': 'oracle', 'GF0': 'sati', 'GF-': 'agent_smith',
            'HM+': 'zion_council', 'HM0': 'spoon_boy', 'HM-': 'mifune',
            'SR0': 'architect'
        };

        const agentId = phaseMap[state.phase] || 'neo';

        // Only update if changed
        if (this.currentAgentId !== agentId) {
            this.currentAgentId = agentId;

            // Update Sprite (assuming agentSprite is stored in a class property or we find it)
            // Ideally we should structure MainScene better, but for now let's rebuild the scene or just find the sprite
            // Since we didn't save references, let's just log for now to prove IPC works
            // In next iteration we will refactor MainScene to hold references

            // Quick fix: find sprite by texture key prefix
            const sprite = this.children.list.find(c => c.type === 'Sprite');
            if (sprite) {
                sprite.setTexture(`agent_${agentId}`);
            }
        }
    }
}
