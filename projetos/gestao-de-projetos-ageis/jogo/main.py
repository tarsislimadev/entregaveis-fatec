import pygame
import random
import os
import sys

# --- 1. CONFIGURAÇÃO INICIAL DO PYGAME ---
# Inicializa o Pygame
pygame.init()

# Define a escala de ampliação
SCALE_FACTOR = 1.07
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


# --- Carrega as imagens do jogo ---
background_image = load_image("imagens/767b1183-4194-4729-a476-4e4a2325a057.png")
player_size_orig = (32, 32)
player_size_scaled = (int(player_size_orig[0] * SCALE_FACTOR), int(player_size_orig[1] * SCALE_FACTOR))
idle_right_image = load_image("imagens/paradodireita.png", player_size_orig)
idle_left_image = load_image("imagens/paradodesquerda.png", player_size_orig)
run_right_image = load_image("imagens/correndodireita.png", player_size_orig)
run_left_image = load_image("imagens/correndoesquerda.png", player_size_orig)
jump_right_image = load_image("imagens/pulandodireita.png", player_size_orig)
jump_left_image = load_image("imagens/pulandosequerda.png", player_size_orig)
enemy_size_orig = (32, 32)
enemy_size_scaled = (int(enemy_size_orig[0] * SCALE_FACTOR), int(enemy_size_orig[1] * SCALE_FACTOR))
enemy_right_image = load_image("imagens/bichinho_direita.png", enemy_size_orig)
enemy_left_image = load_image("imagens/bichinho_esquerda.png", enemy_size_orig)
platform_image = load_image("imagens/block_platform.png", (100, 20))
spike_image = load_image("imagens/block_spike_out_cima_baixo.png", (100, 20))

# --- NOVA IMAGEM: A plataforma final com o poste ---
final_platform_image = load_image("imagens/final_platform_tall_pole.png", (130, 20))


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
        self.health = 3  # Adiciona a vida do jogador
        self.is_invincible = False # Flag para invencibilidade
        self.invincible_end_time = 0
        self.knockback_velocity = 0 # Velocidade do recuo

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
            self.image = pygame.transform.scale(final_platform_image, (width * SCALE_FACTOR, height * SCALE_FACTOR))
        else:
            self.image = pygame.transform.scale(platform_image, (width * SCALE_FACTOR, height * SCALE_FACTOR))
        self.rect = self.image.get_rect()
        self.rect.topleft = (x * SCALE_FACTOR, y * SCALE_FACTOR)

# --- CLASSE: PLATAFORMA DE ESPINHOS FIXA ---
class SpikePlatform(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height):
        super().__init__()
        self.image = pygame.transform.scale(spike_image, (width * SCALE_FACTOR, height * SCALE_FACTOR))
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

# --- 5. CLASSE DA BALA ---
class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y, direction, left_bound, right_bound):
        super().__init__()
        self.image = pygame.Surface((10 * SCALE_FACTOR, 5 * SCALE_FACTOR))
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

# --- 6. CLASSE DO PERIGO MÓVEL (GENÉRICA) ---
class MovingHazard(pygame.sprite.Sprite):
    def __init__(self, x, y, width, height, speed, top_bound, bottom_bound):
        super().__init__()
        self.image = pygame.Surface((width * SCALE_FACTOR, height * SCALE_FACTOR))
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

# --- NOVA FUNÇÃO: Desenha a vida do jogador ---
def draw_health_bar(surface, health, max_health):
    health_bar_width = 150
    health_bar_height = 20
    health_bar_x = SCREEN_WIDTH - health_bar_width - 10
    health_bar_y = 10
    
    # Desenha o fundo da barra de vida
    # pygame.draw.rect(surface, GRAY, (health_bar_x, health_bar_y, health_bar_width, health_bar_height))
    
    # Desenha o preenchimento da vida
    # fill_width = (health / max_health) * health_bar_width
    # pygame.draw.rect(surface, RED, (health_bar_x, health_bar_y, fill_width, health_bar_height))
    
    # Desenha as bolinhas de vida
    for i in range(max_health):
        circle_x = health_bar_x + (i * 30) + 10 # 30 pixels de espaçamento
        circle_y = health_bar_y + health_bar_height / 2
        color = DARK_RED
        if i < health:
            color = RED
        pygame.draw.circle(surface, color, (int(circle_x), int(circle_y)), 10)


