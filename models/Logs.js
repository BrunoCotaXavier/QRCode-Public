class Logs{

    registraVisitas(dados){
        this.contaVisitas(dados)
          .then(newDados => {
            this.addSomaVisitas(newDados)
              .then(resp => console.log(resp))
          })
    }

    addSomaVisitas(dados){

        return new Promise((resolve,reject) => {
          const sql = `UPDATE cliente_id${dados.id_cliente} SET ${dados.origem}=${dados.origem} + 1 WHERE id = ${dados.id_qrcode}`;
    
          conexao.query(sql, (erro, resultados) =>{
    
            if(erro){
              console.log(erro);
              console.log('erro ao somar a visita do qrcode no DB');
              reject();
            } else {
              console.log('visita do qrcode somada com sucesso no DB');
              resolve('visita adicionada e somanda com sucesso no DB');
            }
          })
        })
    }

    contaVisitas(dados){

        return new Promise((resolve, reject) => {
    
          var data = new Date();
    
          const sql = `INSERT INTO cliente_id${dados.idCliente} SET ?`;
    
          var pacote = {};
    
          if(dados.origem == 'visitas_desktop'){
            pacote = {id_cliente: dados.idCliente, id_qrcode:dados.ID, visitas_desktop: '1', log: 'visita', data_log: data, 
            descricao_log: 'visita adicionada com sucesso', dispositivo_log: 'desktop'}
          }
    
          if(dados.origem == 'visitas_android'){
            pacote = {id_cliente: dados.idCliente, id_qrcode:dados.ID, visitas_android: '1', log: 'visita', data_log: data, descricao_log: 'visita adicionada com sucesso', dispositivo_log: 'android'}
          }
    
          if(dados.origem == 'visitas_apple'){
            pacote = {id_cliente: dados.idCliente, id_qrcode:dados.ID, visitas_apple: '1', log: 'visita', data_log: data, descricao_log: 'visita adicionada com sucesso', dispositivo_log: 'apple'}
          }
          
          conexao.query(sql, pacote, (erro, resultados) => {
            if(erro){
              console.log(erro);
              console.log('não foi possível adicionar a visita ao DB');
              reject(erro);
              //conexao.end();
            } else{
              resolve({id_cliente: dados.idCliente, id_qrcode: dados.ID, origem: dados.origem});
              console.log('visita adicionada com sucesso ao DB');
            }
          })
        })
    }
}

module.export = new Logs;