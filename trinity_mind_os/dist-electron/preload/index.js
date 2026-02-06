"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("neoAPI", {
  // Get current state
  getState: () => ipcRenderer.invoke("neo:getState"),
  // Run agent for specific phase
  runAgent: (phaseId) => ipcRenderer.invoke("neo:runAgent", phaseId),
  // Subscribe to real-time updates
  onAgentWorking: (callback) => {
    ipcRenderer.on("neo:agentWorking", (event, data) => callback(data));
  },
  onPhaseTransition: (callback) => {
    ipcRenderer.on("neo:phaseTransition", (event, data) => callback(data));
  },
  // Window controls
  minimizeWindow: () => ipcRenderer.send("window:minimize"),
  maximizeWindow: () => ipcRenderer.send("window:maximize"),
  closeWindow: () => ipcRenderer.send("window:close")
});
