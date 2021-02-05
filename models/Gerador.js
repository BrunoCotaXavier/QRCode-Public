const conexao = require('../infra/conexao');
const customExpress = require('../config/customExpress');
const app = customExpress();
const qr = require('qr-image');
const {Storage} = require('@google-cloud/storage');
const path = require('path');
const Email = require('./Email');
const ModelosEmail = require('./ModelosEmail');
const qrcode = require('qrcode');


class Gerador{


  finalizaGeracaoQR(dadosStorage, email, idCliente, res){
    return new Promise((resolve, reject) =>{
      res.send(dadosStorage.msg);
      Email.enviaEmail({
        corpoEmail: ModelosEmail.emailQRGerado({
          email: email,
          id: idCliente
        }), res: res
      })
    })
  }


  corrigeDadosInstagram(dados){
    return new Promise((resolve,reject) => {

      var instagram = dados.instagram;
      var instagramReplace = 'instagram.com/';
      var instagramOk = instagram.substr(instagram.indexOf(instagramReplace) + instagramReplace.length);

      var newInstagram = `instagram.com/${instagramOk}`;

      const dadosOk = {nome: dados.nome, telefone_whatsapp: '', email: dados.email, tipo_qrcode: 'instagram', site: '', google: '', apple: '', instagram: newInstagram, facebook: '', linkedin: '', whatsapp: ''};

      resolve(dadosOk);
      reject();
    })
  }

  corrigeDadosFacebook(dados){
    return new Promise((resolve, reject) => {

      var facebook = dados.facebook;
      var facebookReplace = 'facebook.com/';
      var facebookOk = facebook.substr(facebook.indexOf(facebookReplace) + facebookReplace.length);

      var newFacebook = `facebook.com/${facebookOk}`;
      
      const dadosOk = {nome: dados.nome, telefone_whatsapp: '', email: dados.email, tipo_qrcode: 'facebook', site: '', 
      google: '', apple: '', instagram: '', facebook: newFacebook, linkedin: '', whatsapp: ''};
      
      resolve(dadosOk);
      reject();

      })
  }

  corrigeDadosLinkedin(dados){

    return new Promise((resolve, reject) => {
      var linkedin = dados.linkedin;
      var linkedinReplace = '/in/';
      var linkedinOk = linkedin.substr(linkedin.indexOf(linkedinReplace) + linkedinReplace.length);

      var newLinkedin = `linkedin.com/in/${linkedinOk}`;
      
      const dadosOk = {nome: dados.nome, telefone_whatsapp: '', email: dados.email, tipo_qrcode: 'linkedin', site: '', 
      google: '', apple: '', instagram: '', facebook: '', linkedin: newLinkedin, whatsapp: ''};
      
      resolve(dadosOk);
      reject();
      })
  }


  corrigeDadosWhatsApp(dados){
     return new Promise((resolve, reject) => {
        
      var tel = dados.telefone;
      var tel1 = tel.replace('(','');
      var tel2 = tel1.replace('-','');
      var newTel = tel2.replace(')','');

      var whatsapp = `api.whatsapp.com/send?phone=55${newTel}&text=${dados.mensagem}`;


      const dadosOk = {nome: dados.nome, telefone_whatsapp: newTel, email: dados.email, tipo_qrcode: 'whatsapp', site: '', google: '', apple: '', instagram: '', facebook: '', linkedin: '', whatsapp: whatsapp};

      resolve(dadosOk);
      reject();


     })
  }

  corrigeDadosApp(dados){

    return new Promise((resolve,reject) => {

      var sitePrimary = dados.site;
      var site1 = sitePrimary.replace('https://','');
      var siteokk = site1.replace('http://','');
  
      var googlePrimary = dados.google;
      var googleReplace = 'id=';
      var googleOk = googlePrimary.substr(googlePrimary.indexOf(googleReplace) + googleReplace.length);

      var applePrimary = dados.apple;
      var appleReplace = 'id';
      var appleOk = applePrimary.substr(applePrimary.indexOf(appleReplace));



      if(googleOk == ''){
        googleOk = siteokk
      }
      if(appleOk == ''){
        appleOk = siteokk
      }

      const dadosOk = {nome: dados.nome, site: siteokk, google: googleOk, apple: appleOk, email: dados.email, tipo_qrcode: 'app', whatsapp: '', telefone_whatsapp: '', instagram: '', facebook: '', linkedin: ''}

      resolve(dadosOk);
      reject();
    })
  }

