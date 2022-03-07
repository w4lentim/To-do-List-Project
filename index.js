// Configurações do Express
const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const connectToDb = require('./database/db');

connectToDb();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

// Configurações de Rotas
app.use(routes);

// Configurações de inicialização do Server
app.listen(process.env.PORT || port, () => {
    console.log(`Servidor está sendo executado em http://localhost:${port} com Express`);
    console.log('Pressione CTRL+C para finalizar a execução.');
});