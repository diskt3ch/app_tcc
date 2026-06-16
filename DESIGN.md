---
name: Raízes do Nordeste
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#5a4139'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8e7067'
  outline-variant: '#e2bfb4'
  surface-tint: '#aa3600'
  primary: '#a63500'
  on-primary: '#ffffff'
  primary-container: '#d04501'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59c'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#904917'
  on-tertiary: '#ffffff'
  tertiary-container: '#ae602d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822800'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdbc9'
  tertiary-fixed-dim: '#ffb68c'
  on-tertiary-fixed: '#321200'
  on-tertiary-fixed-variant: '#753401'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  touch-target: 48px
  kiosk-gutter: 32px
---

## Marca e Estilo

O design do Raízes do Nordeste mistura a cara do Nordeste (cores quentes, clima de feira, sol e terra) com a parte mais moderna de um sistema de gestão. A ideia é que o cliente sinta acolhimento e o gerente tenha uma tela limpa pra trabalhar.

Basicamente dividimos em duas experiências:

1. **Tela do Cliente:** visual mais quente, com bastante espaço, cores vibrantes (terracotta, amarelo). Pensado pra ser bonito e fácil de usar no celular ou no totem.
2. **Painel do Admin:** visual limpo e claro, sem firula, focado em mostrar os dados de forma organizada. Fundo claro com detalhes em terracotta.

## Cores

A paleta é a mesma pro app todo, só muda a intensidade dependendo da tela:

### Cores principais
*   **Primária (Terracotta):** `#a63500` - cor da marca, usada nos botões e destaques.
*   **Secundária (Bronze/Amarelo):** `#7c5800` - pra highlights e preços.
*   **Fundo:** `#fcf9f8` - um branco bem leve, quase bege. Não cansa a vista.
*   **Cards:** `#ffffff` / `#f6f3f2` - brancos quentes pros containers.

## Tipografia

Usamos 3 fontes diferentes, cada uma com um propósito:

*   **Bricolage Grotesque** — pros títulos e nomes de pratos. Tem um estilo mais artesanal que combina com a temática nordestina.
*   **Be Vietnam Pro** — pro texto normal, descrições e navegação. Boa leitura.
*   **JetBrains Mono** — só pros IDs de pedido e horários. É monospace, então fica fácil de ler números.

## Layout e Espaçamento

O layout muda dependendo de onde o cliente tá usando:

### App do cliente e Totem
*   Grid de 4 colunas no celular, 12 no totem.
*   Botões grandes (mínimo 56px) pra facilitar o toque rápido.
*   Bastante espaço entre as categorias (40px).

### Painel do Admin
*   Grid de 12 colunas.
*   Espaçamento menor (12px) pra caber mais informação na tela.
*   Tabela de pedidos com linhas alternando cor pra facilitar a leitura.

## Sombras e Bordas
*   Sombras suaves e bordas de 1px (`border-surface-container-high`). O visual é limpo, sem nada escuro ou neon.

## Arredondamento
*   Padrão: 8px nos botões, cards e inputs.
*   Containers maiores do app do cliente: 24px.

## Componentes

### Botões
*   **Cliente:** botão grande terracotta com texto branco. Padding de 24px.
*   **Admin:** botão terracotta ou botão outline com borda da cor primária.

### Cards
*   **Card de Produto:** imagem na esquerda, info na direita, preço em destaque.
*   **Card de Pedido (Admin):** fundo claro, borda sutil, labels de texto.

### Campos de Input
*   **Cliente:** borda cinza quente, padding de 16px.
*   **Admin:** borda cinza clara.

### Listas
*   **Tabela do Admin:** linhas alternando entre `#ffffff` e `#fbfaf9` (zebra) pra facilitar a leitura.