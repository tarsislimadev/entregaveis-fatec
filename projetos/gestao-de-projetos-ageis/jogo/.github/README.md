# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions para compilar automaticamente o jogo em executáveis para diferentes plataformas.

## 📁 Arquivos de Workflow

### 1. `build-executables.yml` - Compilação Automática
**Trigger**: Push para `main`/`develop`, Tags `v*`, Pull Requests
- ✅ Compila para **Windows**, **Linux** e **macOS**
- ✅ Testa os executáveis automaticamente
- ✅ Gera artefatos por 30 dias
- ✅ Cria release automático para tags

### 2. `build-dev.yml` - Compilação de Desenvolvimento
**Trigger**: Manual (workflow_dispatch)
- 🎯 Permite escolher plataforma específica
- 🎯 Compilação rápida para testes
- 🎯 Artefatos por 7 dias

### 3. `release.yml` - Criação de Release
**Trigger**: Tags `v*.*.*` ou Manual
- 🚀 Compilação para todas as plataformas
- 🚀 Cria release com descrição completa
- 🚀 Inclui instruções de instalação
- 🚀 Arquivos com README para usuários

## 🚀 Como Usar

### Criar uma Release Automática
```bash
# 1. Crie e publique uma tag
git tag v1.0.0
git push origin v1.0.0

# 2. O workflow será executado automaticamente
# 3. Uma release será criada em: https://github.com/SEU_USER/SEU_REPO/releases
```

### Compilação Manual (Desenvolvimento)
1. Vá para: **Actions** → **Development Build**
2. Clique em **Run workflow**
3. Escolha a plataforma:
   - `linux` - Ubuntu/Linux 64-bit
   - `windows` - Windows 64-bit
   - `macos` - macOS 64-bit
   - `all` - Todas as plataformas
4. Clique em **Run workflow**

### Compilação Automática
- **Push para `main`**: Compila todas as plataformas
- **Push para `develop`**: Compila todas as plataformas
- **Pull Request**: Compila e testa

## 📦 Artefatos Gerados

### Estrutura dos Artefatos
```
jogo-plataforma-PLATFORM-x64/
├── jogo-plataforma[.exe]    # Executável
└── README.txt               # Instruções para o usuário
```

### Nomes dos Artefatos
- **Windows**: `jogo-plataforma-windows-x64.zip`
- **Linux**: `jogo-plataforma-linux-x64.tar.gz`
- **macOS**: `jogo-plataforma-macos-x64.tar.gz`

## 🔧 Requisitos

### Dependências do Sistema (Linux)
- `libsdl2-dev`
- `libsdl2-image-dev`
- `libsdl2-mixer-dev`
- `libsdl2-ttf-dev`
- `libfreetype6-dev`
- `libportmidi-dev`
- `python3-dev`

### Dependências Python
- `pygame==2.5.2` (definido em requirements.txt)
- `pyinstaller` (instalado automaticamente)

## 🐛 Troubleshooting

### Workflow falhando?
1. ✅ Verifique se `requirements.txt` existe
2. ✅ Verifique se `main.py` está no caminho correto
3. ✅ Verifique se a pasta `imagens/` existe
4. ✅ Verifique se todas as importações estão corretas

### Executável não funciona?
- 🔍 Verifique logs do workflow na aba **Actions**
- 🔍 Teste localmente com PyInstaller
- 🔍 Verifique se todas as dependências estão incluídas

### Problemas com paths?
Os workflows esperam esta estrutura:
```
repositório/
└── projetos/
    └── gestao-de-projetos-ageis/
        └── jogo/
            ├── main.py
            ├── requirements.txt
            ├── imagens/
            └── .github/
```

## ⚡ Performance

### Tempos de Compilação (Aprox.)
- **Linux**: ~3-5 minutos
- **Windows**: ~5-7 minutos
- **macOS**: ~5-7 minutos
- **Todas as plataformas**: ~8-12 minutos

### Tamanhos dos Executáveis
- **Todos**: ~20MB (inclui pygame e dependências)

## 📝 Personalização

### Modificar plataformas suportadas
Edite a seção `matrix` em qualquer workflow:
```yaml
strategy:
  matrix:
    include:
      - os: ubuntu-latest
        platform: linux
        # ... outras configurações
```

### Adicionar mais testes
Adicione steps após a compilação:
```yaml
- name: Run custom tests
  run: |
    # Seus testes aqui
```

### Modificar configurações do PyInstaller
Edite o comando `pyinstaller`:
```yaml
pyinstaller --onefile \
  --windowed \
  --add-data "imagens:imagens" \
  --add-data "sounds:sounds" \
  --icon="icon.ico" \
  main.py
```