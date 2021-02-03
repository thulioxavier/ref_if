const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const router = require("./router/router");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

app.listen(3000, function() {
  console.log('Servidor Web rodando na porta 3000')
});

