# Trabalho de Conclusão de Curso: Sistema Raízes do Nordeste

## 1. Introdução
Esse documento descreve o sistema "Raízes do Nordeste", que é basicamente um app pra gerenciar pedidos de uma rede de lanchonetes de comida nordestina. A ideia é ter tudo num lugar só: app pro cliente pedir, totem de autoatendimento, e um painel pro gerente acompanhar os pedidos.

O foco do sistema é funcionar bem mesmo com bastante gente usando ao mesmo tempo, ter um visual bonito e moderno, e separar bem as responsabilidades (frontend, backend, banco de dados).

## 2. Análise e Requisitos

### Requisitos Funcionais (RF)
- **RF01:** O cliente consegue escolher em qual filial quer pedir (Recife Centro ou Olinda Histórica).
- **RF02:** O cardápio mostra os itens disponíveis naquela unidade.
- **RF03:** Tem um carrinho pra ir adicionando e tirando itens.
- **RF04:** O pagamento é feito via PIX e é processado de forma separada (não trava a tela esperando).
- **RF05:** O painel do admin mostra os pedidos em tempo real.
- **RF06:** Tem campo de consentimento pra LGPD quando o cliente se cadastra.
- **RF07:** Antes de pagar, o sistema pergunta se o cliente quer consumir no local, retirar ou receber em casa.
- **RF08:** Se for entrega, o app pega a localização do GPS do celular pra preencher o endereço, e pede o telefone.
- **RF09:** Se for consumir no local ou retirar, dá pra agendar um horário.
- **RF10:** O painel admin tem login pra só o gerente acessar.

### Requisitos Não Funcionais (RNF)
- **RNF01:** O sistema precisa aguentar os horários de pico sem cair.
- **RNF02:** O app do cliente tem que carregar em menos de 2 segundos.
- **RNF03:** No totem, os botões precisam ser grandes pra facilitar o toque.
- **RNF04:** Usar Firebase (serverless) pra escalar automaticamente.

## 3. Modelagem e Arquitetura

### Entidades Principais (DER Simplificado)
1. **Unidade:**
   - Campos: `id`, `nome`, `tipo`, `status`, `endereco`.
   - Tem vários Produtos e Pedidos ligados a ela.
2. **Produto:**
   - Campos: `id`, `nome`, `categoria`, `preco_base`, `sazonalidade`.
   - A disponibilidade muda conforme a unidade.
3. **Cliente (Fidelidade):**
   - Campos: `id`, `nome`, `cpf`, `email`, `pontos`, `termo_lgpd`, `data_consentimento`.
4. **Pedido:**
   - Campos: `id`, `cliente_id`, `unidade_id`, `canal`, `status_preparo`, `pagamento_status`, `total`.
   - O status é atualizado pelo webhook quando o pagamento é confirmado.

### Como funciona o pagamento
O pagamento não é síncrono — ou seja, o app não fica travado esperando o banco confirmar. O que acontece:
1. O cliente confirma o pedido e o app grava no Firestore com status "PROCESSANDO"
2. Mostra o QR Code do PIX pra pessoa pagar
3. Quando o banco confirma, manda um POST pra nossa Cloud Function
4. A function atualiza o status pra "APPROVED" e libera o pedido na cozinha

---

## 4. Uso de IA e o que eu aprendi

Eu usei IA durante o desenvolvimento (Antigravity e Stitch), mas não foi tipo copiar e colar código pronto. A IA funcionou mais como um colega de trabalho que ia me explicando as coisas enquanto a gente construía junto. Tipo um pair programming mesmo.

### 4.1. O que aprendi no Frontend
- **React com Vite:** antes eu só tinha mexido com HTML puro. A IA me ajudou a entender como funciona componente, props, e como dividir a tela em partes reutilizáveis.
- **Tailwind:** aprendi a configurar o `tailwind.config.js` com as cores do design, usar as classes utilitárias e entender como funciona responsividade na prática.
- **useState:** passei a entender como o React controla o que aparece na tela, tipo quando o usuário clica num botão e muda de tela.
- **Geolocalização:** aprendi a usar o `navigator.geolocation` pra pegar as coordenadas do GPS do celular. Também aprendi que precisa tratar quando o usuário nega a permissão (aí usa um endereço fake pra teste).

### 4.2. O que aprendi no Backend
- **Cloud Functions:** ao invés de fazer um servidor Express normal, aprendi que dá pra criar funções soltas que rodam no Firebase quando alguém faz uma requisição.
- **Webhook:** implementei a função `webhookPagamento` que recebe um POST e atualiza o pedido no banco. Isso me fez entender na prática como funciona comunicação assíncrona entre sistemas.
- **Por que desacoplar:** entendi que em sistema de verdade não dá pra travar a tela do cliente esperando o banco responder. É melhor confirmar o pedido e depois atualizar.

### 4.3. O que aprendi de Banco de Dados
- **Firestore (NoSQL):** é bem diferente de SQL. Não tem tabela, tem coleção e documento. No começo estranhei mas depois fez sentido.
- **Security Rules:** configurei as regras de segurança pra que o cardápio seja público mas os pedidos precisem de autenticação.

### 4.4. O que aprendi de Infra
- **firebase.json:** esse arquivo controla tudo — onde tá o frontend pra deploy, onde estão as functions, etc.
- **NPM e terminal:** tive uns perrengues com diretório errado na hora de rodar os comandos, mas aprendi a usar o terminal pra instalar pacotes e rodar o dev server.

### 4.5. Exemplos de prompts que eu usei
Alguns exemplos de como eu pedia ajuda pra IA:
1. *"Com base no design do Stitch, vamos criar o projeto. Preciso documentar tudo que usamos de IA."*
2. *"Como faço pra liberar só o cardápio como público no Firestore Rules?"*
3. *"Me ajuda a transformar esse HTML grande num componente React que controla qual unidade tá selecionada?"*

> **Resumindo:** a IA me ajudou muito a sair da teoria pra prática. Sem ela ia demorar bem mais pra entender como montar um projeto full-stack de verdade. Mas eu precisei entender cada parte pra poder pedir as coisas certas — não é só mandar "faz pra mim" que funciona.
