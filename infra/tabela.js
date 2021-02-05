class Tabelas{

     init(conexao){
     this.conexao = conexao;
     this.criaTabela();

     }

     criaTabela(){

          const sql = `CREATE TABLE IF NOT EXISTS clientes 
               (id_cliente int NOT NULL AUTO_INCREMENT,
               cliente varchar(60) NOT NULL,
               email varchar(60) NOT NULL,
               plano varchar(10) NOT NULL,
               ativo varchar(10) NOT NULL,
               data_criacao datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
               email_confirmado varchar(10) DEFAULT NULL,
               PRIMARY KEY (id_cliente))`;

          this.conexao.query(sql, (erro, resultados) =>{
               if(erro){
                    console.log(erro)
               } else {
                    console.log('Tabela criada com sucesso')
               }
          })
     }

}

module.exports = new Tabelas;