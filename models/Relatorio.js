const conexao = require('../infra/conexao');
const resolveInclude  = require('ejs');
const { response } = require('express');

class Relatorio {

    buscaDadosVisitasClientes(id){
        return new Promise((resolve, reject) =>{

            const sql = `SELECT clientes.data_criacao, 
                    clientes.id_cliente, 
                    clientes.cliente, 
                    clientes.email, 
                    cliente_id${id}.tipo_qrcode,
                    cliente_id${id}.visitas_apple, 
                    cliente_id${id}.visitas_android,
                    cliente_id${id}.visitas_android +  cliente_id${id}.visitas_apple as total
                    FROM cliente_id${id} 
                    JOIN clientes 
                    ON cliente_id${id}.id_cliente = clientes.id_cliente
                    WHERE id_qrcode = 2`;


            conexao.query(sql, (erros,resultados) =>{
                if(erros){
                    console.error('erro ao pesquisar cliente para o relatório', id, erros);
                    reject(erros);
                } else {
                    //console.log(resultados)
                    resolve(resultados[0])
                }
            })
        })
    }

    async buscaDadosClientesGeralDB(res){

        const ids = await this.buscaIDs();
        var total = [];

        for(var i = 0; i < ids.length; i++){

            var busca = await this.buscaDadosVisitasClientes(ids[i].id_cliente);
            total.push(busca);
            if(i == ids.length -1){
                res.send(total)
            }
        }
    }

    buscaIDs(){
        return new Promise((resolve,reject) => {

            const sql = 'SELECT id_cliente FROM clientes';
            conexao.query(sql, (erros, resultados) => {
                if(erros) {
                console.log(erros);
                console.log('erro ao gerar o relatório de clientes');
                reject();
                } else {
                    resolve(resultados);
                    console.log('sucesso ao buscar o relatório de clientes no DB')
                }
            })
        })
    }

}

module.exports = new Relatorio;