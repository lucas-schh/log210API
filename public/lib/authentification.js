


$(document).ready(function() {

    document.addEventListener('click', function(e) {

        if (e.target.matches('#btnAuthentification')){
            let emailInput = $('#inputEmailAuthentification').val()
            let passwordInput = $('#inputPasswordAuthentification').val()
            if(emailInput != "" && passwordInput != ""){
                document.location.assign("/api/sga/enseignant/authEnseignant/" + emailInput + "/" + passwordInput);
            }
            else{
                document.getElementById("messageErreur").innerHTML = "Veuillez remplir les 2 champs correctement"
            }
        };
    });


    $('.entry').on('click', function () {
        var entry = this;
        var post_id = $(this).find('h2').attr('id');
        $.ajax({
            type: 'GET',
            url: '/delete' + '/' + post_id,
            context: entry,
            success: function (result) {
                if (result.status === 1) {
                    $(this).remove();
                    console.log(result);
                }
            }
        });
    });
});