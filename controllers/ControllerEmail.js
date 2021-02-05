const Email = require('../models/Email');

class ControllerEmail{

    verificaEmail(dados, res){
        Email.verificaEmail(dados, res)
    }
}

module.exports = new ControllerEmail;