# 🗺️ GALAGA JS - Roadmap

Este documento descreve as funcionalidades planejadas para futuras versões do jogo.

---

## 📊 Status das Versões

| Versão | Status | Descrição |
|--------|--------|-----------|
| v1.0 | ✅ Concluída | Jogo base completo |
| v1.1 | 🚧 Planejada | Melhorias de gameplay |
| v1.2 | 📋 Futura | Sistema de conquistas |
| v2.0 | 💡 Conceito | Modo multiplayer |

---

## ✅ v1.0 - Release Inicial (Atual)

### Funcionalidades Implementadas
- [x] Sistema de jogo completo com game loop
- [x] 4 tipos de inimigos com comportamentos únicos
- [x] Sistema de waves progressivas
- [x] 4 tipos de power-ups (Tiro Duplo, Escudo, Velocidade, Vida Extra)
- [x] Nave customizada em SVG estilo Galaga
- [x] Interface arcade com efeitos CRT e neon
- [x] Fundo de estrelas animado
- [x] Sistema de áudio (música de fundo + efeitos sonoros)
- [x] Suporte completo a mobile com controles touch
- [x] High score persistente no localStorage
- [x] Menu responsivo para desktop e mobile

---

## 🚧 v1.1 - Melhorias de Gameplay

### 🎯 Novos Inimigos
- [ ] **Inimigo Kamikaze** - Persegue o jogador em linha reta
- [ ] **Inimigo Atirador** - Dispara projéteis contra o jogador
- [ ] **Inimigo Dividir** - Se divide em 2 ao ser destruído
- [ ] **Mini-Boss** a cada 5 waves

### 🔫 Novos Power-ups
- [ ] **Laser** - Disparo contínuo em linha
- [ ] **Bomba** - Destrói todos inimigos na tela
- [ ] **Ímã** - Atrai power-ups automaticamente
- [ ] **Slow Motion** - Diminui velocidade dos inimigos temporariamente
- [ ] **Tiro Triplo** - 3 tiros em leque

### 🎮 Mecânicas
- [ ] **Sistema de Combos** - Bônus por kills consecutivos
- [ ] **Multiplicador de Score** - Aumenta com streak de acertos
- [ ] **Dash/Dodge** - Movimento rápido de esquiva com cooldown

### 🎨 Visual
- [ ] **Novas explosões** com partículas
- [ ] **Trilha da nave** ao se mover
- [ ] **Animações de spawn** para inimigos
- [ ] **Shake de tela** em eventos importantes

---

## 📋 v1.2 - Sistema de Conquistas e Progressão

### 🏆 Conquistas
- [ ] **Primeiro Sangue** - Destrua seu primeiro inimigo
- [ ] **Sobrevivente** - Chegue à wave 10
- [ ] **Veterano** - Chegue à wave 25
- [ ] **Mestre Galaga** - Chegue à wave 50
- [ ] **Perfeito** - Complete uma wave sem levar dano
- [ ] **Colecionador** - Colete 100 power-ups
- [ ] **Precisão** - 90% de acerto em uma wave
- [ ] **Speed Runner** - Complete wave 10 em menos de 3 minutos
- [ ] **Pacifista** - Sobreviva 30 segundos sem atirar
- [ ] **Combo Master** - Faça um combo de 20 kills

### 📈 Sistema de Níveis
- [ ] **XP por partida** baseado em score e conquistas
- [ ] **Níveis de piloto** com rankings
- [ ] **Desbloqueio de naves** por nível

### 🎨 Customização
- [ ] **Skins de nave** desbloqueáveis
- [ ] **Cores de tiro** customizáveis
- [ ] **Temas visuais** (Neon, Retro, Minimalista)

---

## 💡 v2.0 - Multiplayer e Social

### 👥 Modos de Jogo
- [ ] **Co-op Local** - 2 jogadores na mesma tela
- [ ] **Versus Mode** - PvP competitivo
- [ ] **Survival Mode** - Waves infinitas com dificuldade crescente
- [ ] **Boss Rush** - Apenas chefes, um após o outro
- [ ] **Time Attack** - Máximo de pontos em tempo limitado

### 🌐 Online
- [ ] **Leaderboard Global** - Ranking mundial
- [ ] **Daily Challenges** - Desafios diários com recompensas
- [ ] **Torneios Semanais** - Competições com prêmios
- [ ] **Perfil de Jogador** - Stats e histórico

### 📱 Social
- [ ] **Compartilhar Score** nas redes sociais
- [ ] **Replay System** - Gravar e compartilhar partidas
- [ ] **Spectator Mode** - Assistir partidas ao vivo

---

## 🔮 v3.0 - Expansão do Universo (Conceito Futuro)

### 🌌 Campanha
- [ ] **Modo História** - Narrativa com cutscenes
- [ ] **Sistema de Fases** - Diferentes planetas/cenários
- [ ] **Boss Fights Épicos** - Chefes únicos com padrões de ataque

### 🛸 Sistema de Naves
- [ ] **Múltiplas naves** com habilidades únicas
- [ ] **Upgrade System** - Melhorar atributos da nave
- [ ] **Hangar** - Gerenciar frota de naves

### 🎵 Áudio Avançado
- [ ] **Trilha sonora dinâmica** que muda com intensidade
- [ ] **Vozes de piloto** para eventos
- [ ] **Mixer de áudio** nas configurações

---

## 🛠️ Melhorias Técnicas (Contínuas)

### Performance
- [ ] **Object Pooling** para bullets e explosões
- [ ] **Otimização de render** com React.memo
- [ ] **Web Workers** para física pesada
- [ ] **OffscreenCanvas** para melhor performance

### Acessibilidade
- [ ] **Modo daltônico** com cores adaptadas
- [ ] **Controles customizáveis**
- [ ] **Legendas** para efeitos sonoros
- [ ] **Modo de alto contraste**

### Qualidade
- [ ] **Testes unitários** com Jest
- [ ] **Testes E2E** com Playwright
- [ ] **CI/CD** com GitHub Actions
- [ ] **PWA** - Instalável como app

---

## 📝 Como Contribuir

Quer ajudar a desenvolver alguma feature? 

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Implemente a funcionalidade
4. Envie um Pull Request

### Prioridades de Contribuição
1. 🔴 **Alta** - Bugs e correções
2. 🟡 **Média** - Features da v1.1
3. 🟢 **Baixa** - Features conceituais

---

## 💬 Feedback

Tem sugestões de novas features? Abra uma [Issue](https://github.com/Dione-Vianna/galaga-js/issues) com a tag `enhancement`!

---

**Última atualização:** Novembro 2025

🚀 *O céu não é o limite, é apenas o começo!*
