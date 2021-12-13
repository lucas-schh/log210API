$(document).ready(function() {
    setPage()
    function setPage(){
        $("#list-tab").empty()
        let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/question/postCoursSelectionne", {token : cookieValue})
        ).done(function (json){
            listeQuestions = json.questions
            updateDropdownListeQuestions(listeQuestions, "#ListeQuestionsModifierQuestions");
        });
    }

    function updateDropdownListeQuestions(listeQuestions, nomListe){
        $(nomListe).empty()
        let numberOfQuestions = listeQuestions.length;

        for (let i = 0; i<numberOfQuestions; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.data = "#";
            ele.innerText =  listeQuestions[i]._nom;
            $(nomListe).append(li);
            li.append(ele);
        }
    }

    document.addEventListener('click', function(e) {
        if (e.target.matches(".dropdown-item")) {
            let question_choisi = e.target.innerText;
            document.cookie = "nomQuestion="+question_choisi
            e.preventDefault();
            if(question_choisi !== "Choisir une question"){
                listeQuestions.forEach(question => {
                    if(question._nom == question_choisi){
                        let nom = question._nom;
                        let tags = question._tags;
                        let type = question._type;
                        let enonce = question._enonce;
                        let verite = question._verite;
                        let retroactionVrai = question._retroaction_vrai;
                        let retroactionFaux = question._retroaction_faux;
                        document.getElementById("inputNomQuestion").setAttribute('value',nom);
                        document.getElementById("inputNouvelleQuestion").setAttribute('value',enonce);
                        document.getElementById("inputTagsQuestion").setAttribute('value',tags);
                        document.getElementById("inputRetroactionPositive").setAttribute('value',retroactionVrai);
                        document.getElementById("inputRetroactionNegative").setAttribute('value',retroactionFaux);
                        if(verite == true){
                            document.getElementById("btnradioVrai").checked = true
                        }
                        if(verite == false){
                            document.getElementById("btnradioFaux").checked = true
                        }
                    }
                });
            }
        }

        if (e.target.matches("#btnModifierQuestion")) {
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let nomQuestionOriginale = document.cookie.split('; ').find(row => row.startsWith("nomQuestion=")).split("=")[1];
            let nomQuestionInput = $("#inputNomQuestion").val()
            let questionInput = $("#inputNouvelleQuestion").val()
            let tagsInput = $("#inputTagsQuestion").val()
            let veriteInput = document.querySelector('input[name="btnradio"]:checked').value
            let retroactionVraiInput = $("#inputRetroactionPositive").val()
            let retroactionFauxInput = $("#inputRetroactionNegative").val()

            jQuery.when(
                jQuery.getJSON("/api/sga/question/modifierQuestion",{
                    questionOriginale : nomQuestionOriginale,
                    type : "Type vrai faux",
                    tags : tagsInput,
                    nom : nomQuestionInput,
                    enonce : questionInput,
                    retroaction_reponse_vrai : retroactionVraiInput,
                    retroaction_reponse_fausse : retroactionFauxInput,
                    verite : veriteInput,
                    token : cookieValue
                })
            ).done(function (json){
                $("#modalConfirmationModifierQuestion").modal("toggle")
                document.getElementById("questionModifie").innerHTML =
                "<br />NOM : " + nomQuestionInput +
                "<br />ENONCE : " + questionInput +
                "<br />TAGS : " + tagsInput +
                "<br />VERITE : " + veriteInput +
                "<br />RETROACTION VRAI : " + retroactionVraiInput +
                "<br />RETROACTION FAUX : " + retroactionFauxInput;
            })
        }



    });



});