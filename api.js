const http = require('http'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require("multer")();
const port = process.env.PORT || 80;
require('dotenv').config();

app.use(require("cors")()); 
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui"});
})

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const anexo = req.file;
    require("./nodemail")(email, nome, telefone, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

const server = http.createServer(app); 
server.listen(port);
console.log(`API OK NA PORTA: ${port}`)