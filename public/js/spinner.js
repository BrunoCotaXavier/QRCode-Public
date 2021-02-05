function iniciaSpinner(){

    var tagSpinner = $('#spinner');

    tagSpinner.css({display: 'block'});

    var spinner = `
        <div class="spinner-border spinner" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `;

    tagSpinner.append(spinner);

}

function fechaSpinner(){

    $('.spinner').remove();
    $('#spinner').css({display: 'none'});
}