function verificaEmail(email){

    return new Promise(function (resolve, reject) {

        $.post('/verificaemail',{email: email}, function(res){
            console.log(res);
            if(res === true){
                resolve(true);
            } else{
                resolve(false);
            }
        })    
    })
}

function enviaEmailComQrCode(){

    let email = $('#input_email_contato').val();

    if(!email.includes('@')){

        abreModal(modalAvisoForm('É necessário inserir um email válido'));
    } else {

        iniciaSpinner();
        $.post('/reenviaqrcode', {email: email}, function(res){
            if(res === true){
                fechaSpinner();
                abreModal(modalEnvioEmailJaCadastrado);
            } else {
                if(res === 'emailFalse'){
                    fechaSpinner();
                    abreModal(modalAvisoForm('Cadastro não encontrado, tente novamente com outro email.'))
                } else {
                    fechaSpinner();
                    abreModal(modalAvisoForm('Ocorreu um erro ao gerar a solicitação, atualize o site e tente novamente.'));
                }
            }
        })
    }
}

function enviaEmailContato(){

    let email = $('#input_email_contato').val();

    if(!email.includes('@')){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));
    } else{

        iniciaSpinner();
        let mensagem = $('#textareaContato').val();
        $.post('/enviaemailcontato', {email: email, mensagem: mensagem}, function(res){
                if(res == true){
                    fechaSpinner();
                    console.log('solicitação de contato enviada com sucesso');
                    abreModal(modalEnvioContato);
                } else{
                    fechaSpinner();
                    console.log('erro ao enviar solicitação de contato');
                    abreModal(modalAvisoForm('Erro ao enviar solicitação de contato, atualize a página e tente novamente por gentileza'));
                }
        })
    }
}

function reenviaQrCodeEmailConfirmado(){

    iniciaSpinner();

    var url_atual = window.location.href;

    var urlReplace = 'email/';
    var id = url_atual.substr(url_atual.indexOf(urlReplace) + urlReplace.length);   

    $.post('/reenviaqrcodeemailconfirmado', {id: id}, function(res){
        if(res === true){
            abreModal(modalEnvioEmailJaCadastrado());
            fechaSpinner();
        } else {
            abreModal(modalAvisoForm('Ocorreu um erro. Atualize a página e tente novamente.'));
            fechaSpinner();
        }
    })
}
