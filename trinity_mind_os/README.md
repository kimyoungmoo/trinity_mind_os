# Trinity Mind OS

**16-bit Retro Game Style Workflow Visualizer for Antigravity**

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## Project Structure

```
trinity_mind_os/
├── src/
│   ├── main/           # Electron main process
│   ├── preload/        # IPC bridge
│   └── renderer/       # Phaser game UI
│       ├── game/
│       │   └── scenes/
│       ├── assets/
│       └── styles/
└── core/               # NEO engine (symlink to ../core)
```

## Features

- ✅ 16-bit retro game aesthetic
- ✅ Real-time agent visualization
- ✅ 13-phase workflow timeline
- ✅ Matrix-style effects
- ✅ Custom window controls
- 🚧 NEO runner integration (coming soon)
- 🚧 Antigravity API bridge (coming soon)

## Development

Current Status: **Phase 1 Complete** ✓
- Electron + Vite + Phaser setup
- Basic UI structure
- Retro styling with CRT effects

Next: **Phase 2** - Load 16-bit sprites and animations

## Tech Stack

- Electron 28
- Phaser 3.70
- Vite 5
- Vanilla JS (ES6+)

---

*Trinity Mind OS v1.0 - MindPlayer for Antigravity*
