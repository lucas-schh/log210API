$(document).ready(function() {
    setPage()
    function setPage(){
        $("#list-tab").empty()
        let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/question/postCoursSelectionne", {token : cookieValue})
        ).done(function (json){
            listeQuestions = json.questions
            updateDropdownListeQuestions(listeQuestions, "#ListeQuestionsRecupererQuestions");
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
    });

    



});