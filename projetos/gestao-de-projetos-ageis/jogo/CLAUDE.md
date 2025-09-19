# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 2D platform game built with Pygame for a "Gestão de Projetos Ageis" (Agile Project Management) course at FATEC. The entire game is contained in a single `main.py` file as a monolithic structure.

## Commands

### Running the Game
```bash
python3 main.py
```

### Installing Dependencies
The game requires pygame. Use the requirements file:
```bash
pip install -r requirements.txt
```

Or manually install pygame:
```bash
pip install pygame==2.5.2
```

### Building Executable
The project uses PyInstaller to create standalone executables:
```bash
pip install pyinstaller
pyinstaller jogo-plataforma.spec
```

## Game Architecture

### Core Structure
The game follows a monolithic architecture with all components defined in `main.py`:

- **Game Loop**: Main game loop at `main.py:550` handles game state and restarts
- **Start Screen**: `show_start_screen()` function at `main.py:522`
- **Main Game Logic**: `main()` function at `main.py:291` contains the core game loop
- **Sprite Classes**: All game entities defined as Pygame sprite classes

### Key Classes

**Player (`main.py:80`)**
- Handles movement, jumping, health system, invincibility frames
- Sprite animation based on movement state (idle, running, jumping)
- Health system with knockback effects

**Platform (`main.py:153`)**
- Static platforms with optional goal flag
- Uses `is_goal` parameter to distinguish victory platform

**SpikePlatform (`main.py:164`)**
- Static spike hazards
- `MovingSpikePlatform` subclass for vertical movement

**Enemy (`main.py:186`)**
- Horizontal patrol movement with shooting capabilities
- Some enemies can shoot bullets at the player

**Bullet (`main.py:221`)**
- Projectiles fired by enemies with boundary checking

**Coin (`main.py:258`)**
- Collectible items that increase score

### Game Systems

**Camera System (`main.py:489`)**
- Side-scrolling camera that follows the player
- Uses `map_offset_x` to render world relative to player position
- Player sprite rendered at fixed screen position while world scrolls

**Health System (`main.py:267`)**
- Player has 3 health points displayed as circles
- Invincibility frames prevent rapid damage
- Knockback effect on damage

**Level Design (`main.py:314`)**
- Hardcoded level layout with platforms, enemies, and coins
- Progressive difficulty with parkour section at the end

### Asset Organization

- `imagens/`: Player sprites, platform textures, enemy sprites, background
- Assets loaded with fallback to solid colors if files missing
- Unused asset files have been removed from the project

### Scaling System

The game uses a `SCALE_FACTOR` of 1.07 applied to all dimensions for consistent upscaling from the base 800x600 resolution.

## CI/CD and Deployment

### GitHub Actions
The project includes automated workflows for building executables:

- **build-executables.yml**: Builds for Windows, Linux, and macOS on push/PR
- **build-dev.yml**: Manual development builds for specific platforms
- **release.yml**: Creates releases with executables for version tags

### Release Process
1. Create and push a version tag: `git tag v1.0.0 && git push origin v1.0.0`
2. GitHub Actions automatically builds executables for all platforms
3. Creates a GitHub release with downloadable binaries

### PyInstaller Configuration
- Spec file: `jogo-plataforma.spec`
- Includes `imagens/` folder in the bundle
- Creates single executable with `--onefile`
- No console window for cleaner user experience

## Important Notes

- Audio functionality has been removed from the code
- All game logic is contained in a single monolithic file
- Camera system prevents double-rendering of player sprite
- Game uses sprite groups for collision detection and rendering
- Temporary and duplicate files have been cleaned from the project
- Executable builds automatically include all required assets
