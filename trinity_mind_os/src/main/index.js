const { app, BrowserWindow } = require('electron');
const path = require('path');
const { setupHandlers } = require('./ipc-handlers');

// Setup IPC handlers
setupHandlers();

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        frame: false,
        resizable: false,
        backgroundColor: '#000000',
        webPreferences: {
            preload: path.join(__dirname, '../preload/index.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Load the renderer
    if (!app.isPackaged) {
        // Development mode
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        // Production mode
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Export for IPC handlers
module.exports = { getMainWindow: () => mainWindow };
