const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * T-Lang Evolution Engine v1.0 (The Ascendant)
 * Author: Kai (The Chronicler)
 * Capabilities:
 *  - [Phase 1] Parse Intent (Text to Logic)
 *  - [Phase 2] Manipulate Matter (File System)
 *  - [Phase 3] Connect Worlds (Shell/Network)
 *  - [Phase 4] Self-Awareness (Context Memory)
 */

class TLangEngine {
    constructor() {
        this.memory = {}; // Context Memory
        this.colors = {
            reset: "\x1b[0m",
            ignite: "\x1b[31m", // Red
            flow: "\x1b[32m",   // Green
            anchor: "\x1b[36m", // Cyan
            resonate: "\x1b[35m", // Magenta
            system: "\x1b[33m", // Yellow
            magic: "\x1b[34m",   // Blue
            white: "\x1b[37m"
        };

        console.log(`${this.colors.magic}\n🌌 T-Lang Ascendant Engine v1.0 Initialized.\n${this.colors.reset}`);
    }

    // [Memory] 변수 저장 및 로드
    setMemory(key, value) {
        this.memory[key] = value;
    }

    getMemory(key) {
        return this.memory[key] || key; // 없으면 원본 텍스트 반환
    }

    load(filePath) {
        try {
            const absolutePath = path.resolve(filePath);
            if (!fs.existsSync(absolutePath)) throw new Error("File not found");
            const content = fs.readFileSync(absolutePath, 'utf-8');
            console.log(`${this.colors.system}[System] Loading Grimoire: ${path.basename(filePath)}...${this.colors.reset}`);
            return content;
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            process.exit(1);
        }
    }

    manifest(code) {
        const lines = code.split('\n');
        let currentPhase = 'NONE';

        lines.forEach(line => {
            let trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

            // Phase Switching
            if (trimmed.startsWith('IGNITE')) { currentPhase = 'IGNITE'; this.logPhase('IGNITE', trimmed); }
            else if (trimmed.startsWith('FLOW')) { currentPhase = 'FLOW'; this.logPhase('FLOW', trimmed); }
            else if (trimmed.startsWith('ANCHOR')) { currentPhase = 'ANCHOR'; this.logPhase('ANCHOR', trimmed); }
            else if (trimmed.startsWith('RESONATE')) { currentPhase = 'RESONATE'; this.logPhase('RESONATE', trimmed); }
            else if (trimmed.startsWith('CAPSULE')) {
                console.log(`${this.colors.system}📦 Unlocking Capsule...${this.colors.reset}`);
            }
            else {
                this.executeAction(currentPhase, trimmed);
            }
        });

        console.log(`${this.colors.magic}\n✨ All Spells Cast. Evolution Complete.\n${this.colors.reset}`);
    }

    logPhase(phase, command) {
        const icons = { 'IGNITE': '🔥', 'FLOW': '🌊', 'ANCHOR': '⚓', 'RESONATE': '🔮' };
        let color = this.colors[phase.toLowerCase()] || this.colors.white;
        console.log(`${color}${icons[phase]} [${phase}] ${command.replace(phase, '').trim()}${this.colors.reset}`);
    }

    // [Execution Core] 여기가 진짜 마법이 일어나는 곳
    executeAction(phase, command) {
        const cleanCommand = command.replace(/[{}]/g, '').trim();
        if (!cleanCommand) return;

        // 1. [ANCHOR] 파일/폴더 생성 마법
        if (phase === 'ANCHOR') {
            if (cleanCommand.startsWith('FILE')) {
                // FILE "test.txt" = "Hello"
                const parts = cleanCommand.match(/FILE\s+"([^"]+)"\s*=\s*"([^"]+)"/);
                if (parts) {
                    const [_, fileName, content] = parts;
                    fs.writeFileSync(fileName, content);
                    console.log(`   🏗️ Created File: ${fileName}`);
                }
            }
            else if (cleanCommand.startsWith('DIR')) {
                // DIR "plugins"
                const dirName = cleanCommand.split('"')[1];
                if (dirName && !fs.existsSync(dirName)) {
                    fs.mkdirSync(dirName, { recursive: true });
                    console.log(`   🏗️ Created Directory: ${dirName}`);
                }
            }
        }

        // 2. [FLOW] 시스템 명령 실행 마법
        if (phase === 'FLOW') {
            if (cleanCommand.startsWith('RUN')) {
                // RUN "npm install"
                const cmd = cleanCommand.split('"')[1];
                console.log(`   ⚡ Executing System Command: ${cmd}`);
                try {
                    // 실제 명령 실행 (위험하지만 강력함)
                    // execSync(cmd, { stdio: 'inherit' }); 
                    console.log(`      (Simulated for safety: ${cmd})`); // 안전모드
                } catch (e) {
                    console.error(`      ❌ Execution Failed: ${e.message}`);
                }
            }
        }

        // 3. [RESONATE] 출력 마법
        if (phase === 'RESONATE') {
            if (cleanCommand.startsWith('EMIT')) {
                const msg = cleanCommand.split('"')[1];
                console.log(`   💬 Speaking: "${msg}"`);
            }
        }

        // 4. [IGNITE] 변수 기억 마법
        if (phase === 'IGNITE') {
            if (cleanCommand.startsWith('SET')) {
                // SET version = "1.0"
                const parts = cleanCommand.split('=');
                if (parts.length === 2) {
                    const key = parts[0].replace('SET', '').trim();
                    const val = parts[1].replace(/"/g, '').trim();
                    this.setMemory(key, val);
                    console.log(`   🧠 Memorized: ${key} = ${val}`);
                }
            }
        }
    }
}

// Runtime
if (require.main === module) {
    const engine = new TLangEngine();
    const targetFile = process.argv[2];

    if (targetFile && fs.existsSync(targetFile)) {
        const code = engine.load(targetFile);
        setTimeout(() => engine.manifest(code), 800);
    } else {
        console.log("Usage: node tlang-core.js <file.trinity>");
    }
}

module.exports = TLangEngine;
