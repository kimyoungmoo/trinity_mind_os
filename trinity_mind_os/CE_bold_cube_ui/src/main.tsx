
import React from 'react';
import ReactDOM from 'react-dom/client';
import TrinityScene from './TrinityScene';

const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#020205' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: '#4fdcca', fontFamily: 'monospace' }}>
                <h1>TRINITY STUDIO v0.1</h1>
                <p>System Status: ONLINE</p>
                <p>Core: GF(Rust) + CE(Tauri)</p>
            </div>
            <TrinityScene />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
