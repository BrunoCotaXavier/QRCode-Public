class Redireciona{

    direcionaCliente(idCliente, id, res){

        this.buscaDadosDBQRCode(idCliente, id)
          .then(dados =>{
            console.log(dados);
            console.log(id);
            console.log(idCliente);
            res.render('qrcode', {dados, id, idCliente})
          })
      }
    
      buscaDadosDBQRCode(idCliente, ID){
        return new Promise((resolve, reject) => {
          
          const sql = `SELECT ativo, 
                      site, 
                      google_play, 
                      apple_store, 
                      whatsapp, 
                      instagram, 
                      facebook, 
                      linkedin, 
                      tipo_qrcode 
                      FROM cliente_id${idCliente}  
                      WHERE id = "${ID}"`;
                      
          conexao.query(sql, (erro, resultados) => {
            if(erro){
              console.log(erro)
              //conexao.end();
            } else {
              const dados = resultados[0];
              resolve(dados);
            }
          })
        })
      }
}

module.exports = new Redireciona;