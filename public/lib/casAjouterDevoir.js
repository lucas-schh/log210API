$(document).ready(function() {
    $(function() {
        $('input[name="daterange"]').daterangepicker({
            opens: 'left'
            }, function(start, end, label) {
            inputDebut = start.format('YYYY-MM-DD')
            inputFin = end.format('YYYY-MM-DD')
        });
    });
    setPage()
    function setPage(){
        booleanChoice = false
        $("#tableBodyDevoir").empty()
        let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/cours/getCoursUtilisateur", {token : cookieValue})
        ).done(function (json){
            let listeGroupeCours = json.listeCours
            let listeCoursId = [];
            let nbDevoirParCours = [];

            listeGroupeCours.forEach(element => {
                listeCoursId.push(element._id)
                    jQuery.when(
                        jQuery.getJSON("/api/sga/devoir/postCoursSelectionne",{group_id : element._id, token : cookieValue})
                    ).done(function (json){
                        let listeDevoir = json.listeDevoir; 
                        nbDevoirParCours.push(listeDevoir.length)
                        if(nbDevoirParCours.length == listeGroupeCours.length){
                            updateDropdownListeGroupeCours(listeCoursId, nbDevoirParCours, "#listeGroupeCoursAjoutDevoir");
                        }
                });
            });
        });
    }

    document.addEventListener('click', function(e) {
        if (e.target.matches(".dropdown-item")) {
            group_id_choisi = e.target.innerText.split(" : ")[0];
            e.preventDefault();
            if(group_id_choisi !== "Choisir un groupe-cours"){
                booleanChoice = true
                document.getElementById("coursSelectionne").innerHTML = "Cours choisi : " + group_id_choisi
                document.cookie = "group_id="+group_id_choisi
                let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
                jQuery.when(
                    jQuery.getJSON("/api/sga/devoir/postCoursSelectionne",{group_id : group_id_choisi, token : cookieValue})
                ).done(function (json){
                    let listeDevoir = json.listeDevoir; 
                    updateTableDevoir(listeDevoir, "#tableBodyDevoir" )
                })
            }
        }
        if (e.target.matches("#btnAjouterDevoir")) {
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            let group_id_choisi = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];
            let inputNomDevoir = $("#inputNomDevoir").val()
            let inputDescription = $("#inputDescription").val()
            
            let inputNoteMax = document.getElementById("NoteMaximale").value

            let etat = document.querySelector('input[name="btnradio"]:checked').value
            if(booleanChoice){
                jQuery.when(
                    jQuery.getJSON("/api/sga/devoir/addDevoir",{
                        group_id : group_id_choisi,
                        nom : inputNomDevoir,
                        description : inputDescription,
                        dateDebut : inputDebut,
                        dateFin : inputFin,
                        noteMaximale : inputNoteMax,
                        etatVisible : etat,
                        token : cookieValue
                    })
                ).done(function (json){
                    $('#tableBodyDevoir').empty()
                    setPage()
                    $("#modalConfirmationAjoutDevoir").modal("toggle")

                    
                })
            }
           
        }
    });

    function updateTableDevoir(listeDevoir, nomTable){
        $(nomTable).empty()
        let numberOfDevoir = listeDevoir.length;
        for(let i = 0 ; i<numberOfDevoir ; i++){
            let tr = document.createElement("tr");
            let number = document.createElement("th");
            let student = document.createElement("td");
            number.scope = "row";
            number.innerText = i.toString();
            student.innerText = listeDevoir[i]._nom;
            $(nomTable).append(tr);
            tr.append(number);
            tr.append(student);
        }
    }
    function updateDropdownListeGroupeCours(listeGroupeCours,nbDevoirParCours, nomListe){
        $(nomListe).empty()
        let numberOfGroups = listeGroupeCours.length;

        for (let i = 0; i<numberOfGroups; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.data = "#";
            ele.innerText =  listeGroupeCours[i] + " : " + nbDevoirParCours;
            $(nomListe).append(li);
            li.append(ele);
        }
    }

});