  geraqr(dados){

    return new Promise((resolve,reject) => {
      
      const newqrcodePng = qr.imageSync(`http://geraqrcode.com.br/qrcode/${dados.id}/${dados.qrcodeId}`, {ec_level: 'H', margin: 1,type: 'png'}
      );

      const newqrcodeSgv = qr.imageSync(`http://geraqrcode.com.br/qrcode/${dados.id}/${dados.qrcodeId}`, {ec_level: 'H', margin: 1,type: 'svg'}
      );

      resolve({png: newqrcodePng, svg: newqrcodeSgv, id: dados.id, qrcodeId: dados.qrcodeId, url: dados.url});
      reject('naodeu');
    })

  }

  salvaQrStorage(dados){

    return new Promise((resolve, reject) => {
        const storage = new Storage();
        const myBucket = storage.bucket('qrcode-img');
            
        const filePng = myBucket.file(`qrcodeid${dados.id}-${dados.qrcodeId}.png`);
        const png = dados.png;

        const fileSvg = myBucket.file(`qrcodeid${dados.id}-${dados.qrcodeId}.svg`);
        const svg = dados.svg;


            
        filePng.save(png).then(function() {
          console.log('pgn adicionado com sucesso no bucket')
        }).catch(erro => console.log('erro'));

        fileSvg.save(svg).then(function() {
          console.log('svg adicionado com sucesso no bucket');
        }).catch(erro => console.log('erro'));

        resolve({msg: 'qrcode adicionado no bucket com sucesso', id:dados.id, qrcodeId: dados.qrcodeId});
        reject('deu erro ao adicionar os itens no bucket');
    }) 
  }

  gravaQrCodeDB(dados, id){
    return new Promise((resolve,reject) => {

      const sql = `INSERT INTO cliente_id${id} SET ?`;

      const data = new Date();
  
      conexao.query(sql,{id_cliente: id, tipo_qrcode: dados.tipo_qrcode, nome_qrcode: dados.nome, site: dados.site, google_play: dados.google, apple_store: dados.apple, whatsapp: dados.whatsapp, telefone_whatsapp: dados.telefone_whatsapp, instagram: dados.instagram, facebook: dados.facebook, linkedin: dados.linkedin, visitas_desktop: '0', visitas_android: '0', visitas_apple: '0', log: 'cadastro qrcode', eqrcode: 'SIM', data_log: data, descricao_log: 'qrcode cadastrado com sucesso', }, (erro, resultados) => {
        if(erro){
          console.log(erro)
          reject(erro);
        } else{
          console.log('cadastro qr code adicionado ao db');

          const qrcodeId = resultados.insertId;

          this.gravaUrlQRCodeDB(id, qrcodeId)
            .then(urlStorage => {
              resolve(urlStorage)
            }).catch(erro => console.log(erro))
        }
      })
    })
  }

  gravaUrlQRCodeDB(id, qrcodeId){
    return new Promise((resolve, reject) =>{

      const sqlQRCode = `UPDATE cliente_id${id} SET qrcode='https://storage.googleapis.com/qrcode-img/qrcodeid${id}-${qrcodeId}.png', id_qrcode=${qrcodeId} WHERE id=${qrcodeId}`;

      conexao.query(sqlQRCode, (erros, resultados) => {
        if(erros){
          console.log(erros);
          reject(erros);
        } else{
          console.log('qrcode atualizado no DB');
          resolve({id: id, qrcodeId: `${qrcodeId}`, url: `https://storage.googleapis.com/qrcode-img/qrcode${id}-${qrcodeId}.png`});
        }
      })
    })
  }

}

module.exports = new Gerador;