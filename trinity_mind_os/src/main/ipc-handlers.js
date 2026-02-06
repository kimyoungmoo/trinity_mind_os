const { ipcMain, BrowserWindow } = require('electron');
const neoBridge = require('./neo-bridge');

function setupHandlers() {
    ipcMain.handle('neo:getState', async () => {
        return neoBridge.getCurrentState();
    });

    ipcMain.handle('neo:runAgent', async (event, phaseId) => {
        const result = await neoBridge.executeAgent(phaseId);

        // Return result
        return result;
    });

    // Window controls
    ipcMain.on('window:minimize', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        win.minimize();
    });

    ipcMain.on('window:maximize', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });

    ipcMain.on('window:close', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        win.close();
    });
}

module.exports = { setupHandlers };
