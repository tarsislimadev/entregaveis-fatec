import pygame
import random
import os

# --- 1. CONFIGURAÇÃO INICIAL DO PYGAME ---
# Inicializa o Pygame e o mixer de áudio
pygame.init()
pygame.mixer.init()

# Define a escala de ampliação
SCALE_FACTOR = 1.00
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
DARK_RED = (139, 0, 0) # Cor para a vida
ORANGE = (255, 165, 0) # Cor para a vida do boss

# Taxa de quadros (FPS)
clock = pygame.time.Clock()
FPS = 60

# Configuração da fonte para as mensagens
font = pygame.font.Font(None, int(50 * SCALE_FACTOR))
score_font = pygame.font.Font(None, int(36 * SCALE_FACTOR))

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
        if 'bichinho' in path: surface.fill(BLUE)
        elif 'paradodireita' in path: surface.fill(RED)
        elif 'correndodireita' in path: surface.fill(RED)
        elif 'pulandodireita' in path: surface.fill(RED)
        elif 'block_platform' in path: surface.fill(GREEN)
        elif 'block_spike' in path: surface.fill(RED)
        elif 'final_platform' in path: surface.fill(YELLOW)
        else: surface.fill(BLACK)
        if size:
            return pygame.transform.scale(surface, (int(size[0] * SCALE_FACTOR), int(size[1] * SCALE_FACTOR)))
        return surface

# --- NOVA FUNÇÃO: Carrega um arquivo de áudio ---
def load_sound(path):
    try:
        full_path = os.path.join(os.path.dirname(__file__), path)
        return pygame.mixer.Sound(full_path)
    except pygame.error:
        print(f"Erro: Arquivo de áudio '{path}' não encontrado.")
        return None

# --- Carrega as imagens e áudios do jogo ---
background_image = load_image(r"imagens\767b1183-4194-4729-a476-4e4a2325a057.png")
player_size_orig = (32, 32)
player_size_scaled = (int(player_size_orig[0] * SCALE_FACTOR), int(player_size_orig[1] * SCALE_FACTOR))
idle_right_image = load_image(r"imagens\paradodireita.png", player_size_orig)
idle_left_image = load_image(r"imagens\paradodesquerda.png", player_size_orig)
run_right_image = load_image(r"imagens\correndodireita.png", player_size_orig)
run_left_image = load_image(r"imagens\correndoesquerda.png", player_size_orig)
jump_right_image = load_image(r"imagens\pulandodireita.png", player_size_orig)
jump_left_image = load_image(r"imagens\pulandosequerda.png", player_size_orig)
enemy_size_orig = (32, 32)
enemy_size_scaled = (int(enemy_size_orig[0] * SCALE_FACTOR), int(enemy_size_orig[1] * SCALE_FACTOR))
enemy_right_image = load_image(r"imagens\bichinho_direita.png", enemy_size_orig)
enemy_left_image = load_image(r"imagens\bichinho_esquerda.png", enemy_size_orig)
platform_image = load_image(r"imagens\block_platform.png", (100, 20))
spike_image = load_image(r"imagens\block_spike_out_cima_baixo.png", (100, 20))
gun_image = load_image(r"imagens\pistol_ground_32x32.png", (24,24)) # Novo item de arma
boss_direita = load_image(r"imagens\tank_serra_direita_clean.png", (80,80))
boss_esquerda = load_image(r"imagens\tank_serra_esquerda_clean.png", (80,80))
# --- NOVA IMAGEM: A plataforma final com o poste ---
final_platform_image = load_image(r"imagens\final_platform_tall_pole.png", (130, 20))
nave = load_image(r"imagens\ufo_simple_lineart_style_256x256.png", (128,128))

