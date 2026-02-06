import { defineConfig } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
    main: {
        build: {
            outDir: 'dist-electron/main',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/main/index.js')
                }
            }
        }
    },
    preload: {
        build: {
            outDir: 'dist-electron/preload',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/preload/index.js')
                }
            }
        }
    },
    renderer: {
        root: 'src/renderer',
        base: './',
        build: {
            outDir: resolve(__dirname, 'dist-electron/renderer'),
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/renderer/index.html')
                }
            }
        }
    }
})
