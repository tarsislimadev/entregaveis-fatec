# Rio Streets - 2D Game

A side-scrolling 2D action game built with Three.js, set in the streets of Rio de Janeiro during morning time. Fight against police enemies in a cityscape inspired by classic games like Super Mario, Metal Slug, CupHead, Streets of Rage, and Hollow Knight.

## Features

- **2D Side-scrolling gameplay** with Three.js 3D graphics
- **Rio de Janeiro setting** with iconic landmarks (Christ the Redeemer, favelas, cityscape)
- **Police enemies** with AI behavior and shooting mechanics
- **Multiple weapon types** (Pistol, Shotgun, Rifle) with limited ammunition
- **Morning atmosphere** with beautiful sky gradients and lighting
- **Power-ups** for health, ammunition, and weapon upgrades
- **Sound effects** using Web Audio API
- **Mobile touch controls** support
- **Collision detection** and physics system

## Game Controls

### Desktop
- **WASD** or **Arrow Keys**: Move character
- **SPACE**: Jump
- **Mouse Click**: Shoot
- **1, 2, 3**: Switch weapons (Pistol, Shotgun, Rifle)
- **R**: Reload current weapon
- **ESC**: Pause/Resume game

### Mobile
- **Swipe Left/Right**: Move character
- **Swipe Up**: Jump
- **Swipe Down**: Shoot
- **Tap**: Shoot

## How to Run

### Option 1: Using npm (Recommended)
```bash
# Install dependencies
npm install

# Start the game
npm start
```

### Option 2: Using Python (if you have Python installed)
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

### Option 3: Using Node.js http-server
```bash
# Install http-server globally
npm install -g http-server

# Start the game
http-server . -p 8080 -o
```

### Option 4: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Game Mechanics

### Player
- **Health**: 100 HP (displayed in UI)
- **Movement**: Smooth horizontal movement with jumping
- **Weapons**: Three different weapon types with unique characteristics
- **Collision**: Takes damage from enemy bullets and direct contact

### Enemies (Police)
- **AI Behavior**: Move towards player and attack when in range
- **Shooting**: Fire bullets at the player
- **Health**: 50 HP each
- **Reward**: 100 points per enemy defeated
- **Visual Design**: Uses realistic suit textures (suit-1.webp, suit-2.webp) for authentic police appearance

### Weapons
1. **Pistol**: 25 damage, 30 bullets, fast fire rate
2. **Shotgun**: 50 damage, 8 bullets, slow fire rate, spread shot
3. **Rifle**: 40 damage, 20 bullets, medium fire rate, high speed

### Power-ups
- **Ammo Box**: Restores 15 bullets
- **Health Pack**: Restores 25 HP
- **Weapon Upgrade**: Switches to next weapon type

### Environment
- **Rio de Janeiro Cityscape**: Detailed buildings with windows
- **Christ the Redeemer**: Iconic statue on Corcovado mountain
- **Favelas**: Colorful houses on the hills
- **Street Elements**: Palm trees, street lights, road markings
- **Morning Sky**: Beautiful gradient with sun and clouds

## Technical Details

### Built With
- **Three.js**: 3D graphics library for WebGL (ES6 modules)
- **ES6 Modules**: Modern JavaScript module system
- **Vanilla JavaScript**: No frameworks, pure JS
- **Web Audio API**: Sound effects
- **HTML5 Canvas**: Game rendering

### File Structure
```
aula-4/
├── index.html          # Main HTML file with ES6 module imports
├── package.json        # Dependencies and scripts (type: "module")
├── README.md          # This file
└── js/
    ├── game.js        # Main game engine (ES6 module)
    ├── player.js      # Player character and controls (ES6 module)
    ├── enemies.js     # Police enemies and AI (ES6 module)
    ├── weapons.js     # Weapon system and bullets (ES6 module)
    ├── environment.js # Rio de Janeiro background (ES6 module)
    └── main.js        # Game initialization and events (ES6 module)
```

### Performance
- Optimized for 60 FPS gameplay
- Efficient collision detection using bounding boxes
- Particle systems for visual effects
- Shadow mapping for realistic lighting

## Gameplay Tips

1. **Conserve Ammunition**: Use weapons strategically, don't waste bullets
2. **Collect Power-ups**: Keep an eye out for ammo and health packs
3. **Use Jumping**: Avoid enemy bullets by jumping
4. **Weapon Switching**: Different weapons are effective in different situations
5. **Stay Mobile**: Keep moving to avoid enemy fire

## Browser Compatibility

- **Chrome**: Full support (ES6 modules supported)
- **Firefox**: Full support (ES6 modules supported)
- **Safari**: Full support (ES6 modules supported)
- **Edge**: Full support (ES6 modules supported)
- **Mobile Browsers**: Touch controls supported

**Note**: ES6 modules require a modern browser (2017+) or a local server. The game will not work when opened directly as a file (file:// protocol).

## Credits

Created as part of FATEC's Agile Project Management course (Aula 4).

Inspired by classic 2D side-scrolling games with a modern Three.js implementation.

## License

MIT License - Feel free to use and modify for educational purposes.