# --- Carrega os arquivos de áudio ---
game_music = r"audio\8bit-music-for-game-68698.mp3"
start_sound = load_sound(r"audio\game-start-317318.mp3")
coin_sound = load_sound(r"audio\collect-points-190037.mp3")
death_sound = load_sound(r"audio\videogame-death-sound-43894.mp3")
# hit_sound = load_sound(r"audio\hit_sound.mp3") # Adiciona um som de dano

# --- 2. CLASSE DO JOGADOR (PLAYER) ---
class Player(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.idle_right_image = idle_right_image
        self.idle_left_image = idle_left_image
        self.run_right_image = run_right_image
        self.run_left_image = run_left_image
        self.jump_right_image = jump_right_image
        self.jump_left_image = jump_left_image
        self.image = self.idle_right_image
        self.rect = self.image.get_rect()
        self.rect.midbottom = (x * SCALE_FACTOR, y * SCALE_FACTOR)
        self.velocity_y = 0
        self.on_ground = False
        self.real_x = x * SCALE_FACTOR
        self.last_direction = "right"
        self.health = 3 # Adiciona a vida do jogador
        self.is_invincible = False # Flag para invencibilidade
        self.invincible_end_time = 0
        self.knockback_velocity = 0 # Velocidade do recuo
        # --- NOVO: Variáveis para controle de tiro
        self.can_shoot = False # Alterado para False, só pode atirar ao pegar o item
        self.last_shot_time = pygame.time.get_ticks()
        self.shoot_cooldown = 500 # 0.5 segundos de intervalo entre tiros

    def update(self, player_velocity_x):
        self.velocity_y += 0.8 * SCALE_FACTOR
        
        # Lógica de invencibilidade
        if self.is_invincible:
            now = pygame.time.get_ticks()
            if now > self.invincible_end_time:
                self.is_invincible = False
        
        # Lógica de recuo (knockback)
        if self.knockback_velocity != 0:
            self.real_x += self.knockback_velocity
            self.knockback_velocity *= 0.9 # Diminui o recuo
            if abs(self.knockback_velocity) < 0.5:
                self.knockback_velocity = 0
        
        # Lógica de animação
        if not self.on_ground:
            if self.last_direction == "right":
                self.image = self.jump_right_image
            else:
                self.image = self.jump_left_image
        elif player_velocity_x > 0:
            self.image = self.run_right_image
            self.last_direction = "right"
        elif player_velocity_x < 0:
            self.image = self.run_left_image
            self.last_direction = "left"
        else:
            if self.last_direction == "right":
                self.image = self.idle_right_image
            else:
                self.image = self.idle_left_image
        
    def jump(self):
        if self.on_ground:
            self.velocity_y = -15 * SCALE_FACTOR
            self.on_ground = False
            
    def take_damage(self):
        if not self.is_invincible:
            self.health -= 1
            # if hit_sound:
            #     hit_sound.play()
            self.is_invincible = True
            self.invincible_end_time = pygame.time.get_ticks() + 1000 # 1 segundo de invencibilidade
            
            # Aplica o recuo (knockback)
            if self.last_direction == "right":
                self.knockback_velocity = -10 * SCALE_FACTOR # Recua para a esquerda
            else:
                self.knockback_velocity = 10 * SCALE_FACTOR # Recua para a direita

# --- 3. CLASSE DAS PLATAFORMAS ---
class Platform(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, is_goal=False):
        super().__init__()
        if is_goal:
            self.image = pygame.transform.scale(final_platform_image, (int(width * SCALE_FACTOR), int(height * SCALE_FACTOR)))
        else:
            self.image = pygame.transform.scale(platform_image, (int(width * SCALE_FACTOR), int(height * SCALE_FACTOR)))
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)

# --- CLASSE: PLATAFORMA DE ESPINHOS FIXA ---
class SpikePlatform(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height):
        super().__init__()
        self.image = pygame.transform.scale(spike_image, (int(width * SCALE_FACTOR), int(height * SCALE_FACTOR)))
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)

