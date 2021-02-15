const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const tp = require("./database/Connection");
const TYPES = require('tedious').TYPES;
const dp = require("./database/database");




//Engine de Visualização/Pastas Estaticas
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rotas GET
app.get("/", function(req,resp){
    resp.send("Rota Inválida");
});

app.get("/Form", function(req,resp){
    resp.render("index");
});

// Rota para retorno de Dados.
app.post("/Received", async function(req,resp){
    
  
    principal();
    async function principal(teste){
        //Função para inserir dados recebedidos do Front
        try{var name = await dp.insertDatabase('tbs_nome','nome',req.body.nome,req.body.dado.substring(2,5));}catch{};
        try{var surname = await dp.insertDatabase('tbs_sobrenome','sobrenome',req.body.nome,req.body.dado.substring(8,11));}catch{}
        try{var email = await dp.insertDatabase('tbs_email','email',req.body.nome,req.body.dado.substring(14,18))}catch{}
        if(name.result == 'Completed' && surname.result == 'Completed' && email.result == 'Completed'){
              try{var somaname = await dp.selectTotal('tbs_cod_nome',req.body.dado.substring(2,5))}catch{}
              try{var somasurname = await dp.selectTotal('tbs_cod_sobrenome',req.body.dado.substring(8,11))}catch{}
              try{var somaemail = await dp.selectTotal('tbs_cod_email',req.body.dado.substring(14,18))}catch{}
              var soma =somaname.soma + somasurname.soma + somaemail.soma;
              try{var acp = await dp.selectAcp(soma)}catch{};
              result = { result : 'Success', animal:acp.animal, cor:acp.cor, pais:acp.pais}
              resp.send(result)
        }else{
              result = { result : 'Error'}
              resp.send(result)
        }
    }
});


app.listen(4000,() =>{console.log("Run Application");});