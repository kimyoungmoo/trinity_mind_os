import Phaser from 'phaser';
import BootScene from './game/scenes/BootScene.js';
import MainScene from './game/scenes/MainScene.js';

// Phaser Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 720, // 768 - 48 (titlebar height)
    parent: 'game-container',
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [BootScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

// Initialize game
const game = new Phaser.Game(config);

// Window controls
document.getElementById('minimize-btn')?.addEventListener('click', () => {
    window.neoAPI.minimizeWindow();
});

document.getElementById('maximize-btn')?.addEventListener('click', () => {
    window.neoAPI.maximizeWindow();
});

document.getElementById('close-btn')?.addEventListener('click', () => {
    window.neoAPI.closeWindow();
});

// Export game instance
window.game = game;