# --- NOVA CLASSE: PLATAFORMA DE ESPINHOS MÓVEL ---
class MovingSpikePlatform(SpikePlatform):
    def __init__(self, x, y, width, height, speed, top_bound, bottom_bound):
        super().__init__(x, y, width, height)
        self.speed = speed * SCALE_FACTOR
        self.direction = 1
        self.top_bound = top_bound * SCALE_FACTOR
        self.bottom_bound = (bottom_bound - height) * SCALE_FACTOR

    def update(self):
        self.rect.y += self.speed * self.direction
        if self.rect.y <= self.top_bound or self.rect.y >= self.bottom_bound:
            self.direction *= -1

# --- 4. CLASSE DO INIMIGO ---
class Enemy(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, speed, left_bound, right_bound, shoots=False):
        super().__init__()
        self.enemy_right_image = enemy_right_image
        self.enemy_left_image = enemy_left_image
        self.image = self.enemy_right_image
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)
        self.speed = speed * SCALE_FACTOR
        self.direction = 1
        self.left_bound = left_bound * SCALE_FACTOR
        self.right_bound = (right_bound - width) * SCALE_FACTOR
        self.shoots = shoots
        self.last_shot = pygame.time.get_ticks()
        self.shoot_cooldown = 2000

    def update(self):
        self.rect.x += self.speed * self.direction
        if self.direction == 1:
            self.image = self.enemy_right_image
        else:
            self.image = self.enemy_left_image
        if self.rect.x <= self.left_bound or self.rect.x >= self.right_bound:
            self.direction *= -1

    def shoot(self, player_x, bullet_group, all_sprites):
        now = pygame.time.get_ticks()
        if self.shoots and now - self.last_shot > self.shoot_cooldown:
            self.last_shot = now
            bullet_direction = 1 if player_x > self.rect.centerx else -1
            new_bullet = Bullet(self.rect.centerx, self.rect.centery, bullet_direction, self.left_bound, self.right_bound + self.rect.width)
            bullet_group.add(new_bullet)
            all_sprites.add(new_bullet)

# --- NOVO: CLASSE DO BOSS ---
class Boss(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, speed, player_target):
        super().__init__()
        
        # --- CARREGA AS IMAGENS DO BOSS ---
        self.boss_direita_image = boss_esquerda
        self.boss_esquerda_image = boss_direita
        self.image = self.boss_direita_image # Imagem inicial
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)
        
        self.speed = speed * SCALE_FACTOR
        self.health = 30  # Vida do boss
        self.max_health = 30
        self.player_target = player_target
        self.last_hit_time = 0
        self.hit_cooldown = 200
        
        # Define a área de batalha do boss
        self.battle_arena_start = 3100 * SCALE_FACTOR
        self.battle_arena_end = (3100 + 1800) * SCALE_FACTOR
        self.initial_position_x = x * SCALE_FACTOR

    def update(self):
        # A lógica de perseguição só é ativada quando o jogador entra na área de batalha do boss
        if self.player_target.real_x > self.battle_arena_start:
            # Lógica de perseguição do jogador
            if self.player_target.real_x > self.rect.x:
                self.rect.x += self.speed
                self.image = self.boss_direita_image # Vira para a direita
            elif self.player_target.real_x < self.rect.x:
                self.rect.x -= self.speed
                self.image = self.boss_esquerda_image # Vira para a esquerda
        else:
            # Se o jogador não estiver na área, o boss retorna para a sua posição inicial
            if self.rect.x < self.initial_position_x:
                self.rect.x += self.speed
                self.image = self.boss_direita_image
            elif self.rect.x > self.initial_position_x:
                self.rect.x -= self.speed
                self.image = self.boss_esquerda_image
            
        # Limita o movimento do boss dentro da arena
        if self.rect.x < self.battle_arena_start:
            self.rect.x = self.battle_arena_start
        if self.rect.right > self.battle_arena_end:
            self.rect.right = self.battle_arena_end

    def take_damage(self):
        now = pygame.time.get_ticks()
        if now - self.last_hit_time > self.hit_cooldown:
            self.health -= 1
            self.last_hit_time = now
            print(f"Boss Health: {self.health}")
            if self.health <= 0:
                self.kill()
