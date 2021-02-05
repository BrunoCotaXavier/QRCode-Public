function abreModal(html){

    var modal = $('#modal');
    $('.modal_qr').remove();
    modal.append(html);
    modal.css({display: 'block'});

    modal.on( "click", function(event) {
      
        if(event.target == this) fechaModal();
    });
}

function fechaModal(){
    $('#modal').css({display:"none"});
    $('.modal_qr').remove();
}

function modalPossuiQRCODE(){
    return `
        <div class="modal_qr">
         <h1>JÁ POSSUI QRCODE CADASTRADO ?</h1>
        <p>Insira seu email abaixo e clique em <b>ENVIAR EMAIL</b> para receber o seu QRCODE novamente.</p>
        <div class="modal_input_envia-email">
            <input placeholder="meuemail@meuemail.com.br" type="email" id="input_email_contato">
            <button id="btn_modal" class="btn_modal_envia-email" onclick="enviaEmailComQrCode()">ENVIAR EMAIL 📧</button>
        </div>
        <p>Caso deseje criar um novo QRCODE ou editar as informações do QRCODE atual, envie um email para: <b><a href="mailto:contato@geraqrcode.com.br">contato@geraqrcode.com.br</a></b> e nossa equipe entrará em contato 
        com você.</p>
        <button id="btn_modal" class="btn_modal_qrgerado-sucesso" onclick="fechaModal()">ENTENDIDO ✔️</button>
        </div>
    `
}

function modalQRGeradoSucesso(){
    return `
    <div class="modal_qr">
        <h1>QRCODE GERADO COM SUCESSO🚀🚀</h1>
        <p>Enviamos um email  de confirmação para você.</p>
        <p>Verifique seu email, caso não encontre verifique a caixa de SPAM.</p>
        <p>Se em 30 minutos não chegar, envie um email para: <b><a href="mailto:contato@geraqrcode.com.br">contato@geraqrcode.com.br</a></b> e nossa equipe entrará em contato com você.</p>
        <button id="btn_modal" class="btn_modal_qrgerado-sucesso" onclick="fechaModal()">TUDO CERTO✔️</button>
    </div>
    `
}

function modalEmailJaCadastrado(){

    let email = $('#input-email').val();

    return `
    <div class="modal_qr">
        <h1>ESSE EMAIL JÁ ESTÁ CADASTRADO ⚠️</h1>
        <p>Utilize um novo email ou clique abaixo em <b>RECEBER QRCODE</b> para receber novamente o QRCODE que você já 
        gerou.</p>
        <div class="modal_input_envia-email">
            <input placeholder="meuemail@meuemail.com.br" type="email" value="${email}" id="input_email_contato">
            <button id="btn_modal" class="btn_modal_envia-email" onclick="enviaEmailComQrCode()">RECEBER QRCODE ✅</button>
        </div>
        <p>Caso deseje criar um novo QRCODE ou editar as informações do QRCODE atual, envie um email para: <b><a 
        href="mailto:contato@geraqrcode.com.br">contato@geraqrcode.com.br</a></b> e nossa equipe entrará em contato 
        com você.</p>
        <button id="btn_modal" class="btn_modal_qrgerado-sucesso" onclick="fechaModal()">ENTENDIDO ✔️</button>
    </div>
    `
}

function modalAvisoForm(mensagem){
    return `
    <div class="modal_qr modal_aviso-form">
        <h1>ATENÇÃO ⚠️</h1>
        <p>${mensagem}</p>
        <button id="btn_modal" class="btn_modal_qrgerado-sucesso btn_modal_aviso-form" onclick="fechaModal()">OK</
        button>
    </div>   
    `
}

function modalContato(){
    return `
    <div class="modal_qr modal_contato">
        <h1>ENTRE EM CONTATO CONOSCO</h1>
        <p>Insira seu email e sua mensagem nos campos abaixo, clique em <b>ENVIAR EMAIL</b> e em breve entraremos em 
        contato com você.</p>
        <div class="modal_input_envia-email input_contato">
            <input placeholder="meuemail@meuemail.com.br" type="email" id="input_email_contato">
            <textarea id="textareaContato" rows="7" cols="45" placeholder="Minha mensagem..."></textarea>  
        </div>
        <button id="btn_modal" class="btn_modal_contato" onclick="enviaEmailContato()">ENVIAR EMAIL 📧</button>
    </div>
    `
}

function modalEnvioContato(){
    return `
        <div class="modal_qr modal_aviso-form modal_envio_email">
            <h1>MENSAGEM ENVIADA COM SUCESSO ✔️</h1>
            <p>Sua mensagem foi enviada e em breve nossa equipe entrará em contato com você 😉</p>
            <button id="btn_modal" class="btn_modal_qrgerado-sucesso btn_modal_aviso-form" onclick="fechaModal()">OK</
            button>
        </div>
    `
}

function modalEnvioEmailJaCadastrado(){
    return `
        <div class="modal_qr modal_aviso-form modal_envio_email">
            <h1>SOLICITAÇÃO ENVIADA COM SUCESSO ✔️</h1>
            <p>Sua solicitação foi enviada e em breve você receberá um email com seu QRCODE 😉</p>
            <button id="btn_modal" class="btn_modal_qrgerado-sucesso btn_modal_aviso-form" onclick="fechaModal()">OK</
            button>
        </div>
    `
}
