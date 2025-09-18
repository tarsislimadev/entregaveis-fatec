import { initGame } from './game.js';

// Initialize the game when loaded as a module
export default function init() {
    return initGame();
}

// Auto-initialize if loaded directly
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        init();
    });
}