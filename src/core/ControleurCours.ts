import { universite, Universite } from "./Universite";
import { Cours } from "./Cours";
import { FacadeSGB } from "./SGB/FacadeSGB";
import { Enseignant} from "./Enseignant";
import { Etudiant } from "./Etudiant";
import { enseignantRouter } from "../routes/EnseignantRouter";
import { connect } from "http2";



export class ControleurCours {

    public async getInfoGroupeCours(group_id, token : string) {
        if (this.recupererEnseignantAvecToken(token)) {
            let response = await FacadeSGB.getListeCours()
            let data = JSON.parse(response).data;
            let cours : Cours;
            let cours_id = group_id.split('-')[1];

            data.forEach(element => {
                if(element.id == cours_id){
                    let id = element.id;
                    let prealables = element.prealable;
                    let titre = element.titre;
                    cours = new Cours(id, prealables, titre,null,null,null, null, null, null, null, null, null, null)
                    return cours
                }
            });
            return cours
    }
    }

    // public recupererListeCoursUniversite(){
    //     return universite.listeCours;
    // }


    public async getGroupeCoursSGB(token : string){
        let enseignant = this.recupererEnseignantAvecToken(token);
        if (enseignant) {
            let listeGroupeCours = await FacadeSGB.getListeSchedulesEnseignant(enseignant.id);
            return listeGroupeCours;
        }
    }

    public getCoursUtilisateur(token : string){
        let enseignant = this.recupererEnseignantAvecToken(token);
        if (enseignant) {
            if (enseignant.listeCours !== null) {
                return enseignant.listeCours;
            }
            return [];
        }
    }



    public async recupererEtudiantsGroupeCours(group_id : string, token : string){
        if (this.recupererEnseignantAvecToken(token)) {
            let response = await FacadeSGB.getLienEtudiantsGroupe();
            let data = JSON.parse(response).data;
            let listeEtudiants = [];
            data.forEach(element => {
                if (element.group_id == group_id){
                    listeEtudiants.push(element.student_id);
                }
            });
            return listeEtudiants;
        }
    }

    public async addCours(group_id : string, listeEtudiants : string[], token : string){
        let enseignant = this.recupererEnseignantAvecToken(token);
        if (enseignant) {
            let cours = await this.getInfoGroupeCours(group_id, token);
            let infoGroupeCours = await FacadeSGB.getInfoGroupeCours(group_id);
            let groupeCours = new Cours(group_id,
                cours.prealables, 
                cours.titre, 
                cours.enseignant, 
                null, 
                null, 
                null,
                infoGroupeCours.day,
                infoGroupeCours.hours,
                infoGroupeCours.activity,
                infoGroupeCours.mode,
                infoGroupeCours.local,
                infoGroupeCours.teacher_id)
            Array.from(listeEtudiants).forEach(id_etudiant => {
                let etudiant = new Etudiant(id_etudiant);
                groupeCours.addEtudiant(etudiant);
            });
            enseignant.ajoutCours(groupeCours);
        }
    }

    public deleteCoursChoisi(group_id : string, token : string){
        let enseignant = this.recupererEnseignantAvecToken(token);
        if (enseignant) {
            enseignant.listeCours.delete(group_id);
        }
        return enseignant.listeCours
    }

    public recupererEnseignantAvecToken(token : string){        
        let enseignant = universite.listeEnseignant.get(token)
        return enseignant;
    }
}