# --- 5. CLASSE DA BALA ---
class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y, direction, left_bound, right_bound):
        super().__init__()
        self.image = pygame.Surface((int(10 * SCALE_FACTOR), int(5 * SCALE_FACTOR)))
        self.image.fill(GRAY)
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.speed = 5 * SCALE_FACTOR
        self.direction = direction
        self.left_bound = left_bound
        self.right_bound = right_bound
        self.start_x = x

    def update(self):
        self.rect.x += self.speed * self.direction
        if self.rect.x < self.left_bound or self.rect.x > self.right_bound:
            self.kill()

# --- NOVO: CLASSE DA BALA DO JOGADOR ---
class PlayerBullet(pygame.sprite.Sprite):
    def __init__(self, x, y, direction):
        super().__init__()
        self.image = pygame.Surface((int(10 * SCALE_FACTOR), int(5 * SCALE_FACTOR)))
        self.image.fill(WHITE) # Balas do jogador são brancas
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        self.speed = 10 * SCALE_FACTOR
        self.direction = direction

    def update(self):
        self.rect.x += self.speed * self.direction
        # Remove a bala quando ela sai da tela
        if self.rect.x < -100 or self.rect.x > 5000: # Adicionado limites maiores
            self.kill()

# --- 6. CLASSE DO PERIGO MÓVEL (GENÉRICA) ---
class MovingHazard(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, speed, top_bound, bottom_bound):
        super().__init__()
        self.image = pygame.Surface((int(width * SCALE_FACTOR), int(height * SCALE_FACTOR)))
        self.image.fill(PURPLE)
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)
        self.speed = speed * SCALE_FACTOR
        self.direction = 1
        self.top_bound = top_bound * SCALE_FACTOR
        self.bottom_bound = (bottom_bound - height) * SCALE_FACTOR

    def update(self):
        self.rect.y += self.speed * self.direction
        if self.rect.y <= self.top_bound or self.rect.y >= self.bottom_bound:
            self.direction *= -1

# --- 6.1. CLASSE DA MOEDA ---
class Coin(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((int(16 * SCALE_FACTOR), int(16 * SCALE_FACTOR)), pygame.SRCALPHA)
        pygame.draw.circle(self.image, YELLOW, (int(8 * SCALE_FACTOR), int(8 * SCALE_FACTOR)), int(8 * SCALE_FACTOR))
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)

# --- NOVO: CLASSE DA MOEDA QUE DÁ HABILIDADE ---
class AbilityCoin(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = gun_image
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)

# --- NOVO: CLASSE DA PAREDE DESTRUTÍVEL ---
class Wall(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, health):
        super().__init__()
        self.width = width * SCALE_FACTOR
        self.height = height * SCALE_FACTOR
        self.image = nave
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)
        self.health = health
        self.max_health = health

    def take_damage(self):
        self.health -= 1
        if self.health <= 0:
            self.kill()

# --- NOVA FUNÇÃO: Desenha a vida do jogador ---
def draw_health_bar(surface, health, max_health, x, y, color):
    health_bar_width = 150
    health_bar_height = 20
    health_bar_x = x
    health_bar_y = y
    
    # Desenha as bolinhas de vida
    for i in range(max_health):
        circle_x = health_bar_x + (i * 30) + 10 # 30 pixels de espaçamento
        circle_y = health_bar_y + health_bar_height / 2
        
        # Inverte a lógica para começar do lado direito para o jogador
        circle_x = (x + health_bar_width) - (i * 30) - 10
        
        color_fill = DARK_RED
        if i < health:
            color_fill = color
        pygame.draw.circle(surface, color_fill, (int(circle_x), int(circle_y)), 10)

