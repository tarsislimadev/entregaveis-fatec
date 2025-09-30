import pygame 
import random
import os

# --- 1. CONFIGURAÇÃO INICIAL DO PYGAME ---
pygame.init()
pygame.mixer.init()

# Define a escala de ampliação
SCALE_FACTOR = 1.10
SCREEN_WIDTH = int(800 * SCALE_FACTOR)
SCREEN_HEIGHT = int(600 * SCALE_FACTOR)
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Jogo de Plataforma com Câmera (Ampliado)")

# Cores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
GRAY = (150, 150, 150)
PURPLE = (128, 0, 128)

# FPS
clock = pygame.time.Clock()
FPS = 60

# Fontes
font = pygame.font.Font(None, int(50 * SCALE_FACTOR))
score_font = pygame.font.Font(None, int(36 * SCALE_FACTOR))

# --- SISTEMA DE VIDAS ---
STARTING_LIVES = 3

def draw_lives(surface, x, y, lives):
    for i in range(lives):
        pygame.draw.circle(surface, RED, (x + 30 * i, y), 12)
        pygame.draw.circle(surface, RED, (x + 30 * i + 10, y), 12)
        pygame.draw.polygon(surface, RED, [
            (x + 30 * i - 8, y),
            (x + 30 * i + 18, y + 15),
            (x + 30 * i + 36, y)
        ])

# --- FUNÇÕES DE CARREGAMENTO ---
def load_image(path, size=None):
    try:
        full_path = os.path.join(os.path.dirname(__file__), path)
        image = pygame.image.load(full_path).convert_alpha()
        if size:
            return pygame.transform.scale(image, (int(size[0] * SCALE_FACTOR), int(size[1] * SCALE_FACTOR)))
        return pygame.transform.scale(image, (SCREEN_WIDTH, SCREEN_HEIGHT))
    except pygame.error:
        print(f"Erro: Imagem '{path}' não encontrada. Usando cor sólida.")
        surface = pygame.Surface(size if size else (SCREEN_WIDTH, SCREEN_HEIGHT))
        surface.fill(BLACK)
        return surface

def load_sound(path):
    try:
        full_path = os.path.join(os.path.dirname(__file__), path)
        return pygame.mixer.Sound(full_path)
    except pygame.error:
        print(f"Erro: Arquivo de áudio '{path}' não encontrado.")
        return None

# --- IMAGENS E ÁUDIOS ---
background_image = load_image(r"imagens\767b1183-4194-4729-a476-4e4a2325a057.png")
player_size_orig = (32, 32)
idle_right_image = load_image(r"imagens\paradodireita.png", player_size_orig)
idle_left_image = load_image(r"imagens\paradodesquerda.png", player_size_orig)
run_right_image = load_image(r"imagens\correndodireita.png", player_size_orig)
run_left_image = load_image(r"imagens\correndoesquerda.png", player_size_orig)
jump_right_image = load_image(r"imagens\pulandodireita.png", player_size_orig)
jump_left_image = load_image(r"imagens\pulandosequerda.png", player_size_orig)
enemy_right_image = load_image(r"imagens\bichinho_direita.png", player_size_orig)
enemy_left_image = load_image(r"imagens\bichinho_esquerda.png", player_size_orig)
platform_image = load_image(r"imagens\block_platform.png", (100, 20))
spike_image = load_image(r"imagens\block_spike_out_cima_baixo.png", (100, 20))
final_platform_image = load_image(r"imagens\final_platform_tall_pole.png", (130, 20))

game_music = r"audio\8bit-music-for-game-68698.mp3"
start_sound = load_sound(r"audio\game-start-317318.mp3")
coin_sound = load_sound(r"audio\collect-points-190037.mp3")
death_sound = load_sound(r"audio\videogame-death-sound-43894.mp3")

# --- CLASSES ---
# (mantém Player, Platform, SpikePlatform, MovingSpikePlatform, Enemy, Bullet, MovingHazard, Coin...)

# --- 7. FUNÇÃO PARA CRIAR E INICIAR O JOGO ---
def main(lives):
    game_over = False
    win = False
    death_cause = None
    score = 0

    all_sprites = pygame.sprite.Group()
    platforms = pygame.sprite.Group()
    spikes = pygame.sprite.Group()
    enemies = pygame.sprite.Group()
    goal_platform = pygame.sprite.Group()
    bullets = pygame.sprite.Group()
    moving_hazards = pygame.sprite.Group()
    coins = pygame.sprite.Group()

    player = Player(100, 600 - 80)
    all_sprites.add(player)

    if start_sound:
        pygame.mixer.music.set_volume(0.25)
        start_sound.play()
    
    pygame.mixer.music.load(game_music)
    pygame.mixer.music.play(-1)

    # --- LEVEL DESIGN (igual ao seu trecho) ---
    ground_start = Platform(0, 600 - 40, 500, 40)
    # (adicione aqui todas as plataformas que você já tinha...)

    # Adiciona sprites nos grupos
    platforms.add(ground_start)
    all_sprites.add(platforms, spikes, enemies, coins)

    # --- LOOP PRINCIPAL DO JOGO ---
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
                player.jump()

        # Atualizações
        all_sprites.update()

        # Renderização
        screen.blit(background_image, (0, 0))
        all_sprites.draw(screen)

        # HUD
        score_text = score_font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))
        draw_lives(screen, 150, 25, lives)

        pygame.display.flip()
        clock.tick(FPS)

        # (aqui você mantém as colisões e condições de morte/vitória)

    if not win:
        lives -= 1
        pygame.mixer.music.stop()
        if death_sound:
            death_sound.play()
        pygame.time.wait(2000)

    if win:
        return True, None, score, lives
    else:
        return False, death_cause, score, lives

# --- 8. LOOP PRINCIPAL DO PROGRAMA ---
lives = STARTING_LIVES

while True:
    game_result, death_cause, final_score, lives = main(lives)

    if game_result:
        text = font.render(f"Parabéns, você ganhou! Score: {final_score}", True, WHITE)
        screen.blit(text, text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)))
        pygame.display.flip()
        pygame.time.wait(5000)
        break
    else:
        if lives > 0:
            text = font.render(f"Você perdeu uma vida! Restam {lives} vidas.", True, WHITE)
            screen.blit(text, text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)))
            pygame.display.flip()
            pygame.time.wait(2000)
        else:
            text = font.render(f"Game Over! Score: {final_score}", True, WHITE)
            screen.blit(text, text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)))
            pygame.display.flip()
            waiting_for_key = True
            while waiting_for_key:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        pygame.quit()
                        exit()
                    if event.type == pygame.KEYDOWN:
                        waiting_for_key = False
            break
