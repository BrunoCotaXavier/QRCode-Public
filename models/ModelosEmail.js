class ModelosEmail{

    emailContato(dados){
        return{

            from: 'Contato do Site - Gera QR Code <brunosribeiro@live.com>',
            to: 'contato@geraqrcode.com.br',
            subject: 'Solicitação de Contato',
            html: `
                <p>Email:${dados.email}</p>
                <p>Mensagem: ${dados.mensagem}</p>
            `

        }
    };

    emailEnvioQRCodeDB(dados){
        return {

            from: 'Gera QRCODE <contato@geraqrcode.com.br>',
            to: dados.email,
            subject: 'Seu QRCODE - Gera QR Code',
            html: ` <div style="background: #ecedf0; color: black; padding: 5px; text-align: center;">
                        <p>Olá tudo bem ?</p>
                        <p>Como solicitado segue abaixo as URL's de acessso aos QRCODE's</p>


                        <p>${dados.mensagem}</p>

                        <p style="color: black">Caso precise de ajuda, tenha algum problema ou dúvida responda esse email para entrar em contato conosco.</p>
                        <p style="color: black">Qualquer dúvida estamos a disposição 😉</p>
                        <b><p style="color: black">Att,</p></b> 
                        <b><p style="color: black">Bruno Ribeiro</p></b>
                        <b><p style="color: black">Equipe Gera QRCODE</p></b>
                    </div>
            `
        }
    }

    emailQRGerado(dados) {
        return {

            from: 'Gera QR Code <contato@geraqrcode.com.br>',
            to: dados.email,
            subject: 'Parabéns ! Seu QRCODE foi gerado com sucesso!!! - Gera QR Code',
            html: `<p>Olá, tudo bem ?</p> 
            <p>Sou o Bruno Ribeiro e irei cuidar de todos os detalhes para que você tenha a melhor experiência 
            na Gera QRCODE.</p>
            <p>Seu QRCODE já foi gerado com sucesso e está disponível para download no 
            formato <b>.PNG</b> e <b>.SVG</b>.</p> 
            <p>Mas antes de tudo preciso de um favor, que clique no link abaixo para confirmar o email e em 
            seguida iremos lhe enviar um novo email com as URL's de acesso ao QRCODE.</p>
            <a href="https://geraqrcode.com.br/confirma-email/${dados.id}"><p><b>https://geraqrcode.com.br/confirma-email/${dados.id}</b></p></a>
            <p>Após confirmar o email, caso não receba o email com as URL's por favor entre em contato conosco 
            pelo email: <a href="mailto:contato@geraqrcode.com.br"><b>contato@geraqrcode.com.br</b></a></p> 
            <p>Estamos aguardando 😉</p>
            <p>Att,</p> 
            <p>Bruno Ribeiro</p>
            <p>Equipe Gera QRCODE</p>`
        }  
    };

    emailEnvioQRCode(dados){
        return {

            from: 'Gera QR Code <contato@geraqrcode.com.br>',
            to: dados.email,
            subject: 'Download QRCODE - Seu QRCODE está pronto!!! - Gera QR Code',
            html: `<p>Seu email já está confirmado e agora você já pode aproveitar o seu novo <b>QRCODE !</b></p>
                <p>Nos link's abaixo você tem acesso ao QRCODE em <b>.PNG</b> e em <b>.SVG</b> em alta resolução:</
                p> 
                <a href="${dados.urlPng}"><p><b>QRCODE.PNG - ${dados.urlPng}</b></p></a>
                <a href="${dados.urlSvg}"><p><b>QRCODE.SVG - ${dados.urlSvg}</b></p></a>
                <p>Segue algumas orientações:</p>
                <p>O QRCODE é dinâmico, ele identifica o dispositivo que está sendo utilizado e direciona o cliente 
                para o site ou App de acordo com o dispositivo, seja Android ou IOS.</p>
                <p>Caso precise editar algum link ou adicionar algum outro link é só entrar em contato com nossa 
                equipe pelo email: <a href="mailto:contato@geraqrcode.com.br"><b>contato@geraqrcode.com.br</b></a>.
                </p> 
                <p>Para o QRCODE funcionar seu cliente precisa estar conectado na internet.</p>
                <p>Caso deseje criar um novo QRCODE com o mesmo email de cadastro, ou encontre algum erro com o 
                QRCODE por favor entre em contato conosco pelo email também.</p>
                <p>Por gentileza teste seu QR Code antes de realizar qualquer tipo de divulgação do mesmo.</p>
                <p>Nosso horário de atendimento é de segunda a sexta feira exceto feriados nacionais das 09:00h às 
                18:00h.</p>
                <p>Qualquer dúvida estamos a disposição. Abraços !</p>
                <p>Att,</p> 
                <p>Bruno Ribeiro</p>
                <p>Equipe Gera QRCODE</p>`
        }  
    }

    emailReenvioQRCode(dados){
        return{

            from: 'Gera QR Code <contato@geraqrcode.com.br>',
            to: dados.email,
            subject: 'Download QR Code!!! - Gera QR Code',
            html: `<section style="width: 50%; display: flex; flex-direction: column; margin: auto;">
            <div class="email" style="text-align: center; border-radius: 
        5px;">
                <div id="titulo_email" style="background-color: #FF551B; color:#000; padding: 5px; border-radius: 5px; 
        font-weight: 500;">
                    <p>Download QRCODE!</p>
                </div>
                <div id="corpo_email" style="padding: 15px; text-align: center; color:#000">
                    <p>Nos link's abaixo você tem acesso ao QRCODE em <b>.PNG</b> e em <b>.SVG</b> em alta 
        resolução:</p> 
                    <p><b>QRCODE.PNG - teste.com.br</b></p>
                    <p><b>QRCODE.SVG - teste.com.br</b></p>
                    <p>Caso precise de ajuda ou tenha alguma dúvida entre em contato conosco por email ou clicando 
        no botão abaixo:</p>
                    <a href="mailto:contato@geraqrcode.com.br"><button style="padding: 15px;
                    background: #a983cc; border:none; border-radius: 5px">QUERO ENTRAR EM CONTATO</button></a>
                    <p>Att,</p> 
                    <p>Bruno Ribeiro</p>
                    <p>Equipe Gera QRCODE</p>
                </div>
                <div id="rodape_email" style="text-align: center;
                padding: 10px;
                background: #d2d2d2;
                color:#000;
                border-radius: 5px;">
                    Gera QRCODE - 📧 Atendimento ao cliente: <a href="mailto:contato@geraqrcode.com.br" 
                class="email_link" style="color:#000">contato@geraqrcode.com.br</a>
                </div>
            </div>
        </section>`                       

        }
    }

    /*emailTeste(){

        return{

            from: 'Gera QRCODE <contato@geraqrcode.com.br>',
            to: 'brunoribeiro420@gmail.com',
            subject: 'TESTE',
            html: `<section style="width: 50%; display: flex; flex-direction: column; margin: auto;">
            <div class="email" style="text-align: center; border-radius: 
        5px;">
                <div id="titulo_email" style="background-color: #8d56bf; color:#000; padding: 5px; border-radius: 5px; 
        font-weight: 500;">
                    <p>Download QRCODE!</p>
                </div>
                <div id="corpo_email" style="padding: 15px; text-align: center; color:#000">
                    <p>Nos link's abaixo você tem acesso ao QRCODE em <b>.PNG</b> e em <b>.SVG</b> em alta 
        resolução:</p> 
                    <p><b>QRCODE.PNG - teste.com.br</b></p>
                    <p><b>QRCODE.SVG - teste.com.br</b></p>
                    <p>Caso precise de ajuda ou tenha alguma dúvida entre em contato conosco por email ou clicando 
        no botão abaixo:</p>
                    <a href="mailto:contato@geraqrcode.com.br"><button style="padding: 15px;
                    background: #a983cc; border:none; border-radius: 5px">QUERO ENTRAR EM CONTATO</button></a>
                    <p>Att,</p> 
                    <p>Bruno Ribeiro</p>
                    <p>Equipe Gera QRCODE</p>
                </div>
                <div id="rodape_email" style="text-align: center;
                padding: 10px;
                background: #d2d2d2;
                color:#000;
                border-radius: 5px;">
                    Gera QRCODE - 📧 Atendimento ao cliente: <a href="mailto:contato@geraqrcode.com.br" 
                class="email_link" style="color:#000">contato@geraqrcode.com.br</a>
                </div>
            </div>
        </section>`                       
        }
    }*/

}

module.exports = new ModelosEmail;