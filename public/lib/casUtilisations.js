

$(document).ready(function() {


    document.addEventListener('click', function(e) {

        if (e.target.matches('#btnAjouterCours')){
                document.location.assign("/api/sga/casUtilisations/loadCasAjouterCours");
        };

        if (e.target.matches('#btnRecupererCours')){
                document.location.assign("/api/sga/casUtilisations/loadCasRecupererCours");
        };

        if (e.target.matches('#btnRetirerCours')){
                document.location.assign("/api/sga/casUtilisations/loadCasRetirerCours");
        };
        if (e.target.matches('#btnAjouterQuestion')){
                document.location.assign("/api/sga/casUtilisations/loadCasAjouterQuestion");
        };

        if (e.target.matches('#btnRecupererQuestion')){
                document.location.assign("/api/sga/casUtilisations/loadCasRecupererQuestion");
        };
        if (e.target.matches('#btnModifierQuestion')){
                document.location.assign("/api/sga/casUtilisations/loadCasModifierQuestion");
        };
        if (e.target.matches('#btnSupprimerQuestion')){
                document.location.assign("/api/sga/casUtilisations/loadCasSupprimerQuestion");
        };
        if (e.target.matches('#btnAjouterQuestionnaire')){
                document.location.assign("/api/sga/casUtilisations/loadCasAjouterQuestionnaire");
        };
        if (e.target.matches('#btnRecupererQuestionnaire')){
                document.location.assign("/api/sga/casUtilisations/loadCasRecupererQuestionnaire");
        };
        if (e.target.matches('#btnModifierQuestionnaire')){
                document.location.assign("/api/sga/casUtilisations/loadCasModifierQuestionnaire");
        };
        if (e.target.matches('#btnSupprimerQuestionnaire')){
                document.location.assign("/api/sga/casUtilisations/loadCasSupprimerQuestionnaire");
        };
        if (e.target.matches('#btnAjouterDevoir')){
                document.location.assign("/api/sga/casUtilisations/loadCasAjouterDevoir");
        };
        

    });

});