$(document).ready(function() {
    setPage()
    function setPage(){
        $("#tableBodyQuestionnaire").empty()
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
                        updateDropdownListeGroupeCours(listeCoursId, nombreDeQuestionnaire, "#ListeGroupeCoursAjouterQuestionnaire");
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
                    let listeQuestionnaire = json.listeQuestionnaire; 
                    updateTableQuestionnaire(listeQuestionnaire, "#tableBodyQuestionnaire" )
                    jQuery.when(
                        jQuery.getJSON("/api/sga/question/postCoursSelectionne", {group_id : group_id_choisi, token : cookieValue})
                    ).done(function (json){
                        listeQuestions = json.questions
                        updateDropdownListeQuestions(listeQuestions, "#ListeQuestionsAjouterQuestionnaire");
                    });
                })
            }   
        }
        if (e.target.matches(".dropdown-item") && e.target.matches(".dropdown-question")) {
            let question_choisi = e.target.innerText;
            e.preventDefault();
            if(question_choisi !== "Choisir une question"){
                listeQuestions.forEach(question => {
                    if(question._nom == question_choisi.split(" : ")[0]){
                        let nom = question._nom;
                        document.cookie = "nomQuestion=" + nom
                    }
                });
            }
        }

        if (e.target.matches("#btnAjouterQuestionnaire")) {
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let group_id_choisi = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];
            let nomQuestionnaireInput = $("#inputNomQuestionnaire").val()
            let inputDescriptionQuestionnaire = $("#inputDescriptionQuestionnaire").val()
            let etat = document.querySelector('input[name="btnradio"]:checked').value

            jQuery.when(
                jQuery.getJSON("/api/sga/questionnaire/createQuestionnaire",{
                    group_id : group_id_choisi,
                    nom : nomQuestionnaireInput,
                    description : inputDescriptionQuestionnaire,
                    etatActif : etat,
                    token : cookieValue
                })
            ).done(function (json){
                document.getElementById("etatQuestionnaire").innerHTML = "Questionnaire cree"
                document.cookie = "questionnaire=" + nomQuestionnaireInput
                $("#modalConfirmationAjoutQuestionnaire").modal("toggle")
                setPage();

            })
        }

        if (e.target.matches("#btnAjouterQuestion")) {
            let group_id_choisi = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];
            let listeQuestions = [];
            let question = document.cookie.split('; ').find(row => row.startsWith("nomQuestion=")).split("=")[1];
            listeQuestions.push(question);
            let questionnaire = document.cookie.split('; ').find(row => row.startsWith("questionnaire=")).split("=")[1];
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            
            jQuery.when(
                jQuery.getJSON("/api/sga/questionnaire/addQuestion",{
                    group_id : group_id_choisi,
                    listeQuestions : listeQuestions,
                    questionnaire : questionnaire,
                    token : cookieValue
                })
            ).done(function (json){
                $("#modalConfirmationAjoutQuestion").modal("toggle")


            });
            
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

    function updateDropdownListeQuestions(listeQuestions, nomListe){
        $(nomListe).empty()
        let numberOfQuestions = listeQuestions.length;

        for (let i = 0; i<numberOfQuestions; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList.add("dropdown-item","dropdown-question");
            ele.data = "#";
            ele.innerText =  listeQuestions[i]._nom + " : " + listeQuestions[i]._nombreQuestionnaire;
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