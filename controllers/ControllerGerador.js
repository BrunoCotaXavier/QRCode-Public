const Cliente = require('../models/Cliente');
const Gerador = require('../models/Gerador');
const TabelasClientes = require('../models/TabelasClientes');

class ControllerGerador{

    async geraQRApp(dados, res){
        try {
            const newDados = await Gerador.corrigeDadosApp(dados);
            this.geraQRCode(newDados, res);
        } catch (error) {
            console.error('erro ao gerar qrcode app', error)
        }
    }

    async geraQRWhatsApp(dados, res){
        try {
            const newDados = await Gerador.corrigeDadosWhatsApp(dados);
            this.geraQRCode(newDados, res);
        } catch (error) {
            console.error('erro ao gerar qrcode whats', error)
        }
    }

    async geraQRInstagram(dados, res){
        try {
            const newDados = await Gerador.corrigeDadosInstagram(dados);
            this.geraQRCode(newDados, res);
        } catch (error) {
            console.error('erro ao gerar qrcode instagram', error)
        }
    }

    async geraQRFacebook(dados, res){
        try {
            const newDados = await Gerador.corrigeDadosFacebook(dados);
            this.geraQRCode(newDados, res);
        } catch (error) {
            console.error('erro ao gerar qrcode facebook', error)
        }
    }

    async geraQRLinkedin(dados, res){
        try {
            const newDados = await Gerador.corrigeDadosLinkedin(dados);
            this.geraQRCode(newDados, res);
        } catch (error) {
            console.error('erro ao gerar qrcode linkedin', error)
        }
    }

    async geraQRCode(dados, res){
        try {
            const id = await Cliente.criaClienteDB(dados);
            const idCliente = await TabelasClientes.criaTabelaCliente(id);
            const insereDadosTabelaCliente = await Cliente.insereDadosTabelaCliente(dados, idCliente);
            const dadosQr = await Gerador.gravaQrCodeDB(dados, idCliente);
            const QR = await Gerador.geraqr(dadosQr);
            const dadosStorage = await Gerador.salvaQrStorage(QR);
            const finaliza = await Gerador.finalizaGeracaoQR(dadosStorage, dados.email, idCliente, res);
        } catch (error) {
            console.error('erro ao gerar qrcode', error)
        }
    }
    
}

module.exports = new ControllerGerador;