# --- NOVA FUNÇÃO: Desenha a barra de vida do boss ---
def draw_boss_health_bar(surface, health, max_health):
    bar_width = 200
    bar_height = 20
    fill_width = (health / max_health) * bar_width
    bar_x = SCREEN_WIDTH // 2 - bar_width // 2
    bar_y = 10
    
    # Desenha o fundo da barra
    outline_rect = pygame.Rect(bar_x, bar_y, bar_width, bar_height)
    pygame.draw.rect(surface, GRAY, outline_rect, 3)
    
    # Desenha o preenchimento da vida
    fill_rect = pygame.Rect(bar_x, bar_y, fill_width, bar_height)
    pygame.draw.rect(surface, ORANGE, fill_rect)

# --- 7. FUNÇÃO PARA CRIAR E INICIAR O JOGO ---
def main():
    game_over = False
    win = False
    death_cause = None
    score = 0
    
    death_cause = None

    all_sprites = pygame.sprite.Group()
    platforms = pygame.sprite.Group()
    spikes = pygame.sprite.Group()
    enemies = pygame.sprite.Group()
    goal_platform = pygame.sprite.Group()
    bullets = pygame.sprite.Group()
    player_bullets = pygame.sprite.Group()
    moving_hazards = pygame.sprite.Group()
    coins = pygame.sprite.Group()
    ability_coins = pygame.sprite.Group()
    walls = pygame.sprite.Group()
    bosses = pygame.sprite.Group()

    player = Player(100, 600 - 80)
    all_sprites.add(player)

    if start_sound:
        pygame.mixer.music.set_volume(0.25)
        start_sound.play()
    
    pygame.mixer.music.load(game_music)
    pygame.mixer.music.play(-1)

    # --- DESIGN DO NÍVEL ---
    ground_start = Platform(0, 600 - 40, 500, 40)
    platform1 = Platform(580, 600 - 80, 100, 20)
    platform2 = Platform(700, 600 - 180, 100, 20)
    platform3 = Platform(820, 600 - 280, 100, 20)
    ground_middle1 = Platform(950, 600 - 40, 500, 40)
    platform_help1 = Platform(950, 600 - 100, 50, 20)
    platform_jump1 = Platform(1500, 600 - 120, 100, 20)
    platform_jump2 = Platform(1650, 600 - 220, 100, 20)
    ground_middle2 = Platform(1800, 600 - 40, 600, 40)
    platform_jump3 = Platform(2450, 600 - 100, 150, 20)
    platform_jump4 = Platform(2650, 600 - 200, 150, 20)
    
    platform_pre_boss = Platform(2900, 600 - 150, 100, 20)
    
    ground_boss_battle = Platform(3100, 600 - 40, 2000, 40)
    boss_platform1 = Platform(3300, 600 - 120, 100, 20)
    boss_platform2 = Platform(3550, 600 - 180, 100, 20)
    boss_platform3 = Platform(3800, 600 - 240, 100, 20)
    boss_platform4 = Platform(4050, 600 - 200, 100, 20)
    boss_platform5 = Platform(4300, 600 - 150, 100, 20)
    
    victory_platform = Platform(5000, 600 - 60, 130, 20, is_goal=True)
    
    moving_spike_platform1 = MovingSpikePlatform(1250, 600 - 40 - 150, 100, 20, 1.5, 600 - 40 - 300, 600 - 40)
    moving_spike_platform2 = MovingSpikePlatform(1850, 600 - 40 - 150, 100, 20, 1.5, 600 - 40 - 300, 600 - 40)
    moving_spike_platform3 = MovingSpikePlatform(2150, 600 - 40 - 150, 100, 20, 1.5, 600 - 40 - 300, 600 - 40)
    
    # --- NOVO: Cria a parede destrutível
    boss_wall = Wall(4800, 600 - 40 - 100, 60, 300, 20)
    
    platforms.add(ground_start, platform1, platform2, platform3, ground_middle1, platform_help1, platform_jump1, platform_jump2, ground_middle2, platform_jump3, platform_jump4, platform_pre_boss, ground_boss_battle, boss_platform1, boss_platform2, boss_platform3, boss_platform4, boss_platform5)
    spikes.add( moving_spike_platform1, moving_spike_platform2, moving_spike_platform3)
    walls.add(boss_wall) 

    all_sprites.add(ground_start, platform1, platform2, platform3, ground_middle1, platform_help1, platform_jump1, platform_jump2, ground_middle2, platform_jump3, platform_jump4, platform_pre_boss, ground_boss_battle, boss_platform1, boss_platform2, boss_platform3, boss_platform4, boss_platform5, moving_spike_platform1, moving_spike_platform2, moving_spike_platform3, boss_wall)

    goal_platform.add(victory_platform)
    all_sprites.add(victory_platform)

    enemy1 = Enemy(200, 600 - 40 - 32, 32, 32, 1, 0, 500)
    enemy2 = Enemy(620, 600 - 80 - 32, 32, 32, 1, 580, 680)
    enemy3 = Enemy(1100, 600 - 40 - 32, 32, 32, 1, 950, 1450, shoots=True)
    enemy4 = Enemy(1550, 600 - 120 - 32, 32, 32, 1, 1500, 1600)
    enemy5 = Enemy(2100, 600 - 40 - 32, 32, 32, 1, 1800, 2400, shoots=True)
    
    enemies.add(enemy1, enemy2, enemy3, enemy4, enemy5)
    all_sprites.add(enemy1, enemy2, enemy3, enemy4, enemy5)
    
    # --- NOVO: Cria o boss final (quadrado azul) ---
    final_boss = Boss(3500, 600 - 20 - 80, 80, 80, 2, player) 
    bosses.add(final_boss)
    all_sprites.add(final_boss)
    
    coin_positions = [
        (100, 600 - 40 - 20), (600, 600 - 80 - 20), (980, 600 - 40 - 20),
        (1400, 600 - 40 - 20), (1700, 600 - 220 - 20), (2000, 600 - 40 - 20),
        (2500, 600 - 100 - 20), (3150, 600 - 100), (3300, 600 - 70),
        (3900, 600 - 90), (4000, 600 - 90),
        
        (400, 600 - 100), (450, 600 - 150), (500, 600 - 200),
        (750, 600 - 180 - 50), (850, 600 - 280 - 50),
        (1100, 600 - 40 - 50), (1200, 600 - 40 - 50),
        (1550, 600 - 120 - 50), (1700, 600 - 220 - 50),
        (2000, 600 - 40 - 50), 
        
    ]
    
    for x, y in coin_positions:
        new_coin = Coin(x, y)
        coins.add(new_coin)
        all_sprites.add(new_coin)
    
    new_ability_coin = AbilityCoin(2950, 600 - 150 - 20)
    ability_coins.add(new_ability_coin)
    all_sprites.add(new_ability_coin)

    # --- LOOP PRINCIPAL DO JOGO ---
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    player.jump()
                elif event.key == pygame.K_d:
                    if player.can_shoot:
                        now = pygame.time.get_ticks()
                        if now - player.last_shot_time > player.shoot_cooldown:
                            player.last_shot_time = now
                            direction = 1 if player.last_direction == "right" else -1
                            new_bullet = PlayerBullet(player.real_x, player.rect.centery, direction)
                            player_bullets.add(new_bullet)
                            all_sprites.add(new_bullet)

        keys = pygame.key.get_pressed()
        player_velocity_x = 0
        if keys[pygame.K_LEFT]:
            player_velocity_x = -5 * SCALE_FACTOR
        if keys[pygame.K_RIGHT]:
            player_velocity_x = 5 * SCALE_FACTOR
            
        if player.knockback_velocity == 0:
            player.real_x += player_velocity_x
        
        player.update(player_velocity_x)
        enemies.update()
        bullets.update()
        player_bullets.update()
        moving_hazards.update()
        spikes.update()
        coins.update()
        ability_coins.update()
        bosses.update()
        walls.update()

        for enemy in enemies:
            enemy.shoot(player.real_x, bullets, all_sprites)

        player.rect.x = player.real_x
        
        hit_platforms_x = pygame.sprite.spritecollide(player, platforms, False)
        hit_walls_x = pygame.sprite.spritecollide(player, walls, False)
        
        all_horizontal_collisions = hit_platforms_x + hit_walls_x
        
        if all_horizontal_collisions:
            for entity in all_horizontal_collisions:
                if player_velocity_x > 0:
                    player.real_x = entity.rect.left - player.rect.width
                elif player_velocity_x < 0:
                    player.real_x = entity.rect.right

        player.rect.y += player.velocity_y
        player.on_ground = False
        hit_platforms_y = pygame.sprite.spritecollide(player, platforms, False)
        hit_walls_y = pygame.sprite.spritecollide(player, walls, False)
        
        all_vertical_collisions = hit_platforms_y + hit_walls_y
        
        for entity in all_vertical_collisions:
            if player.velocity_y > 0:
                player.rect.bottom = entity.rect.top
                player.velocity_y = 0
                player.on_ground = True
            elif player.velocity_y < 0:
                player.rect.top = entity.rect.bottom
                player.velocity_y = 0
        
        for bullet in player_bullets:
            hit_enemies_by_bullet = pygame.sprite.spritecollide(bullet, enemies, True)
            if hit_enemies_by_bullet:
                bullet.kill()
                score += 10
            
            hit_boss = pygame.sprite.spritecollide(bullet, bosses, False)
            if hit_boss:
                bullet.kill()
                for boss in hit_boss:
                    boss.take_damage()
            
            hit_walls = pygame.sprite.spritecollide(bullet, walls, False)
            if hit_walls:
                bullet.kill()
                for wall in hit_walls:
                    wall.take_damage()
        
        hit_bosses = pygame.sprite.spritecollide(player, bosses, False)
        if hit_bosses:
            player.take_damage()
            death_cause = 'colidiu_boss'

        hit_enemies = pygame.sprite.spritecollide(player, enemies, False)
        for enemy in hit_enemies:
            if player.velocity_y > 0 and player.rect.bottom <= enemy.rect.top + player.velocity_y + 1:
                enemy.kill()
                player.velocity_y = -10 * SCALE_FACTOR
                score += 5
            else:
                player.take_damage()
                death_cause = 'colidiu_inimigo'
        
        hit_bullets = pygame.sprite.spritecollide(player, bullets, True)
        if hit_bullets:
            player.take_damage()
            death_cause = 'atingido_por_bala'
        
        hit_hazards = pygame.sprite.spritecollide(player, moving_hazards, False)
        if hit_hazards:
            player.take_damage()
            death_cause = 'tocado_por_perigo_movel'

        hit_spikes = pygame.sprite.spritecollide(player, spikes, False)
        if hit_spikes:
            player.take_damage()
            death_cause = 'espetado'

        hit_coins = pygame.sprite.spritecollide(player, coins, True)
        if hit_coins:
            if coin_sound:
                coin_sound.play()
            for coin in hit_coins:
                score += 1
            
        hit_ability_coins = pygame.sprite.spritecollide(player, ability_coins, True)
        if hit_ability_coins:
            if coin_sound:
                coin_sound.play()
            player.can_shoot = True
        
        if player.rect.y > SCREEN_HEIGHT + (50 * SCALE_FACTOR):
            player.health = 0
            death_cause = 'caiu'

        if player.health <= 0:
            game_over = True
            running = False
        
        if not bosses and pygame.sprite.spritecollide(player, goal_platform, False):
            win = True
            running = False

        screen.blit(background_image, (0, 0))
        
        map_offset_x = player.real_x - (SCREEN_WIDTH // 2)
        
        if player.is_invincible and pygame.time.get_ticks() % 200 > 100:
            pass
        else:
            for sprite in all_sprites:
                screen.blit(sprite.image, (sprite.rect.x - map_offset_x, sprite.rect.y))
        
        score_text = score_font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))
        
        draw_health_bar(screen, player.health, 3, SCREEN_WIDTH - 150 - 10, 10, RED)
        
        if bosses:
            for boss in bosses:
                draw_boss_health_bar(screen, boss.health, boss.max_health)

        pygame.display.flip()
        clock.tick(FPS)

    if not win:
        pygame.mixer.music.stop()
        if death_sound:
            death_sound.play()
        pygame.time.wait(2000)

    if win:
        return True, None, score
    else:
        return False, death_cause, score

