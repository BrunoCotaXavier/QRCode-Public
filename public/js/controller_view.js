function imgMobile(){

    var html = `<img src="/upload/back2_mobile.png" class="img_index">
                <img src="/upload/back1_mobile.png" class="img_index">`;

            $('.img_index').remove();
            $('#div_img_index').append(html);

            var texto_index = $('.texto_index');
            texto_index.css(`background-image`,`url('/upload/teste.png')`);
            texto_index.css(`margin-top`,`-2px`);
            texto_index.css(`padding`,`22px`);
            texto_index.css(`background-repeat`, `round`);
            texto_index.css(`width`,`100%`);
            texto_index.html('<h1>QR Code para tudo o que você precisar</h1>');
}

function menuMobile(){

    var html = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id="menu_superior_mobile">
            <a class="navbar-brand" href="/"><img src="/upload/logo_site.png" class="logo_mobile"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/">INÍCIO <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/geraqrcode">GERADOR QRCODE</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onclick="abreModal(modalPossuiQRCODE)">JÁ POSSUO QRCODE</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onclick="abreModal(modalContato)">CONTATO</a>
                </li>
              </ul>
            </div>
        </nav>
    `;

    $('.menu_superior').remove();
    $('#header').append(html);

}

function formMobileApp(){

    var html = `
    <section id="gerador_qrcode">
    <div id="titulo"></div>
    <p class="titulo_qrcode">SITE/APP</p></div>
    <section id="qrcode">
        <div id="qrcode_img">
          <div class="div_qrcode_imagem">
            <img class="qrcode_imagem" src="/upload/qrcode24.png"> 
            
          </div>
        </div> 
        
     <form id="formQRCode">
      <div class="div_form_input">
        <label class="label_qrcode" for="input-nome">Nome da Empresa</label>
        <div class="input_input">
          <i class="fas fas fa-building icon_input"></i>
          <input type="text" placeholder="Minha Empresa" id="input-nome" name="nome" class="input_qrcode"  
          required="required">
        </div>
      </div>
    
      <div class="div_form_input">
        <label class="label_qrcode" for="input-site">Seu Site</label>
        <div class="input_input">
          <i class="fas fa-globe icon_input"></i>
          <input type="text" placeholder="www.meusite.com.br" id="input-site" name="site" class="input_qrcode" 
          required="required">
        </div>
      </div>
    
      <div class="div_form_input">
        <label class="label_qrcode" for="input-google">ID Google Play</label>
        <div class="input_input">
          <i class="fab fa-google-play icon_input"></i>
          <input type="text" placeholder="br.com.seusite" id="input-google" name="google" class="input_qrcode">
        </div>
      </div>
    
      <div class="div_form_input">
        <label class="label_qrcode" for="input-apple">ID App Store</label>
        <div class="input_input">
          <i class="fab fa-apple icon_input"></i>
          <input type="text" placeholder="ID1458754616" id="input-apple" name="apple" class="input_qrcode">
        </div>
      </div>
    
      <div class="div_form_input">
        <label class="label_qrcode" for="input-email">Meu Email</label>
        <div class="input_input">
          <i class="fas fa-envelope icon_input"></i>
          <input type="email" placeholder="email@meuemail.com.br" id="input-email" name="email" 
            class="input_qrcode" required="required">
        </div>
      </div>
      <button type="submit" class="btn_gerar-qrcode" onclick="enviaFormApp(event)">Gerar QRCODE</button>
     </form> 
     </div>
  </section>
  </section>
</section>
    `;

    $('#gerador_qrcode').remove();
    $('#main').append(html);
}




