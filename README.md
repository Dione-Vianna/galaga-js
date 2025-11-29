# 🚀 GALAGA - Arcade Game

Um jogo arcade clássico desenvolvido com **React**, **Vite** e **Tailwind CSS**. Reproduz a experiência autêntica do lendário jogo Galaga com gráficos retrô, efeitos visuais neon e gameplay desafiador.

![Galaga JS](https://img.shields.io/badge/Galaga-JS-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-teal?style=flat-square)

## 📋 Características

### 🎮 Gameplay
- **4 tipos de inimigos** com diferentes velocidades e dificuldades
- **Sistema de waves** com dificuldade progressiva
- **Colisões precisas** entre tiros, inimigos e player
- **Sistema de vidas** e Game Over
- **High score** persistente (salvo no localStorage)

### ⚡ Power-ups
- 🔥 **Tiro Duplo** - Dispara 2 tiros simultaneamente
- 🛡️ **Escudo** - Protege de uma colisão
- ⚡ **Velocidade** - Aumenta a velocidade de movimento
- ❤️ **Vida Extra** - Adiciona uma vida ao máximo

### 🎨 Visual
- Estilo arcade retrô com fonte "Press Start 2P"
- **Efeitos CRT** com scanlines
- **Glow neon** em elementos principais
- **Fundo de estrelas** animado
- **Nave SVG** customizada estilo Galaga
- Animações suaves e responsivas

### 🔊 Sistema de Áudio
- **Música de fundo** ambiente para maior imersão
- **Efeitos sonoros** gerados com Web Audio API:
  - 🔫 Som de tiro
  - 💥 Explosão de inimigo
  - ⚡ Impacto de tiro
  - ✨ Coleta de power-up
  - 💔 Dano ao jogador
  - 🎮 Game Over

### 🕹️ Controles Desktop
| Tecla | Ação |
|-------|------|
| `← →` ou `A D` | Mover nave |
| `ESPAÇO` | Atirar |
| `P` ou `ESC` | Pausar/Despausar |
| `ENTER` ou `ESPAÇO` | Iniciar jogo |

### 📱 Controles Mobile
| Botão | Ação |
|-------|------|
| `◀` `▶` | Mover nave esquerda/direita |
| `🔥 FIRE` | Atirar (segure para tiro contínuo) |
| `⏸` | Pausar/Despausar |

## 🚀 Como Começar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/galaga-js.git
cd galaga-js

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O jogo estará disponível em `http://localhost:5173/`

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
galaga-js/
├── src/
│   ├── components/
│   │   ├── Game.jsx           # Componente principal do jogo
│   │   ├── Menu.jsx           # Menu inicial (responsivo)
│   │   ├── Player.jsx         # Nave do jogador (SVG)
│   │   ├── Enemy.jsx          # Inimigos
│   │   ├── Bullet.jsx         # Tiros
│   │   ├── Explosion.jsx      # Explosões
│   │   ├── PowerUp.jsx        # Power-ups
│   │   ├── HUD.jsx            # Interface do jogo
│   │   ├── StarField.jsx      # Fundo de estrelas
│   │   └── MobileControls.jsx # Controles touch mobile
│   ├── contexts/
│   │   └── AudioContext.jsx   # Gerenciamento de áudio global
│   ├── hooks/
│   │   └── useGame.js         # Lógica e constantes do jogo
│   ├── App.jsx                # Componente raiz
│   ├── main.jsx               # Entrada da aplicação
│   └── index.css              # Estilos globais
├── public/
│   ├── music/                 # Arquivos de música (opcional)
│   └── vite.svg               # Ícone
├── index.html                 # HTML principal
├── vite.config.js             # Configuração Vite
├── tailwind.config.js         # Configuração Tailwind
├── postcss.config.js          # Configuração PostCSS
├── package.json               # Dependências
└── .gitignore                 # Arquivos ignorados
```

## 🎯 Mecânicas do Jogo

### Progression
- Comece com inimigos básicos (👾)
- Cada 10-15 inimigos derrotados, avança uma wave
- Novas waves introduzem inimigos mais difíceis

### Tipos de Inimigos
| Tipo | Emoji | Pontos | Velocidade | Vida |
|------|-------|--------|-----------|------|
| Basic | 👾 | 100 | Normal | 1 |
| Fast | 👽 | 150 | Rápida | 1 |
| Tank | 🛸 | 300 | Lenta | 2 |
| Boss | 🔮 | 500 | Muito Lenta | 3 |

### Sistema de Score
- Cada inimigo derrotado fornece pontos
- Pontos aumentam com a dificuldade
- High score é salvo automaticamente

## 🎨 Customização

### Alterar tamanho da área de jogo
Edite `src/hooks/useGame.js`:
```javascript
export const GAME_WIDTH = 480  // Largura
export const GAME_HEIGHT = 640 // Altura
```

### Ajustar dificuldade
```javascript
export const ENEMY_SPEED_BASE = 2      // Velocidade base
export const SPAWN_INTERVAL = 1500     // Intervalo de spawn
export const MAX_BULLETS = 5           // Limite de tiros
```

### Modificar cores
Edite `tailwind.config.js` para alterar o tema:
```javascript
colors: {
  'arcade-yellow': '#FFD700',
  'arcade-cyan': '#00FFFF',
  'arcade-pink': '#FF69B4',
  'arcade-green': '#00FF00',
  'arcade-red': '#FF0000',
}
```

## 🔧 Dependências Principais

- **React** - Biblioteca UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Utility-first CSS
- **PostCSS** - Processador CSS
- **Web Audio API** - Efeitos sonoros procedurais
- **HTML5 Audio** - Música de fundo

## 📱 Compatibilidade

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Mobile (iOS, Android) - Controles touch otimizados
- ✅ Tablet - Interface adaptativa
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🐛 Bugs Conhecidos

Nenhum no momento! Relate issues em: [GitHub Issues](https://github.com/seu-usuario/galaga-js/issues)

## 🎮 Dicas de Gameplay

1. **Foque em esquivar** - A defesa é melhor que o ataque
2. **Colete power-ups** - Tiro duplo é muito útil
3. **Mantenha movimento constante** - Inimigos são rápidos em waves altas
4. **Escudo é valioso** - Use para atravessar ondas difíceis
5. **Pause para respirar** - Use `P` para pensar na estratégia
6. **No mobile** - Segure o botão FIRE para tiro contínuo

## 📄 Licença

Este projeto é de código aberto sob a licença MIT. Veja `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

Desenvolvido como um projeto de aprendizado em React e Game Development.

## 🎉 Créditos

Inspirado no clássico arcade **Galaga (1981)** - Namco

---

**Divirta-se jogando! 🚀**

📱 No mobile? Toque para começar!  
🖥️ No desktop? Pressione ENTER para começar! 🎮
