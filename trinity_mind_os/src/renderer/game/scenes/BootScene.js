export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'LOADING...', {
            font: '20px Press Start 2P',
            fill: '#00ff00'
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px Press Start 2P',
            fill: '#ffffff'
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Load assets
        // Load 13 Agent Sprites
        const agents = [
            'neo', 'morpheus', 'trinity',
            'tank', 'seraph', 'niobe',
            'oracle', 'sati', 'agent_smith',
            'zion_council', 'spoon_boy', 'mifune', 'architect'
        ];

        agents.forEach(id => {
            this.load.image(`agent_${id}`, `assets/sprites/${id}.png`);
        });
    }

    create() {
        // Transition to main scene
        this.time.delayedCall(500, () => {
            this.scene.start('MainScene');
        });
    }
}
