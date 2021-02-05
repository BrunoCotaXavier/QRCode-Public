const conexao = require('../infra/conexao');

class TabelasClientes{

    criaTabelaCliente(id){

        return new Promise((resolve, reject) =>{

            const sql = `CREATE TABLE cliente_id${id} (
                id int(11) NOT NULL AUTO_INCREMENT,
                id_cliente int(11) NOT NULL,
                id_qrcode int(11),
                plano varchar(10),
                ativo varchar(10),
                email varchar(45),
                tipo_qrcode varchar(20),
                nome_qrcode varchar(50),
                site varchar(100),
                google_play varchar(100),
                apple_store varchar(100),
                whatsapp varchar (180),
                telefone_whatsapp varchar(20),
                instagram varchar(100),
                facebook varchar(100),
                linkedin varchar(100),
                visitas_desktop int(11),
                visitas_apple int(11),
                visitas_android int(11),
                qrcode varchar(100),
                eqrcode varchar(10),
                log varchar(30),
                data_log datetime(6),
                descricao_log varchar(240),
                dispositivo_log varchar(20),
                PRIMARY KEY (id),
                CONSTRAINT fk_cliente${id}_qrcode
                FOREIGN KEY (id_cliente)
                REFERENCES clientes (id_cliente)
            )`

            conexao.query(sql, (erro, resultados) => {
                if(erro){
                    console.log(erro);
                    console.log(`erro ao criar a tabela do cliente ${id} no DB`);
                    reject(erro);
                } else{
                    console.log(`tabela do cliente ${id} criada com sucesso no DB`)
                    resolve(id);
                }
            })
            
        })

    }
}

module.exports = new TabelasClientes;