### [Estrutura do Projeto Inicial <br> Lendo dados apartir de um json](https://github.com/jaimedessilva/api-restaurante)

```
menu-api/
│
├── src/
│   ├── controllers/
│   │   ├── categoriaController.js
│   │   ├── pratoController.js
│   │   └── pedidoController.js
│   │
│   ├── routes/
│   │   ├── categoriaRoutes.js
│   │   ├── pratoRoutes.js
│   │   └── pedidoRoutes.js
│   │
│   ├── middlewares/
│   │   └── errorMiddleware.js
│   │
│   ├── utils/
│   │   └── database.js
│   │
│   └── app.js
│
├── database.json
├── server.js
├── package.json

```

### Instalar dependências

```
npm init -y
npm install express cors uuid
```

### Como Rodar

```
node server.js 
ou 
npx nodemon server.js

```

### Paginação
```
GET /pratos?page=1&limit=2
```
###  Filtrar destaque
```
GET /pratos?destaque=true
```
### Filtrar por categoria
```
GET /pratos?categoriaId=cat2
```