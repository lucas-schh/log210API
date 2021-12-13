$(document).ready(function() {

    let cookieValue = document.cookie.split('; ').find(row => row.startsWith("token=")).split("=")[1];
    jQuery.when(
        jQuery.getJSON("/api/sga/cours/getCoursUtilisateur", {token : cookieValue})
    ).done(function (json){
        listeCoursUtilisateur = json.listeCours                
        let listeCoursId = [];
        listeCoursUtilisateur.forEach(element => {
            listeCoursId.push(element._id)
        });
        updateDropdownListeGroupeCours(listeCoursId, "#ListeGroupeCoursRecupererCours");
    });

    document.addEventListener('click', function(e) {
        if (e.target.matches(".dropdown-item")) {
            e.preventDefault();
            let group_id_choisi = e.target.innerText;
            let listeEtudiants = [];
            if(group_id_choisi !== "Choisir un groupe-cours"){
                listeCoursUtilisateur.forEach(element => {
                    if(element._id == group_id_choisi){     
                        let prealable = element._prealables;
                        if(!prealable){
                            prealable = "Non applicable"
                        }
                        titre = element._titre;
                        let day = element._day;
                        let hours = element._hours;
                        let activity = element._activity;
                        let mode = element._mode;
                        let local = element._local;
                        let teacher_id = element._teacher_id;                   
                        for(let i = 0 ; i < element._listeEtudiants.length ; i++){
                            listeEtudiants.push(element._listeEtudiants[i]._id)
                        } 
                        document.getElementById('recupererCoursDescription').innerHTML = "Group id : " + group_id_choisi +
                                                                                        "<br />Titre : " + titre + 
                                                                                        "<br />Prealable : " + prealable +
                                                                                        "<br />Day : " + day +
                                                                                        "<br />Hours : " + hours +
                                                                                        "<br />Activity : " + activity +
                                                                                        "<br />Mode : " + mode +
                                                                                        "<br />Local : " + local;
                        updateTableEtudiant(listeEtudiants, "#tableBodyEtudiantsGroupeRecuperer");
                    }
                }); 
            }
        }
    });

    function updateDropdownListeGroupeCours(listeGroupeCours, nomListe){
        $(nomListe).empty()
        let numberOfGroups = listeGroupeCours.length;

        for (let i = 0; i<numberOfGroups; i++) {
            let li = document.createElement("li");
            let ele = document.createElement("a");
            ele.classList = "dropdown-item";
            ele.href = "#";
            ele.innerText =  listeGroupeCours[i];
            $(nomListe).append(li);
            li.append(ele);
        }
    }

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
    };






});