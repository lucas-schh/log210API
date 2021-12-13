$(document).ready(function() {
    setPage()
    function setPage(){
        $("#list-tab").empty()
        let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/question/postCoursSelectionne", {token : cookieValue})
        ).done(function (json){
            listeQuestions = json.questions
            updateDropdownListeQuestions(listeQuestions, "#ListeQuestionsSupprimerQuestions");
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
            e.preventDefault();
            if(question_choisi !== "Choisir une question"){
                document.cookie = "question_choisi="+question_choisi
                listeQuestions.forEach(question => {
                    if(question._nom == question_choisi){
                        let nom = question._nom;
                        let tags = question._tags;
                        let type = question._type;
                        let enonce = question._enonce;
                        let verite = question._verite;
                        let retroactionVrai = question._retroaction_vrai;
                        let retroactionFaux = question._retroaction_faux;
                        document.getElementById("infoQuestion").innerHTML =
                        "NOM : " + nom +
                        "<br />ENONCE : " + enonce +
                        "<br />TAGS : " + tags +
                        "<br />TYPE : " + type +
                        "<br />VERITE : " + verite +
                        "<br />RETROACTION VRAI : " + retroactionVrai +
                        "<br />RETROACTION FAUX : " + retroactionFaux
                    }
                });
            }
        }


        if (e.target.matches("#buttonRetirerquestion")) {
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let question_choisi = document.cookie.split('; ').find(row => row.startsWith("question_choisi=")).split("=")[1];
            if(question_choisi != null){
                jQuery.when(
                jQuery.getJSON("/api/sga/question/supprimerQuestion",{
                    nomQuestion : question_choisi,
                    token : cookieValue
                })
                ).done(function (json){
                    document.getElementById("infoQuestion").innerHTML = " "
                    setPage()
                })
            }
            
        }
    });





});