const TYPES = require('tedious').TYPES;
const tp = require("./Connection");



module.exports = {
    //Função para insert dados no Banco, com parametros de Tabela, Campo e ID
    insertDatabase(table,field,desc,id){
        return new Promise((resolve,reject)=>{
            tp.sql("insert into "+table+" ("+field+", cod) values('"+desc+"', "+id+")" )
            .execute()
            .then(function(rowCount) {
                resolve(result ={ result: 'Completed', id:id}  ) 
            }).fail(function(err) {
                reject(result ={ result: 'Incompleted', id:id}  ) 
            });        
        
        })
    },
    //função para retornar o Total da soma, recebendo parametros de Tabela e ID
    selectTotal(table,id){
        return new Promise((resolve,reject)=>{
            tp.sql("SELECT * FROM "+table+" where cod="+id)
            .execute()
            .then(function(results) {
                var soma = parseInt(results[0].soma) + parseInt(id);
                resolve({id:id, soma: soma})
            }).fail(function(err) {
                console.log(err);
            });
        })
    },

    //Função para trazer dados de Animal Cor e Paises relacionados a SOMA
    selectAcp(id){
        return new Promise((resolve,reject)=>{
            tp.sql("SELECT A.animal,C.cor, P.pais FROM tbs_animais as A INNER JOIN tbs_paises as P on P.total = A.total INNER JOIN tbs_cores as C on C.total = A.total and C.cor not in(SELECT ce.cor from tbs_cores_excluidas as ce where ce.total ="+id+")  WHERE A.total ="+id)
            .execute()
            .then(function(results) {
                resolve(results[0]);
            }).fail(function(err) {
                console.log(err);
            });
        })
    }
};
