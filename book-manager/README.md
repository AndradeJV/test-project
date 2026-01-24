# Book Manager

CRUD de gerenciamento de livros com Node.js (Express) no backend e React (Vite) no frontend.

## Estrutura

```
book-manager/
├── backend/           # API Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── index.js
│   └── tests/
├── frontend/          # React + Vite
│   └── src/
│       ├── components/
│       └── App.jsx
└── package.json
```

## Instalação

```bash
cd book-manager

# Instalar dependências (backend e frontend)
npm run install:all

# Ou manualmente:
cd backend && npm install
cd ../frontend && npm install
```

## Executar

Terminal 1 - Backend (porta 3001):
```bash
cd backend && npm run dev
```

Terminal 2 - Frontend (porta 3000):
```bash
cd frontend && npm run dev
```

Acesse: http://localhost:3000

## Testes

```bash
cd backend && npm test
```

## API Endpoints

| Método | Endpoint        | Descrição           |
|--------|-----------------|---------------------|
| GET    | /api/books      | Lista todos livros  |
| GET    | /api/books/:id  | Busca livro por ID  |
| POST   | /api/books      | Cria novo livro     |
| PUT    | /api/books/:id  | Atualiza livro      |
| DELETE | /api/books/:id  | Remove livro        |

### Exemplo de payload (POST/PUT)

```json
{
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "year": 1954,
  "genre": "Fantasia"
}
```

## Stack

- **Backend**: Node.js, Express, JSON file database
- **Frontend**: React 18, Vite
- **Testes**: Jest, Supertest
