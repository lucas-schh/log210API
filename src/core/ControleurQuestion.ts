import { universite } from "./Universite";
import { Question } from "./Question";
import { group } from "console";



export class ControleurQuestion {
    
    public postCoursSelectionne(group_id : string, token : string){
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let listeQuestions = [];
            if(group_id == null){
                enseignant.listeCours.forEach(cours =>{
                    if (cours.listeQuestions != null) {
                        cours.listeQuestions.forEach(question => {
                        listeQuestions.push(question)
                        })
                    }
                })
            }
            if(group_id != null){
                if(enseignant.listeCours !== null) {
                    let cours = enseignant.listeCours.get(group_id)
                    if (cours.listeQuestions != null) {
                        cours.listeQuestions.forEach(question => {
                            listeQuestions.push(question)
                        })
                    }
                }
            }
            return listeQuestions
        };
    }

    public setQuestion(group_id:string,type:string,tags:string,nom:string,
        enonce:string,verite:boolean,retroaction_reponse_vrai:string,
        retroaction_reponse_fausse:string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if(enseignant) {
            let cours = enseignant.listeCours.get(group_id)
            cours.addQuestion(type,tags,nom,enonce,verite,retroaction_reponse_vrai,retroaction_reponse_fausse)
        }
    }

    public modifierQuestion(questionOriginale : string,type:string,tags:string,nom:string,
        enonce:string,verite:boolean,retroaction_reponse_vrai:string,
        retroaction_reponse_fausse:string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if(enseignant) {
            enseignant.listeCours.forEach(cours => {
                if(cours.listeQuestions != null){
                    try{
                        cours.listeQuestions.delete(questionOriginale)
                        cours.addQuestion(type,tags,nom,enonce,verite,retroaction_reponse_vrai,retroaction_reponse_fausse)
                    }
                    catch{}
                }
            })
        }
    }

    public supprimerQuestion(nomQuestion : string, token : string){
        let enseignant = this.recupererEnseignantAvecToken(token)
        if(enseignant) {
            enseignant.listeCours.forEach(cours => {
                if(cours.listeQuestions != null){
                    try{
                        cours.listeQuestions.delete(nomQuestion)
                    }
                    catch{}
                }
            })
        }
    }


    public recupererEnseignantAvecToken(token : string){
        let enseignant = universite.listeEnseignant.get(token)
        return enseignant;
    }
}
