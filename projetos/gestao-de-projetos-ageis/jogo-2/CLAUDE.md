# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 2D platform game developed with PyGame for the FATEC course "Gestão de Projetos Ágeis" (Agile Project Management). The game is a single-file Python application with sprite-based graphics and audio.

## Architecture

### Core Structure

The game is implemented in `main.py` (~815 lines) as a monolithic file with the following architecture:

**Game Classes (Sprite-based)**:
- `Player`: Main character with health system (3 HP), invincibility frames, knockback, shooting ability, and animation states (idle/running/jumping × left/right)
- `Platform`: Static ground surfaces. Special variant with `is_goal=True` for the victory condition
- `SpikePlatform`: Static hazardous platforms that damage on contact
- `MovingSpikePlatform`: Vertically oscillating spike platforms with configurable bounds
- `Enemy`: Horizontally patrolling enemies that can optionally shoot bullets
- `Boss`: AI-controlled boss that chases the player within a defined battle arena (x: 3100-4900 scaled units)
- `Bullet`: Enemy projectiles with bounded horizontal range
- `PlayerBullet`: Player's weapon projectiles (requires collecting `AbilityCoin` first)
- `MovingHazard`: Generic vertical hazard (currently unused in level design)
- `Coin`: Collectible score items (+1 point)
- `AbilityCoin`: Special item that grants shooting ability to the player
- `Wall`: Destructible obstacle requiring multiple hits (20 HP), blocks player movement and bullets

**Game Mechanics**:
- Physics: Gravity-based jumping with `velocity_y += 0.8 * SCALE_FACTOR`, jump impulse of `-15 * SCALE_FACTOR`
- Camera: Side-scrolling camera follows player with `map_offset_x = player.real_x - (SCREEN_WIDTH // 2)`
- Collision: Separate X/Y axis collision detection with platform/wall groups
- Damage: 1-second invincibility window with visual flashing and directional knockback
- Score: Coins (+1), enemy kills (+5), bullet kills (+10)

**Level Design**:
The game uses a horizontal progression with these key areas:
1. Starting area (x: 0-500): Tutorial ground with first enemy
2. Platform section (x: 580-950): Vertical jumping challenges
3. Moving hazards zone (x: 1250-2400): Three vertical spike platforms + shooting enemies
4. Pre-boss transition (x: 2450-2900): Platform jumps leading to ability pickup
5. Boss arena (x: 3100-4900): Extended battle area with multiple platforms and destructible wall
6. Victory platform (x: 5000+): Goal platform (requires boss defeat)

### Asset Organization

```
jogo-2/
├── main.py                    # Complete game implementation
├── tempCodeRunnerFile.py     # Development artifact with partial lives system
├── requirements.txt          # Python dependencies (pygame==2.6.1)
├── level_design.txt          # Empty file (design likely in main.py)
├── imagens/                  # Sprite assets (PNG)
│   ├── *direita.png / *esquerda.png     # Player/enemy animations
│   ├── block_*.png                       # Platform/spike tiles
│   ├── final_platform_tall_pole.png     # Goal marker
│   ├── tank_serra_*.png                 # Boss sprites
│   ├── ufo_*.png                        # Wall sprite
│   └── pistol_ground_32x32.png          # Weapon pickup
├── audio/                    # Sound effects (MP3)
│   ├── 8bit-music-for-game-68698.mp3
│   ├── game-start-317318.mp3
│   ├── collect-points-190037.mp3
│   └── videogame-death-sound-43894.mp3
└── final_platform_*.png      # Alternative goal sprites (root level)
```

**Important Notes**:
- Uses Windows-style path separators (`r"imagens\file.png"`) - may need adjustment for cross-platform compatibility
- `load_image()` and `load_sound()` include fallback rendering when assets are missing
- `SCALE_FACTOR = 1.00` provides resolution scaling (currently 800×600 base)

## Common Commands

### Installing Dependencies

```bash
# Install dependencies
pip install -r requirements.txt

# Or manually install pygame
pip install pygame
```

### Running the Game

```bash
python main.py
```

**Requirements**: Python 3.9+ with PyGame 2.6.1+

### Controls

- **Arrow Keys**: Move left/right
- **Space**: Jump
- **D Key**: Shoot (only after collecting the gun item at x=2950)

### Building Executables

The project has CI/CD configured via GitHub Actions (see `../.github/workflows/release-pygame-game.yml`). To build locally:

```bash
# Install PyInstaller
pip install pyinstaller

# Build Linux executable
pyinstaller --onefile --add-data "imagens:imagens" --add-data "audio:audio" main.py

# Output will be in dist/main
```

**Note**: The workflow builds for the sibling `jogo/` directory, not this `jogo-2/` version. Adjust paths if adapting the workflow.

## Development Notes

### Key Variables to Adjust

- `SCALE_FACTOR`: Global resolution multiplier (line 11)
- `FPS`: Frame rate, default 60 (line 31)
- Player starting position: `Player(100, 600 - 80)` (line 448)
- Boss battle arena bounds: `3100` to `3100 + 1800` scaled units (lines 265-266)

### Adding New Entities

1. **Enemy**: `Enemy(x, y, width, height, speed, left_bound, right_bound, shoots=False)`
2. **Platform**: `Platform(x, y, width, height, is_goal=False)`
3. **Moving Spike**: `MovingSpikePlatform(x, y, width, height, speed, top_bound, bottom_bound)`
4. **Coin**: `Coin(x, y)` - add to `coin_positions` list at line 512

### Death Causes (for debugging)

The game tracks death reasons: `'caiu'` (fell), `'espetado'` (spiked), `'atingido_por_bala'` (shot), `'colidiu_inimigo'` (enemy collision), `'colidiu_boss'` (boss collision).

### Known Issues

- `tempCodeRunnerFile.py` contains an incomplete lives system implementation (different from main.py's health system)
- Boss sprite directions are swapped: `boss_direita_image = boss_esquerda` (line 251)
- Player bullets have hardcoded screen bounds check (line 335) that may need adjustment for larger levels

## Core Architecture Details

### Sprite System
All game entities inherit from `pygame.sprite.Sprite` and are organized into logical groups:
- `all_sprites`: Master group for rendering
- `platforms`: Collision detection with ground surfaces
- `enemies`: AI entities requiring update cycles
- `bullets`: Projectile management and cleanup
- `coins`: Collectible item detection

### Physics Engine
The game implements a custom physics system:
- **Gravity**: Applied every frame with `velocity_y += 0.8 * SCALE_FACTOR`
- **Collision Detection**: Separate X/Y axis processing prevents tunneling
- **World Coordinates**: `real_x` tracks absolute position, `rect.x` for rendering
- **Camera System**: Side-scrolling with `map_offset_x` translation

### Game Loop Architecture
1. **Event Processing**: Keyboard input, quit events
2. **Entity Updates**: Physics, AI, animation state changes
3. **Collision Detection**: Multi-pass collision resolution
4. **Camera Update**: Viewport positioning based on player location
5. **Rendering**: Sprite drawing with camera offset translation
6. **Audio Management**: Event-triggered sound effects

## Game State Flow

```
Start Screen (press ENTER)
    ↓
Main Game Loop
    ↓
  (Win) → Victory Screen (press ENTER to replay)
    ↓
(Death) → Game Over Screen (press ENTER to retry)
```

Each screen is handled by dedicated functions: `show_start_screen()`, `show_win_screen(score)`, `show_game_over_screen(death_cause, score)`.