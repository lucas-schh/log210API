$(document).ready(function() {
    setPage()
    function setPage(){
        $("#tableBodyQuestion").empty()
        let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/cours/getCoursUtilisateur", {token : cookieValue})
        ).done(function (json){
            let listeGroupeCours = json.listeCours
            let listeCoursId = [];
            listeGroupeCours.forEach(element => {
                listeCoursId.push(element._id)
            });
            updateDropdownListeGroupeCours(listeCoursId, "#listeGroupeCoursAjoutQuestion");
        });
    }

    function updateDropdownListeGroupeCours(listeGroupeCours, nomListe){
        $(nomListe).empty()
        let numberOfGroups = listeGroupeCours.length;

        for (let i = 0; i<numberOfGroups; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.data = "#";
            ele.innerText =  listeGroupeCours[i];
            $(nomListe).append(li);
            li.append(ele);
        }
    }
    document.addEventListener('click', function(e) {
        if (e.target.matches(".dropdown-item")) {
            let group_id_choisi = e.target.innerText;
            e.preventDefault();
            if(group_id_choisi !== "Choisir un groupe-cours"){
                
                document.cookie = "group_id="+group_id_choisi
                let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
                jQuery.when(
                    jQuery.getJSON("/api/sga/question/postCoursSelectionne",{group_id : group_id_choisi, token : cookieValue})
                ).done(function (json){
                    let listeQuestions = json.questions; 
                    updateTableQuestion(listeQuestions, "#tableBodyQuestion" )
                    document.getElementById("coursSelectionne").innerHTML = "Cours choisi : " + group_id_choisi
                    if(listeQuestions.length == 0){
                        document.getElementById("coursSelectionne").innerHTML += "<br />Aucune question n'a été crée pour ce cours"
                    }
                })
            }
        }

        if (e.target.matches("#btnAjouterQuestion")) {
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let group_id_choisi = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];
            let nomQuestionInput = $("#inputNomQuestion").val()
            let questionInput = $("#inputNouvelleQuestion").val()
            let tagsInput = $("#inputTagsQuestion").val()
            let veriteInput = document.querySelector('input[name="btnradio"]:checked').value
            let retroactionVraiInput = $("#inputRetroactionPositive").val()
            let retroactionFauxInput = $("#inputRetroactionNegative").val()
            jQuery.when(
                jQuery.getJSON("/api/sga/question/setQuestion",{cours : group_id_choisi,
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
                $("#modalConfirmationAjouterQuestion").modal("toggle")
            })
        }

    });

    function updateTableQuestion(listeQuestions, nomTable){
        $(nomTable).empty()
        let numberOfQuestion = listeQuestions.length;
        for(let i = 0 ; i<numberOfQuestion ; i++){
            let tr = document.createElement("tr");
            let number = document.createElement("th");
            let student = document.createElement("td");
            number.scope = "row";
            number.innerText = (i+1).toString();
            student.innerText = listeQuestions[i]._nom;
            $(nomTable).append(tr);
            tr.append(number);
            tr.append(student);
        }
    }



    


});