# Trabalho de Conclusão de Curso: Sistema Raízes do Nordeste

## 1. Introdução
O presente documento descreve o projeto, arquitetura e os requisitos da solução "Raízes do Nordeste". O sistema foi concebido para gerenciar uma rede de lanchonetes de culinária nordestina, unificando múltiplos canais de venda (App, Totem de Autoatendimento, Balcão/PDV) e oferecendo uma gestão centralizada para a Matriz.

A premissa do sistema foca em alta disponibilidade, performance e uma estética de interface robusta (Design Clean e Moderno para a Matriz e Modern Regionalist para os clientes).

## 2. Análise e Requisitos

### Requisitos Funcionais (RF)
- **RF01:** O sistema deve permitir que o cliente selecione a unidade desejada (ex: Recife Centro, Olinda Histórica).
- **RF02:** O sistema deve listar o cardápio dinamicamente com base no estoque e sazonalidade da unidade escolhida.
- **RF03:** O sistema deve suportar um carrinho de compras para adição e remoção de itens.
- **RF04:** O sistema deve possuir um fluxo de checkout com pagamento desacoplado (processado por gateway externo).
- **RF05:** O painel administrativo deve exibir os pedidos em tempo real.
- **RF06:** O sistema deve gerenciar a fidelidade do cliente mediante consentimento (LGPD).
- **RF07:** O sistema deve perguntar a modalidade de consumo (Consumir no Local, Retirada ou Entrega) através de um modal de preferências.
- **RF08:** Para Entrega, o sistema deve capturar a geolocalização do usuário (coordenadas GPS via navegador) para preencher o endereço, além de coletar o telefone de contato.
- **RF09:** Para Consumo Local ou Retirada, o sistema deve fornecer a opção de agendamento de horário.
- **RF10:** O painel administrativo deve possuir controle de acesso restrito (login/senha) para autenticar o gerente operacional.

### Requisitos Não Funcionais (RNF)
- **RNF01:** A aplicação deve ser tolerante a falhas (alta disponibilidade) durante horários de pico.
- **RNF02:** O tempo de carregamento no App cliente deve ser inferior a 2 segundos (Mobile-First).
- **RNF03:** A UI de Autoatendimento (Totem) deve ter grandes áreas de toque (Kiosk Mode) e navegação linear.
- **RNF04:** O sistema deve adotar arquitetura Serverless (Firebase) para auto-escala e resiliência.

## 3. Modelagem e Arquitetura

### Entidades Principais (DER Simplificado)
1. **Unidade:**
   - Atributos: `id`, `nome`, `tipo`, `status`, `endereco`.
   - Relacionamento: Possui muitos Produtos e Pedidos.
2. **Produto:**
   - Atributos: `id`, `nome`, `categoria`, `preco_base`, `sazonalidade`.
   - Regra: Disponibilidade variável por unidade.
3. **Cliente (Fidelidade):**
   - Atributos: `id`, `nome`, `cpf`, `email`, `pontos`, `termo_lgpd`, `data_consentimento`.
4. **Pedido:**
   - Atributos: `id`, `cliente_id`, `unidade_id`, `canal`, `status_preparo`, `pagamento_status`, `total`.
   - Relacionamento: Atualizado via Webhook.

### Fluxo de Pagamento Desacoplado
A comunicação com o gateway de pagamentos é assíncrona. O Frontend registra a intenção no Firestore, gerando um Pedido com status pendente. Um Webhook (Firebase Cloud Function) aguarda o retorno do Gateway (ex: PIX) e atualiza o `status_pagamento` para aprovado, liberando o pedido para a cozinha ("PREPARANDO").

---

## 4. Anexos: Declaração de Uso de IA e Trilhas de Aprendizado

Este projeto foi desenvolvido com suporte ativo de Inteligência Artificial (Antigravity e Stitch). O objetivo da utilização de IA não foi a geração automática e passiva de código, mas sim atuar como um **Pair Programmer** acelerando o desenvolvimento e proporcionando um **aprendizado direto** nas seguintes esferas da engenharia de software:

### 4.1. Aprendizado em Edição de Código (Front-end)
- **Trabalho com Frameworks Modernos:** A IA facilitou a transição de um protótipo em HTML puro gerado pelo Stitch para uma aplicação React (Vite) componentizada.
- **Ecossistema:** Aprendi a estruturar o `tailwind.config.js`, injetar as cores baseadas no `DESIGN.md`, configurar web fonts e utilizar hooks de estado (`useState`) para interatividade real (seleção de unidades).
- **Acessibilidade e Layout:** O uso das classes utilitárias do Tailwind demonstrou na prática a eficiência do CSS grid e flexbox para construir painéis responsivos.
- **Integração com APIs do Navegador (Geolocalização):** Aprendi a integrar e lidar de forma assíncrona com a Geolocation API nativa (`navigator.geolocation`), tratando permissões e fornecendo um fallback simulado amigável para testes. Também exercitei a criação de formulários reativos e condicionais em modais de preferências.

### 4.2. Aprendizado em Arquitetura e Backend (Firebase)
- **Serverless:** Ao invés de levantar uma API monolítica tradicional, aprendi a estruturar o backend através de **Cloud Functions** em Node.js.
- **Webhooks:** A implementação da Cloud Function (`webhookPagamento`) me ensinou como lidar com chamadas externas (POST) e processar a lógica de atualização de pagamentos desacoplados, além de testar as requisições.
- **Desacoplamento:** Ficou claro na prática por que sistemas distribuídos não seguram as requisições web até o banco confirmar (assincronicidade e tolerância a falhas).

### 4.3. Aprendizado em Banco de Dados (Firestore)
- **Bancos NoSQL Orientados a Documentos:** Entendi o modelo mental do Firestore, estruturando coleções de Pedidos e Produtos sem as travas rígidas de um banco relacional.
- **Segurança (Security Rules):** Configurei o arquivo `firestore.rules` simulando proteções reais de leitura/escrita, onde o cardápio (`/unidades`) é público, mas outras regras dependem de autenticação.

### 4.4. Aprendizado em Infraestrutura (Deploy e CLI)
- **Configurações Globais:** Explorei a criação do arquivo `firebase.json` unificando o controle do deploy do Frontend (`hosting`) e da API (`functions`).
- **NPM e Linha de Comando:** Superei desafios com a execução de scripts e ferramentas de build via shell, entendendo as flags e diretórios raiz de cada serviço.

### 4.5. Prompts Utilizados
Os prompts a seguir exemplificam a interação para guiar a arquitetura:
1. *"Com base no design do Stitch e na instrução do Antigravity, vamos fazer a criação do nosso projeto. Preciso de uma documentação extensa de tudo que usamos de IA."*
2. *"Como estruturar o Firestore Rules para permitir que apenas os itens do cardápio sejam públicos?"*
3. *"Como reescrever este HTML longo em um componente React modular que gerencie o estado da unidade selecionada?"*

> **Conclusão Acadêmica:** O auxílio da IA foi fundamental para transpor a teoria de arquitetura de software para a prática full-stack. O modelo de *pair programming* permitiu focar no entendimento das engrenagens do projeto (design system, serverless webhooks e segurança NoSQL), validando a proficiência do aluno nas tecnologias modernas exigidas pelo mercado de trabalho.
