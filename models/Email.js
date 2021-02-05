const nodemailer = require('nodemailer');
const modelosEmail = require('./ModelosEmail');
const conexao = require('../infra/conexao');
const resolveInclude  = require('ejs');
const Gerador = require('./Gerador');
const Cliente = require('./Cliente');

const remetente = nodemailer.createTransport({

    host: '**************',  
    secureConnection: "true",
    port: '465',
    auth:{
        user: '*********************',
        pass: '**************'
    }    
})

const remetenteContato = nodemailer.createTransport({

    service: '*************',
    auth: {
        user: '*****************',
        pass: '***************'
    }
});




class Email{

    enviaEmailContato(dados,res){

        remetenteContato.sendMail(modelosEmail.emailContato(dados), function(erro) {
            if(erro){
                console.log(erro)
                res.send(false);
            } else{
                console.log('email de contato enviado com sucesso');
                res.send(true);
            }
        })
    }

    enviaEmailQrCode(dados, res){

        remetente.sendMail(modelosEmail.emailEnvioQRCodeDB(dados), function(erro){
            if(erro){
                console.log(erro);
                console.log('erro ao enviar email com qrcodes');
                res.send(false);
            } else {
                console.log('email com qrcodes enviado com sucesso');
                res.send(true);
            }
        })
    }

    enviaEmail(dados){

        return new Promise((resolve, reject) => {
     
            remetente.sendMail(dados.corpoEmail, function(error){
                if(error){
                    console.log(error)
                } else{
                    console.log('email enviado com sucesso')
                }
                resolve(dados.id);
                reject();
            })
        })
    }

    buscaQrDB(id){

        return new Promise((resolve, reject) => {

            const sql = `SELECT qrcode FROM cliente_id${id} WHERE eqrcode = 'SIM'`;

            conexao.query(sql,(erro, resultados) => {
                const qrcode = resultados[0];
                if(erro){
                    console.log(erro);
                    reject(erro);
                } else {
                    const qrcodePng = qrcode.qrcode;
                    const qrcodeSvg = qrcode.qrcode.replace('.png', '.svg');
                    resolve({qrcodePng: qrcodePng, qrcodeSvg: qrcodeSvg, id: id});
                }
            })

        })
    }

    verificaEmailConfirmadoDB(id){

        return new Promise((resolve, reject) => {

            const sql = `SELECT email, email_confirmado FROM clientes WHERE id_cliente=${id}`;

            conexao.query(sql, (erro, resultado) => {
                if(erro){
                    console.log(erro);
                    console.log('erro ao verificar se o email está confirmado');
                    reject(erro);
                } else {
                    console.log('verificação de email confirmado concluído com sucesso');
                    const emailConfirmado = resultado[0];
                    resolve(emailConfirmado);
                }
            })
        })
    }

    confirmaEmailDB(dados){

        return new Promise((resolve, reject) => {

            const sql = `UPDATE clientes SET email_confirmado = 'SIM' WHERE id_cliente=${dados}`;

            conexao.query(sql, (erro, resultados) => {
                if(erro){
                    console.log('erro ao confirmar o email no DB');
                    console.log(erro);
                    reject(erro);
                } else {
                    console.log('email confirmado no DB');
                    resolve(dados)
                }
            })
        })
    }

    confirmaEmail(dados, res){

        return new Promise((resolve, reject) => {

            this.verificaEmailConfirmadoDB(dados.id)
                .then(resultados => {
                    if(resultados.email_confirmado == 'NAO'){
                        this.buscaQrDB(dados.id)
                            .then(qrcode => {
                                this.enviaEmail({corpoEmail: 
                                    modelosEmail.emailEnvioQRCode(
                                    {email: resultados.email, 
                                    urlPng:qrcode.qrcodePng, 
                                    urlSvg: qrcode.qrcodeSvg}), 
                                    id: dados.id})
                                        .then(emailId =>{
                                            console.log('email confirmado e qrcode enviado');
                                            this.confirmaEmailDB(emailId)
                                                .then(deucerto => {
                                                    res.render('emailConfirmado');
                                                    console.log('email confirmado com sucesso');
                                                })
                                        })
                            })
                    } else{
                        res.render('emailJaConfirmado');
                    }
                })
        })
    }

    enviaEmailQrCodeDB(dados, res){

        Cliente.buscaIDCliente(dados.email, res)
          .then(id =>{
            Cliente.buscaQRCodeDB(id)
              .then(qrcodes => {
                this.montaEmailQrCodeDB(qrcodes)
                  .then(array => {
                    this.enviaEmailQrCode({email: dados.email, mensagem: array},res)
                  })
              })
          })
    }

    reenviaEmailComQR(id, res){

        this.buscaEmailComID(id, res)
          .then(dados => {
            this.enviaEmailQrCodeDB(dados, res)
          })
    }

    montaEmailQrCodeDB(qrcodes){

        console.log(qrcodes);
    
        return new Promise((resolve, reject) =>{
    
          var array = []
    
          qrcodes.forEach(qrcode => {
    
            var urlPng = qrcode.qrcode;
            var urlSvg = qrcode.qrcode.replace('.png','.svg');
    
            var qr = `<b><p style="text-transform:uppercase">${qrcode.nome_qrcode}</p></b><a href="${urlPng}"><p><b>QRCODE.PNG - ${urlPng}</b></p></a>
            <a href="${urlSvg}"><p><b>QRCODE.SVG - ${urlSvg}</b></p></a><p></p>`;
    
            array.push(qr);
      
          });
    
          resolve(array);
          reject();
    
        })
    }
    
      verificaEmail(dados, res){

        return new Promise((resolve, reject) => {
    
          const sql = `SELECT email FROM clientes WHERE email LIKE '%${dados.email}%'`;
    
          conexao.query(sql, (erro, resultados) => {
            if(erro){
              console.log(erro);
              console.log('erro ao pesquisar email no DB');
              reject('erro ao pesquisar email no DB');
            } else{
    
              if(resultados.length > 0){
                console.log('email já existe');
                resolve('email existente');
                res.send(true)
              } else{
                console.log('email liberado');
                resolve('email liberado');
                res.send(false);
              }
            }
          })
        })
    }

      buscaEmailComID(id, res){

        return new Promise((resolve, reject) => {
    
          const sql = `SELECT email FROM clientes WHERE id_cliente=${id}`;
    
          conexao.query(sql, (erro, resultados) => {
            if(erro){
              console.log(erro);
              console.log('erro ao buscar o email pelo id na tabela de clientes');
              res.send(false);
            } else {
              console.log('busca de email por id com sucesso');
              var dados = resultados[0];
              console.log(dados);
              resolve(dados);
            }
          })
        })
    }
      

}



module.exports = new Email;