# --- NOVO: FUNÇÃO PARA A TELA DE INÍCIO ---
def show_start_screen():
    screen.blit(background_image, (0, 0))
    title_text = font.render("O Jogo do Jogo", True, WHITE)
    press_enter_text = score_font.render("Aperte ENTER para começar", True, WHITE)

    title_rect = title_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 50))
    press_enter_rect = press_enter_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 50))

    screen.blit(title_text, title_rect)
    screen.blit(press_enter_text, press_enter_rect)
    pygame.display.flip()

    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                waiting = False

# --- NOVO: FUNÇÃO PARA A TELA DE GAME OVER ---
def show_game_over_screen(death_cause, score):
    pygame.mixer.music.stop()
    screen.fill(BLACK)
    
    game_over_text = font.render("GAME OVER", True, RED)
    score_text = score_font.render(f"Pontuação Final: {score}", True, WHITE)
    press_enter_text = score_font.render("Pressione ENTER para tentar novamente", True, WHITE)

    cause_text = ""
    if death_cause == 'caiu':
        cause_text = score_font.render("Você caiu no abismo...", True, WHITE)
    elif death_cause == 'espetado':
        cause_text = score_font.render("Você foi espetado...", True, WHITE)
    elif death_cause == 'atingido_por_bala':
        cause_text = score_font.render("Você foi atingido por uma bala...", True, WHITE)
    elif death_cause == 'colidiu_inimigo':
        cause_text = score_font.render("Você colidiu com um inimigo...", True, WHITE)
    elif death_cause == 'colidiu_boss':
        cause_text = score_font.render("Você colidiu com o boss...", True, WHITE)
    else:
        cause_text = score_font.render("Você morreu...", True, WHITE)

    game_over_rect = game_over_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 100))
    score_rect = score_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
    cause_rect = cause_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 50))
    press_enter_rect = press_enter_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 150))

    screen.blit(game_over_text, game_over_rect)
    screen.blit(score_text, score_rect)
    screen.blit(cause_text, cause_rect)
    screen.blit(press_enter_text, press_enter_rect)
    pygame.display.flip()

    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                return

# --- NOVO: FUNÇÃO PARA A TELA DE VITÓRIA ---
def show_win_screen(score):
    screen.fill(BLACK)
    
    win_text = font.render("VOCÊ VENCEU!", True, GREEN)
    score_text = score_font.render(f"Pontuação Final: {score}", True, WHITE)
    press_enter_text = score_font.render("Pressione ENTER para jogar novamente", True, WHITE)

    win_rect = win_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 50))
    score_rect = score_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
    press_enter_rect = press_enter_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 50))
    
    screen.blit(win_text, win_rect)
    screen.blit(score_text, score_rect)
    screen.blit(press_enter_text, press_enter_rect)
    pygame.display.flip()

    waiting = True
    while waiting:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
                return

# --- ESTRUTURA PRINCIPAL DO JOGO ---
if __name__ == "__main__":
    while True:
        show_start_screen()
        win, death_cause, score = main()
        if win:
            show_win_screen(score)
        else:
            show_game_over_screen(death_cause, score)
