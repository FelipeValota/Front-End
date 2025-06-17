# Projeto E-commerce

Este projeto contém uma aplicação completa de e-commerce separada em `backend` e `frontend`.

## Requisitos
- Node.js 18+
- MongoDB

## Instalação

```bash
# Backend
cd backend
cp .env.example .env # configure MONGO_URI e JWT_SECRET se necessario
npm install
npm run seed # popula o banco com produtos fictícios
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` e a API em `http://localhost:5000`.

## Funcionalidades
- Cadastro e login de usuários com senha criptografada (bcryptjs) e JWT.
- Listagem de produtos com filtros por nome, categoria e preço.
- Carrinho usando `localStorage`.
- Finalização de pedido com simulação de pagamento.
- Páginas de pedidos do usuário.
- Painel de administração para gerenciar produtos e pedidos.
- Responsividade total com Tailwind CSS.

Consulte cada diretório para mais detalhes.
