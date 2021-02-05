process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const customExpress = require('./config/customExpress');
const Gerador = require('./models/Gerador');
const Email = require('./models/Email');
const gcloudStorage = require('@google-cloud/storage');
const Relatorio = require('./models/Relatorio');
const Redireciona = require('./models/Redireciona');
const app = customExpress();
app.set('view engine', 'ejs');
const conexao = require('./infra/conexao');
const tabelas = require('./infra/tabela');
const ControllerGerador = require('./controllers/ControllerGerador');
const ControllerEmail = require('./controllers/ControllerEmail');
const Logs = require('./models/Logs');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

conexao.connect(erro => {
  if(erro){
    console.log(erro)
  } else {
    console.log('DB Conectado')

    tabelas.init(conexao);

    const PORT = process.env.PORT || 8080;
    
    app.listen(PORT, () => {
      console.log('Servidor rodando na porta 3000')
    })
  }
})


//SITE - Rotas responsáveis por exibir as páginas no site

app.get('/', (req, res) => {
  res.render('home');
 });

 app.get('/geraqrcode', (req, res) => {
  res.render('geraqrApp');
});

app.get('/geraqrwhats',(req, res) =>{
  res.render('geraqrWhats');
});

app.get('/geraqrinstagram', (req, res) => {
  res.render('geraqrInstagram');
});

app.get('/geraqrfacebook', (req, res) => {
  res.render('geraqrFacebook');
});

app.get('/geraqrlinkedin', (req, res) => {
  res.render('geraqrLinkedin');
});




//APP - Rotas responsáveis pela leitura do QR Code

app.get('/desativado', (req, res) =>{
  res.render('desativado');
});

app.get('/qrcode/:idCliente/:id', (req, res) =>{
  const idCliente = parseInt(req.params.idCliente);
  const id = parseInt(req.params.id);
  Redireciona.direcionaCliente(idCliente, id, res);
});

app.post('/contavisitas', (req,res) => {
  Logs.registraVisitas(req.body);
});



//EMAIL = Rotas responsáveis por envio de emails

app.get('/email', (req, res) => {
  Email.enviaEmail(res);
});

app.post('/enviaemailcontato', (req, res) =>{
  Email.enviaEmailContato(req.body, res);
});

app.post('/reenviaqrcode', (req, res) => {
  Email.enviaEmailQrCodeDB(req.body, res);
});

app.post('/reenviaqrcodeemailconfirmado', (req, res) => {
  const id = parseInt(req.body.id);
  Email.reenviaEmailComQR(id, res);
});





//GERA QR CODE - Rotas responsáveis por gerar o QR Code

app.post('/', (req, res) => {
  ControllerGerador.geraQRCode(req.body, res);
 });

 app.post('/qrwhats', (req, res) => {
  ControllerGerador.geraQRWhatsApp(req.body, res);
});

app.post('/qrinstagram', (req, res) => {
  ControllerGerador.geraQRInstagram(req.body, res);
});

app.post('/qrfacebook', (req, res) => {
  ControllerGerador.geraQRFacebook(req.body, res);
});

app.post('/qrlinkedin', (req, res) => {
  ControllerGerador.geraQRLinkedin(req.body, res);
});




// CONFIRMA EMAIL - Rotas responsáveis por confirmar o email


app.get('/confirma-email/:id', (req, res) => {
  const id = parseInt(req.params.id);
  Email.confirmaEmail({id: id}, res);
});

app.post('/verificaemail', (req, res) =>{
  ControllerEmail.verificaEmail(req.body, res);
});




//RELATÓRIO

app.get('/relatorio', (req, res) =>{
  res.render('relatorioClientes');
});

app.get('/gerarelatorio', (req, res) =>{
  Relatorio.buscaDadosClientesGeralDB(res);
});