# --- 7. FUNÇÃO PARA CRIAR E INICIAR O JOGO ---
def main():
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
    ground_before_parkour = Platform(2800, 600 - 40, 400, 40)
    parkour_platform1 = Platform(3250, 600 - 100, 110, 20)
    parkour_platform2 = Platform(3400, 600 - 180, 110, 20)
    parkour_platform3 = Platform(3550, 600 - 100, 110, 20)
    parkour_platform4 = Platform(3700, 600 - 180, 110, 20)
    parkour_platform5 = Platform(3850, 600 - 260, 110, 20)
    
    # --- NOVO: Plataforma normal ao lado da plataforma final ---
    final_approach_platform = Platform(3950, 600 - 340, 50, 20)

    victory_platform = Platform(4000, 600 - 340, 130, 20, is_goal=True)
    
    # Criação das plataformas de espinhos
    spike_platform1 = SpikePlatform(3000, 600 - 40, 100, 20)

    # Criação da plataforma de espinhos móvel
    moving_spike_platform1 = MovingSpikePlatform(1250, 600 - 40 - 150, 100, 20, 1.5, 600 - 40 - 300, 600 - 40)
    
    # NOVAS PLATAFORMAS DE ESPINHO MÓVEIS
    moving_spike_platform2 = MovingSpikePlatform(1850, 600 - 40 - 150, 100, 20, 1.5, 600 - 40 - 300, 600 - 40)
    moving_spike_platform3 = MovingSpikePlatform(2150, 600 - 40 - 150, 100, 20, 1.5, 600 - 40 - 300, 600 - 40)
    moving_spike_platform4 = MovingSpikePlatform(3250, 600 - 100 - 150, 110, 20, 1.5, 600 - 100 - 300, 600 - 100)

    platforms.add(ground_start, platform1, platform2, platform3, ground_middle1, platform_help1, platform_jump1, platform_jump2, ground_middle2, platform_jump3, platform_jump4, ground_before_parkour, parkour_platform1, parkour_platform2, parkour_platform3, parkour_platform4, parkour_platform5, final_approach_platform)
    spikes.add(spike_platform1, moving_spike_platform1, moving_spike_platform2, moving_spike_platform3, moving_spike_platform4)
    
    all_sprites.add(ground_start, platform1, platform2, platform3, ground_middle1, platform_help1, platform_jump1, platform_jump2, ground_middle2, platform_jump3, platform_jump4, ground_before_parkour, parkour_platform1, parkour_platform2, parkour_platform3, parkour_platform4, parkour_platform5, final_approach_platform, spike_platform1, moving_spike_platform1, moving_spike_platform2, moving_spike_platform3, moving_spike_platform4)

    goal_platform.add(victory_platform)
    all_sprites.add(victory_platform)

    enemy1 = Enemy(200, 600 - 40 - 32, 32, 32, 1, 0, 500)
    enemy2 = Enemy(620, 600 - 80 - 32, 32, 32, 1, 580, 680)
    enemy3 = Enemy(1100, 600 - 40 - 32, 32, 32, 1, 950, 1450, shoots=True)
    enemy4 = Enemy(1550, 600 - 120 - 32, 32, 32, 1, 1500, 1600)
    enemy5 = Enemy(2100, 600 - 40 - 32, 32, 32, 1, 1800, 2400, shoots=True)
    enemy6 = Enemy(2700, 600 - 200 - 32, 32, 32, 1, 2650, 2800)
    enemy7 = Enemy(3300, 600 - 100 - 32, 32, 32, 1, 3250, 3360)
    enemy8 = Enemy(3600, 600 - 100 - 32, 32, 32, 1, 3550, 3660)
    enemy9 = Enemy(3850, 600 - 260 - 32, 32, 32, 1, 3850, 3960)

    enemies.add(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9)
    all_sprites.add(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9)
    
    # --- MOEDAS: 25 ADICIONADAS ---
    coin_positions = [
        (100, 600 - 40 - 20), (600, 600 - 80 - 20), (980, 600 - 40 - 20),
        (1400, 600 - 40 - 20), (1700, 600 - 220 - 20), (2000, 600 - 40 - 20),
        (2500, 600 - 100 - 20), (2850, 600 - 40 - 20), (3300, 600 - 100 - 20),
        (3600, 600 - 100 - 20), (3900, 600 - 260 - 20),
        
        # NOVAS MOEDAS ADICIONADAS (14 moedas)
        (400, 600 - 100), (450, 600 - 150), (500, 600 - 200),
        (750, 600 - 180 - 50), (850, 600 - 280 - 50),
        (1100, 600 - 40 - 50), (1200, 600 - 40 - 50),
        (1550, 600 - 120 - 50), (1700, 600 - 220 - 50),
        (2000, 600 - 40 - 50), (2200, 600 - 40 - 50),
        (2550, 600 - 100 - 50), (2750, 600 - 200 - 50),
        (3050, 600 - 40 - 20)
    ]
    
    for x, y in coin_positions:
        new_coin = Coin(x, y)
        coins.add(new_coin)
        all_sprites.add(new_coin)

    # --- LOOP PRINCIPAL DO JOGO ---
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN and event.key == pygame.K_UP:
                player.jump()

        keys = pygame.key.get_pressed()
        player_velocity_x = 0
        if keys[pygame.K_LEFT]:
            player_velocity_x = -5 * SCALE_FACTOR
        if keys[pygame.K_RIGHT]:
            player_velocity_x = 5 * SCALE_FACTOR
            
        # Move o jogador se não estiver em recuo
        if player.knockback_velocity == 0:
            player.real_x += player_velocity_x
        
        player.update(player_velocity_x)
        enemies.update()
        bullets.update()
        moving_hazards.update()
        spikes.update()
        coins.update()

        for enemy in enemies:
            enemy.shoot(player.real_x, bullets, all_sprites)

        player.rect.x = player.real_x
        
        # --- VERIFICA COLISÃO DO JOGADOR COM PLATAFORMAS NORMAIS ---
        hit_platforms_x = pygame.sprite.spritecollide(player, platforms, False)
        if hit_platforms_x:
            for platform in hit_platforms_x:
                if player_velocity_x > 0:
                    player.real_x = platform.rect.left - player.rect.width
                elif player_velocity_x < 0:
                    player.real_x = platform.rect.right

        player.rect.y += player.velocity_y
        player.on_ground = False
        hit_platforms_y = pygame.sprite.spritecollide(player, platforms, False)
        for platform in hit_platforms_y:
            if player.velocity_y > 0:
                player.rect.bottom = platform.rect.top
                player.velocity_y = 0
                player.on_ground = True
            elif player.velocity_y < 0:
                player.rect.top = platform.rect.bottom
                player.velocity_y = 0
        
        # --- VERIFICA COLISÃO COM INIMIGOS, BALAS, PERIGOS, MOEDAS e ESPINHOS ---
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
            for coin in hit_coins:
                score += 1
            
        if player.rect.y > SCREEN_HEIGHT + (50 * SCALE_FACTOR):
            player.take_damage()
            death_cause = 'caiu'

        # Verifica se o jogador perdeu toda a vida
        if player.health <= 0:
            game_over = True
            running = False
        
        if pygame.sprite.spritecollide(player, goal_platform, False):
            win = True
            running = False

        # --- PARTE DE RENDERIZAÇÃO ---
        screen.blit(background_image, (0, 0))
        
        # Centraliza a câmera no jogador
        map_offset_x = player.real_x - (SCREEN_WIDTH // 2)
        for sprite in all_sprites:
            if sprite == player:
                # Aplica o efeito de piscar quando o jogador está invencível
                if not (player.is_invincible and pygame.time.get_ticks() % 200 > 100):
                    # Desenha o jogador em uma posição fixa na tela para a câmera
                    screen.blit(sprite.image, (SCREEN_WIDTH // 2, sprite.rect.y))
            else:
                screen.blit(sprite.image, (sprite.rect.x - map_offset_x, sprite.rect.y))
        
        score_text = score_font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))
        
        # Desenha a vida do jogador
        draw_health_bar(screen, player.health, 3)
        
        pygame.display.flip()
        clock.tick(FPS)

    if not win:
        # Espera 2 segundos antes de mostrar a tela de game over
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
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_RETURN: # Verifica se a tecla ENTER foi pressionada
                    waiting = False
                elif event.key == pygame.K_ESCAPE: # Adiciona uma opção para sair
                    pygame.quit()
                    sys.exit()
        clock.tick(FPS)

# --- 8. LOOP PRINCIPAL DO PROGRAMA (GERENCIADOR DE REINÍCIO) ---
# CHAMA A TELA DE INÍCIO ANTES DO LOOP DE REINÍCIO
show_start_screen() 

while True:
    game_result, death_cause, final_score = main()
    if game_result:
        text = font.render(f"Parabéns, você ganhou! Score: {final_score}", True, WHITE)
        text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(text, text_rect)
        pygame.display.flip()
        pygame.time.wait(5000)
        break
    else:
        if death_cause == 'caiu':
            text = font.render(f"Game Over! Você caiu no limbo! Score: {final_score}", True, WHITE)
        elif death_cause == 'colidiu_inimigo':
            text = font.render(f"Game Over! Você foi pego por um inimigo! Score: {final_score}", True, WHITE)
        elif death_cause == 'atingido_por_bala':
            text = font.render(f"Game Over! Você foi atingido por uma bala! Score: {final_score}", True, WHITE)
        elif death_cause == 'tocado_por_perigo_movel':
            text = font.render(f"Game Over! Cuidado com os perigos móveis! Score: {final_score}", True, WHITE)
        elif death_cause == 'espetado':
            text = font.render(f"Game Over! Você foi espetado! Score: {final_score}", True, WHITE)
        else:
            text = font.render(f"Game Over! Score: {final_score}", True, WHITE)
            
        text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
        screen.blit(text, text_rect)
        pygame.display.flip()
        
        waiting_for_key = True
        while waiting_for_key:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    waiting_for_key = False