$(document).ready(function() {

    let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
        jQuery.when(
            jQuery.getJSON("/api/sga/cours/getGroupeCoursSGB", {token : cookieValue})
        ).done(function (json){
            let listeGroupeCours = json.listeGroupeCours
            updateDropdownListeGroupeCours(listeGroupeCours, "#listeGroupeCoursAjoutCours");
        });

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
            e.preventDefault();
            let group_id_choisi = e.target.innerText;
            if(group_id_choisi !== "Choisir un groupe-cours"){
                document.cookie = "group_id="+group_id_choisi
                let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
                jQuery.when(
                    jQuery.getJSON("/api/sga/cours/recupererEtudiantsGroupeCours",{group_id : group_id_choisi, token : cookieValue})
                ).done(function (json){
                    let listeEtudiants = json.listeEtudiants;
                    jQuery.when(
                        jQuery.getJSON("/api/sga/cours/getInfoGroupeCours",{group_id : group_id_choisi, token : cookieValue})
                    ).done(function (json){
                        let cours = json.cours;
                        let prealable = cours._prealables;
                        if(!prealable){
                            prealable = "Non applicable"
                        }
                        let titre = cours._titre;
                        document.getElementById('ajouterCoursDescription').innerHTML = "Group id : " + group_id_choisi +
                                                                        "<br />Titre : " + titre + 
                                                                        "<br />Prealable : " + prealable;
                        updateTableEtudiant(listeEtudiants, "#tableBodyEtudiantsGroupeAjouter" );
                    });
                });
            } 
        };

        if(e.target.matches("#buttonAjouterCours")){
            let group_id = document.cookie.split('; ').find(row => row.startsWith("group_id=")).split("=")[1];
            let listeEtudiants = [];
            $('#tableBodyEtudiantsGroupeAjouter > tr > td').each(function(index, td){
                listeEtudiants.push(td.innerText);
            });
            let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
            jQuery.when(
                jQuery.getJSON("/api/sga/cours/addCours",{group_id : group_id, listeEtudiants : listeEtudiants , token : cookieValue})
            ).done( function(json) {
                $("#modalConfirmationAjoutCours").modal("toggle")
                $("#tableBodyEtudiantsGroupeAjouter").empty()
                document.getElementById('ajouterCoursDescription').innerHTML = ""

            });
        }



    });

    function updateTableEtudiant(listeEtudiants, nomTable){
        $(nomTable).empty()
        let numberOfStudent = listeEtudiants.length;
        for(let i = 0 ; i<numberOfStudent ; i++){
            let tr = document.createElement("tr");
            let number = document.createElement("th");
            let student = document.createElement("td");
            number.scope = "row";
            number.innerText = (i+1).toString();
            student.innerText = listeEtudiants[i];
            $(nomTable).append(tr);
            tr.append(number);
            tr.append(student);
        }
    }



});