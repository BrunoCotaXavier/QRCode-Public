var lista = [];
var ordemAtual = '';

function buscaDadosClientes(){

    return new Promise(function (resolve, reject){

        $.get('/gerarelatorio', function(res){

            console.log('deu certo');
            lista = res;
            resolve(res);
            reject();
        })
    })
}

function exibeDados(){

    buscaDadosClientes()
        .then(function(dados){
            geraHtml(lista);
        })
}


function geraHtml(dados){
                  
    $('tbody').html('');

    dados.forEach(item => {

        var options = { year: "numeric", month: "long", day: "numeric", hour:'numeric', minute: 'numeric', second: 'numeric' };
        var date = new Date(item.data_criacao);
        var newDate = date.toLocaleDateString("pt-br", { ...options, month: 'numeric'});

        var tr = $('<tr>');
        var cols = '';

        cols += `<td>${item.id_cliente}</td>`;
        cols += `<td>${item.cliente}</td>`;
        cols += `<td>${item.email}</td>`;
        cols += `<td>${newDate}</td>`;
        cols += `<td>${item.tipo_qrcode}</td>`;
        cols += `<td>${item.visitas_android}</td>`;
        cols += `<td>${item.visitas_apple}</td>`;
        cols += `<td>${item.total}</td>`;

        tr.append(cols);

        $('tbody').append(tr);

    });
}

function ordena(coluna){

    if(ordemAtual == coluna){
        lista.reverse();
    }else{
        if(coluna == 'visitas_android' || coluna == 'visitas_apple' || coluna == 'total' || coluna == 'id_cliente'){
            lista.sort(function(objA, objB){
                let a = objA[coluna];
                let b = objB[coluna];
        
                return b - a
            })
        } else {
            lista.sort(function(objA,objB) {
                let a = objA[coluna].toString().toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'');
                let b = objB[coluna].toString().toLowerCase().replace(/[àáâãäå]/,"a").replace(/[èéêë]/,"e").replace(/[ìíîï]/,"i").replace(/[òóôõö]/,"o").replace(/[ùúûü]/,"u").replace(/[ç]/,"c").replace(/[^a-z0-9]/gi,'');
                
                return a < b ? -1 : a > b ? 1 : 0;
              })		
        }
    }
    
    ordemAtual = coluna;
    geraHtml(lista);
}

exibeDados();