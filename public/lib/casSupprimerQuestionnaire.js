$(document).ready(function() {
    setPage()
    function setPage(){
        $("#tableBodyQuestionnaire").empty()
        $("ListeGroupeCoursRecupererQuestionnaire").empty()
        $("ListeQuestionnaireRecupererQuestionnaire").empty()
        document.getElementById("detailQuestionnaire").innerHTML = " ";
        document.getElementById("coursSelectionne").innerHTML = " ";

        let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/cours/getCoursUtilisateur", {token : cookieValue})
        ).done(function (json){
            listeCoursUtilisateur = json.listeCours               
            let listeCoursId = [];
            let nombreDeQuestionnaire = [];
            listeCoursUtilisateur.forEach(element => {
                listeCoursId.push(element._id)
                jQuery.when(
                    jQuery.getJSON("/api/sga/questionnaire/postCoursSelectionneQuestionnaire",{group_id : element._id, token : cookieValue})
                ).done(function (json){
                    let listeQuestionnaire = json.listeQuestionnaire; 
                    nombreDeQuestionnaire.push(listeQuestionnaire.length)
                    if(nombreDeQuestionnaire.length == listeCoursUtilisateur.length){
                        updateDropdownListeGroupeCours(listeCoursId, nombreDeQuestionnaire, "#ListeGroupeCoursRecupererQuestionnaire");
                    }
                });
            });
        });
    }

    document.addEventListener('click', function(e) {
        if (e.target.matches(".dropdown-item") && e.target.matches(".dropdown-cours")) {
            let group_id_choisi = e.target.innerText.split(":")[0];
            e.preventDefault();
            if(group_id_choisi !== "Choisir un groupe-cours"){
                document.getElementById("coursSelectionne").innerHTML = "Cours choisi : " + group_id_choisi
                document.cookie = "group_id="+group_id_choisi
                let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
                jQuery.when(
                    jQuery.getJSON("/api/sga/questionnaire/postCoursSelectionneQuestionnaire",{group_id : group_id_choisi, token : cookieValue})
                ).done(function (json){
                    listeQuestionnaire = json.listeQuestionnaire; 
                    updateTableQuestionnaire(listeQuestionnaire, "#tableBodyQuestionnaire" )
                    updateDropdownListeQuestionnaire(listeQuestionnaire, "#ListeQuestionnaireRecupererQuestionnaire");
                })
            }   
        }
        if (e.target.matches(".dropdown-item") && e.target.matches(".dropdown-questionnaire")) {
            questionnaireChoisi = e.target.innerText;
            document.cooke = "questionnaireChoisi=" + questionnaireChoisi
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let group_id_choisi = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];

            jQuery.when(
                jQuery.getJSON("/api/sga/questionnaire/postQuestionnaireSelectionne",{
                    group_id : group_id_choisi,
                    questionnaireSelectionne : questionnaireChoisi,
                    token : cookieValue})
            ).done(function (json){
                let questionnaire = json.questionnaire
                document.getElementById("detailQuestionnaire").innerHTML =
                    "Nom : " + questionnaire._nom +
                    "<br />Description : "  + questionnaire._description +
                    "<br />Etat : " + questionnaire._etatActif
                
            })
        };

        if (e.target.matches("#buttonRetirerQuestionnaire")) {
            // let questionnaireChoisi = document.cookie.split('; ').find(row => row.startsWith("questionnaireChoisi=")).split("=")[1];
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let group_id_choisi = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];
            console.log(group_id_choisi + questionnaireChoisi)
            jQuery.when(
                jQuery.getJSON("/api/sga/questionnaire/supprimerQuestionnaire",{
                    group_id : group_id_choisi,
                    nomQuestionnaire : questionnaireChoisi,
                    token : cookieValue})
            ).done(function (json){
                setPage()
            })
        }
    });


    function updateDropdownListeGroupeCours(listeGroupeCours, nombreDeQuestionnaire, nomListe){
        $(nomListe).empty()
        let numberOfGroups = listeGroupeCours.length;

        for (let i = 0; i<numberOfGroups; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList.add("dropdown-item","dropdown-cours");
            ele.href = "#";
            ele.innerText =  listeGroupeCours[i] + ":" + nombreDeQuestionnaire[i];
            $(nomListe).append(li);
            li.append(ele);
        }
    }

    function updateDropdownListeQuestionnaire(ListeQuestionnaire, nomListe){
        $(nomListe).empty()
        let numberOfQuestionnaire= ListeQuestionnaire.length;
        for (let i = 0; i<numberOfQuestionnaire; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList.add("dropdown-item","dropdown-questionnaire");
            ele.href = "#";
            ele.innerText =  ListeQuestionnaire[i]._nom;
            $(nomListe).append(li);
            li.append(ele);
        }
    }

    function updateTableQuestionnaire(listeQuestionnaire, nomTable){
        $(nomTable).empty()
        let numberOfQuestionnaire = listeQuestionnaire.length;
        for(let i = 0 ; i<numberOfQuestionnaire ; i++){
            let tr = document.createElement("tr");
            let number = document.createElement("th");
            let student = document.createElement("td");
            number.scope = "row";
            number.innerText = i.toString();
            student.innerText = listeQuestionnaire[i]._nom;
            $(nomTable).append(tr);
            tr.append(number);
            tr.append(student);
        }
    }

});