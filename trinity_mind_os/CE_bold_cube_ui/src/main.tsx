

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';

// Import Bold Cube App
import BoldCubeApp from './bold-cube/BoldCubeApp';

const App = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000000' }}>
            <Toaster position="top-right" theme="dark" />
            <BoldCubeApp />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
