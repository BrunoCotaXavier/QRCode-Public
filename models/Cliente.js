const conexao = require('../infra/conexao');

class Cliente{

    buscaIDCliente(email, res){

        return new Promise((resolve, reject) => {
    
          const sql = `SELECT id_cliente FROM clientes WHERE email='${email}'`;
    
          conexao.query(sql, (erro, resultados) =>{
            if(erro){
              console.log(erro);
              console.log('erro ao buscar o ID do cliente na tabela clientes');
              reject();
            } else {
              console.log('id pesquisado com sucesso na tabela de clientes');
    
              if(resultados.length <= 0){
                console.log('email não encontrado na tabela de clientes');
                res.send('emailFalse');
                return;
              } else {
                var dados = resultados[0];
                resolve(dados.id_cliente);
                console.log(dados.id_cliente);
              }
            }
          })
        })
    }

    criaClienteDB(dados){

        return new Promise((resolve, reject) =>{
    
          const sql = 'INSERT INTO clientes SET ?';
    
          const data = new Date();
    
          conexao.query(sql,{cliente: dados.nome, email: dados. email, plano: 'free', ativo: 'SIM', email_confirmado: 'NAO', data_criacao: data}, (erro, resultados) => {
    
            if(erro){
              reject(erro);
              console.log(erro);
              console.log('Erro ao criar o cadastro inicial na tabela de clientes')
            } else{
              resolve(resultados.insertId);
              console.log('Cadastro do cliente criado com sucesso na tabela de clientes')
            }
          })
        })
    }

    insereDadosTabelaCliente(dados, id){

        return new Promise((resolve, reject) => {
    
          const data = new Date();
    
          const sql = `INSERT INTO cliente_id${id} SET ?`;
    
          conexao.query(sql,{id_cliente: id, plano: 'free', ativo: 'SIM', email: dados.email, log:'cadastro', data_log: data, descricao_log: 'cadastro do cliente realizado com sucesso'}, (erro, resultados) => {
            if(erro){
              console.log(erro);
              console.log('não foi possível adicionar os dados do cliente ao DB');
              reject(erro);
            } else{
              console.log('dados do cliente adicionado com sucesso no DB');
              resolve()
            }
          })
    
        })
    }

    buscaQRCodeDB(id){

        return new Promise((resolve, reject) =>{
    
          const sql = `SELECT nome_qrcode, qrcode FROM cliente_id${id} WHERE eqrcode = 'SIM'`;
          
          conexao.query(sql, (erro, resultados) => {
            if(erro){
              console.log('erro ao buscar o qrcode no db');
              console.log(erro);
              reject();
            } else {
              console.log('sucesso ao buscar qrcode no db');
              resolve(resultados);
            }
          })
        })
    }
}

module.exports = new Cliente;