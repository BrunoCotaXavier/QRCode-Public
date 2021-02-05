function enviaFormApp(event){

    event.preventDefault();
    
        var nome_input = $('#input-nome').val();
        var site_input = $('#input-site').val();
        var google_input = $('#input-google').val();
        var apple_input = $('#input-apple').val();
        var email_input = $('#input-email').val();
    
    
        if(nome_input.length <=0){
            abreModal(modalAvisoForm('É necessário inserir um nome'));
            return;
        }

        if(email_input.length <=0){
            abreModal(modalAvisoForm('É necessário inserir um email válido'));  
            return; 
        } 

        if(!email_input.includes('@')){
            abreModal(modalAvisoForm('É necessário inserir um email válido'))
            return;
        } else 

        if(site_input.length <= 0 && google_input.length <= 0 && apple_input.length <=0){
            abreModal(modalAvisoForm('É necessário preencher ao menos uma das opções'));
            return;
        } 
        
        iniciaSpinner();
        verificaEmail(email_input)
            .then(function (resposta){
                if(resposta === true){
                    fechaSpinner();
                    console.log('email existente');
                    abreModal(modalEmailJaCadastrado);
                } else{
                    console.log('email liberado');
                    $.post('/', {
                        nome: nome_input, site: site_input, google: google_input, apple: apple_input, email: email_input
                        }, function(msg){
                            console.log(msg);
                            fechaSpinner();
                            abreModal(modalQRGeradoSucesso);
                            $('#input-nome').val('');
                            $('#input-site').val('');
                            $('#input-google').val('');
                            $('#input-apple').val('');
                            $('#input-email').val('');
                            
                        });
                }
            })            
    }

function enviaFormWhatsApp(event){

    event.preventDefault();

    var nome_input = $('#input-nome').val();
    var email_input = $('#input-email').val();
    var mensagem_input = $('#input-mensagem').val();
    var telefone_input = $('#input-tel').val();

    if(nome_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um nome'));
        return;
    } 

    if(email_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));   
        return;
    } 

    if(!email_input.includes('@')){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));
        return;
    } 

    if(telefone_input.length <= 6){
        abreModal(modalAvisoForm('É necessário inserir um telefone válido'));
        return;
    }

    iniciaSpinner();
    verificaEmail(email_input)
        .then(function (resposta) {
            if(resposta === true){
                fechaSpinner();
                console.log('email existente');
                abreModal(modalEmailJaCadastrado);
            } else {
                console.log('email liberado');
                $.post('/qrwhats', {
                    nome: nome_input, email: email_input, telefone: telefone_input, mensagem: mensagem_input
                    }, function(msg){
                        console.log(msg);
                        fechaSpinner();
                        abreModal(modalQRGeradoSucesso);
                        $('#input-nome').val('');
                        $('#input-email').val('');
                        $('#input-mensagem').val('');
                        $('#input-tel').val('');
                    });
                }
        })  
}

function enviaFormFacebook(event){

    event.preventDefault();

    var nome_input = $('#input-nome').val();
    var email_input = $('#input-email').val();
    var facebook_input = $('#input-facebook').val();

    if(nome_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um nome'));
        return;
    } 

    if(email_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));   
        return;
    }
    if(!email_input.includes('@')){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));
        return;
    } 

    if(facebook_input.length <= 6){
        abreModal(modalAvisoForm('É necessário inserir um perfil válido'));
        return;
    } 

    iniciaSpinner();
    verificaEmail(email_input)
        .then(function (resposta) {
            if(resposta === true){
                fechaSpinner();
                console.log('email existente');
                abreModal(modalEmailJaCadastrado);
            } else {
                console.log('email liberado');
                $.post('/qrfacebook', {
                    nome: nome_input, email: email_input, facebook: facebook_input
                    }, function(msg){
                        console.log(msg);
                        fechaSpinner();
                        abreModal(modalQRGeradoSucesso);
                        $('#input-nome').val('');
                        $('#input-email').val('');
                        $('#input-facebook').val('');
                    });
                }
        })
}

function enviaFormInstagram(event){

    event.preventDefault();

    var nome_input = $('#input-nome').val();
    var email_input = $('#input-email').val();
    var instagram_input = $('#input-instagram').val();

    if(nome_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um nome'));
        return
    } 

    if(email_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));   
        return;
    } 

    if(!email_input.includes('@')){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));
        return;
    } 

    if(instagram_input.length <= 6){
        abreModal(modalAvisoForm('É necessário inserir um perfil válido'));
        return;
    } 
    
    iniciaSpinner();

    verificaEmail(email_input)
        .then(function (resposta) {
            if(resposta === true){
                fechaSpinner();
                console.log('email existente');
                abreModal(modalEmailJaCadastrado);
            } else {
                console.log('email liberado');
                $.post('/qrinstagram', {
                    nome: nome_input, email: email_input, instagram: instagram_input
                    }, function(msg){
                        console.log(msg);
                        fechaSpinner();
                        abreModal(modalQRGeradoSucesso);
                        $('#input-nome').val('');
                        $('#input-email').val('');
                        $('#input-instagram').val('');
                    });
                }
        })
}

function enviaFormLinkedin(event){

    event.preventDefault();

    var nome_input = $('#input-nome').val();
    var email_input = $('#input-email').val();
    var linkedin_input = $('#input-linkedin').val();

    if(nome_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um nome'));
        return;
    } 

    if(email_input.length <=0){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));   
        return;
    } 

    if(!email_input.includes('@')){
        abreModal(modalAvisoForm('É necessário inserir um email válido'));
        return;
    } 

    if(linkedin_input.length <= 6){
        abreModal(modalAvisoForm('É necessário inserir um perfil válido'));
        return;
    } 

    iniciaSpinner();
    
    verificaEmail(email_input)
        .then(function (resposta) {
            if(resposta === true){
                fechaSpinner();
                console.log('email existente');
                abreModal(modalEmailJaCadastrado);
            } else {
                console.log('email liberado');
                $.post('/qrlinkedin', {
                    nome: nome_input, email: email_input, linkedin: linkedin_input
                    }, function(msg){
                        console.log(msg);
                        fechaSpinner();
                        abreModal(modalQRGeradoSucesso);
                        $('#input-nome').val('');
                        $('#input-email').val('');
                        $('#input-linkedin').val('');
                    });
                }
        }) 
}
