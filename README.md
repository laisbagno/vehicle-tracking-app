# Vehicle Tracking App

Aplicação fullstack para visualização de rotas de veículos com animação em tempo real no mapa, suporte a múltiplos idiomas e dados dinâmicos consumidos de uma API.

---

## 🚀 O que foi feito

- Integração entre backend e frontend via API REST.
- Animação de veículo em tempo real no mapa com base em dados de GPS.
- Exibição de rotas, pontos de parada e destino final com ícones personalizados.
- Velocímetro dinâmico indicando a velocidade atual do veículo.
- Internacionalização com suporte a português, inglês e espanhol.
- Layout moderno e estilizado com SCSS.
- Estrutura em monorepo usando npm workspaces.
- Teste básico de API no backend com Jest e Supertest.
- Comando único `npm run dev` para rodar toda a aplicação simultaneamente.

---

## 🧱 Estrutura do Projeto

```
vehicle-tracking-app/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── i18n/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
├── package.json
└── README.md
```

---

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js + Express** — Para criação de uma API leve e rápida.
- **TypeScript** — Tipagem estática para evitar erros em tempo de desenvolvimento.
- **CORS** — Permitir requisições cross-origin entre frontend e backend.
- **Jest + Supertest** — Para testes automatizados de rotas (testado: `/routes`).

### Frontend
- **React + Vite** — Para desenvolvimento ágil e experiência moderna de SPA.
- **React Router** — Gerenciamento de rotas internas.
- **TypeScript** — Garantia de tipagem forte e segurança de código.
- **SCSS Modules** — Estilização encapsulada e organizada.
- **Leaflet.js** — Renderização de mapas leves e customizáveis.
- **i18next** — Internacionalização eficiente e bem suportada.

### Outras decisões
- **Monorepo com npm workspaces** — Facilita a manutenção do projeto completo.
- **Sprites para direção do carro** — Permite uma simulação visual mais realista.
- **MapTiler** — Tiles de mapa com visual moderno e responsivo.
- **Componente de velocímetro** — Feedback visual em tempo real para o usuário.

---

## ▶️ Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/laisbagno/vehicle-tracking-app
cd vehicle-tracking-app
```

2. Instale as dependências:

```bash
npm install
```

3. Execute toda a aplicação (frontend + backend):

```bash
npm run dev
```

---

## ✅ Testes

- Backend: testado endpoint `/routes` com Jest e Supertest.
- Frontend: testes não implementados, mas estrutura preparada para futura inclusão com Jest + React Testing Library.

---

## 📦 Melhorias Futuras

- Adicionar testes automatizados no frontend.
- Responsividade completa para mobile.
- Armazenamento persistente de histórico de rotas.

---
## 📸 Preview do projeto
<img width="1918" height="908" alt="image" src="https://github.com/user-attachments/assets/aeeb67e7-59c5-437d-a086-2c03824859a4" />

---

## 👩‍💻 Autora

Desenvolvido por [Laís Bagno](https://www.linkedin.com/in/laisbagno/) 🚀
