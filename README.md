# Simulador de Vida - Projeto Completo

## Visão Geral
Este é um simulador de vida web completo inspirado no BitLife e Real Lives, desenvolvido com HTML, CSS e JavaScript vanilla. O jogo simula uma vida completa desde o nascimento até a idade adulta, com sistemas complexos de educação, carreira, relacionamentos e saúde.

## Funcionalidades Implementadas

### ✅ Sistema de Geração de Personagem
- **Criação personalizada**: Nome, sobrenome, gênero e país
- **Geração aleatória de atributos**: Inteligência, saúde, beleza, carisma, força, disciplina e felicidade
- **Classes sociais**: Pobre, classe média e rica (afeta dinheiro inicial e acesso à educação)
- **Múltiplos países**: Brasil, EUA, Canadá, Reino Unido, França, Alemanha, Japão e Austrália

### ✅ Sistema de Atributos e Energia
- **7 atributos principais**: Cada um com valores de 0-100
- **Barras de progresso visuais**: Com cores dinâmicas baseadas nos valores
- **Sistema de energia anual**: 100 pontos por ano, limitando ações
- **Degradação por idade**: Atributos físicos diminuem com o envelhecimento

### ✅ Sistema Educacional Completo
- **Escolas públicas e privadas**: Com diferentes custos e qualidade
- **Cálculo automático de notas**: Baseado em atributos do personagem
- **6 matérias**: Matemática, Português, História, Geografia, Ciências, Educação Física
- **Progressão escolar**: Automática dos 6 aos 18 anos
- **Sistema de formatura**: Com bônus baseado no desempenho
- **Universidades**: Federal, Privada e Elite com diferentes requisitos
- **Cursos universitários**: Medicina, Engenharia, Direito, Administração, etc.

### ✅ Sistema de Carreira Esportiva
- **Carreira atlética completa**: Com treinamentos e competições
- **Progressão de habilidades**: Baseada em atributos físicos
- **Torneios e eventos**: Com premiações em dinheiro
- **Requisitos realistas**: Força e saúde mínimas para progressão

### ✅ Sistema de Eventos Interativos
- **Eventos por faixa etária**: Específicos para cada fase da vida
- **Múltiplas categorias**: Saúde, social, carreira, família, lifestyle
- **Eventos contextuais**: Baseados na situação atual do personagem
- **Escolhas com consequências**: Cada decisão afeta atributos e dinheiro
- **Sistema de pesos**: Eventos mais relevantes têm maior chance de aparecer

### ✅ Sistema de Relacionamentos
- **3 tipos de relacionamento**: Família, amigos e romântico
- **Interações específicas**: Para cada tipo de relacionamento
- **Degradação natural**: Relacionamentos se deterioram sem manutenção
- **Efeitos na felicidade**: Relacionamentos fortes aumentam bem-estar

### ✅ Sistema de Saúde
- **Condições médicas**: Resfriado, estresse, lesões, depressão
- **Tratamentos variados**: Com diferentes custos e eficácia
- **Efeitos nos atributos**: Doenças afetam múltiplos aspectos da vida
- **Prevenção**: Estilo de vida saudável reduz riscos

### ✅ Interface e Design
- **Design responsivo**: Funciona em desktop e mobile
- **Gradientes modernos**: Interface visualmente atrativa
- **Animações suaves**: Transições e efeitos visuais
- **Histórico de eventos**: Registro completo de todas as ações
- **Notificações**: Feedback visual para ações do jogador

## Arquitetura Técnica

### Estrutura de Arquivos
```
life-simulator/
├── index.html          # Interface principal
├── style.css           # Estilos e animações
├── script.js           # Lógica principal do jogo
└── data/
    ├── characters.js   # Geração de personagens
    ├── events.js       # Sistema de eventos
    ├── careers.js      # Sistema de carreiras
    ├── education.js    # Sistema educacional
    └── relationships.js # Relacionamentos e saúde
```

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Gradientes, animações e responsividade
- **JavaScript ES6+**: Lógica do jogo e manipulação DOM
- **Tailwind CSS**: Framework de utilitários CSS

## Mecânicas de Jogo

### Loop Principal
1. **Criação do personagem** com atributos aleatórios
2. **Ações anuais** limitadas por energia
3. **Progressão automática** em educação e carreira
4. **Eventos aleatórios** com escolhas significativas
5. **Envelhecimento** com efeitos realistas

### Sistema de Progressão
- **Educação**: 6-18 anos com notas automáticas
- **Universidade**: 18+ anos com requisitos específicos
- **Carreira**: Baseada em educação e atributos
- **Relacionamentos**: Manutenção ativa necessária
- **Saúde**: Gestão de condições médicas

### Economia do Jogo
- **Dinheiro familiar**: Afeta acesso a educação e tratamentos
- **Custos educacionais**: Escolas privadas e universidades
- **Gastos médicos**: Tratamentos e medicamentos
- **Investimentos sociais**: Presentes e eventos

## Diferenciais do Projeto

### 1. **Realismo Brasileiro**
- Contexto educacional brasileiro (escolas públicas/privadas)
- Moeda em reais
- Nomes e sobrenomes brasileiros

### 2. **Complexidade Sistêmica**
- Interação entre todos os sistemas
- Eventos contextuais baseados na situação do personagem
- Consequências de longo prazo para decisões

### 3. **Interface Moderna**
- Design profissional com gradientes
- Animações suaves e responsivas
- Experiência de usuário intuitiva

### 4. **Escalabilidade**
- Código modular e bem estruturado
- Fácil adição de novos eventos e carreiras
- Sistema de dados separado da lógica

## Possíveis Expansões Futuras

### Funcionalidades Adicionais
- **Mais carreiras**: Medicina, advocacia, tecnologia
- **Sistema de casamento**: Cerimônias e vida conjugal
- **Filhos**: Criação e educação de descendentes
- **Propriedades**: Compra de casas e veículos
- **Investimentos**: Ações, poupança e negócios
- **Crimes**: Sistema de atividades ilegais
- **Política**: Carreira política e eleições

### Melhorias Técnicas
- **Save/Load**: Sistema de salvamento
- **Múltiplos personagens**: Família completa
- **Estatísticas**: Gráficos de progressão
- **Conquistas**: Sistema de achievements
- **Multiplayer**: Interação entre jogadores

## Conclusão

Este simulador de vida representa um projeto completo e funcional que captura a essência dos jogos do gênero. Com sistemas interconectados e uma interface moderna, oferece uma experiência envolvente e realista de simulação de vida.

O código está bem estruturado e documentado, facilitando futuras expansões e melhorias. A arquitetura modular permite adicionar facilmente novas funcionalidades sem comprometer o sistema existente.

**Status**: ✅ Projeto completo e funcional
**Complexidade**: Alta - Sistema completo de simulação de vida
**Qualidade**: Profissional - Interface moderna e código bem estruturado

