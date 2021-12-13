import { universite } from "./Universite";
import { ControleurQuestion } from "./ControleurQuestion";
import { Question } from "./Question";
import { connect } from "http2";

export class ControleurQuestionnaire {

    public postCoursSelectionneQuestionnaire(group_id: string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            if (enseignant.listeCours !== null) {
                let cours = enseignant.listeCours.get(group_id)
                return cours.listeQuestionnaire;
            }
            return [];
        };
    }

    public createQuestionnaire(group_id: string, nom : string, description : string, etatActif : boolean, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let cours = enseignant.listeCours.get(group_id)
            let message = cours.createQuestionnaire(nom, description, etatActif);
            return message

        };
    }

    public postTypeQuestion(group_id : string, typeSelectionne : string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let cours = enseignant.listeCours.get(group_id);
            let listeTypeSelectionne : Question[] = new Array<Question>();
            if(cours.listeQuestions !== null) {
                cours.listeQuestions.forEach(element => {
                    if (element.type == typeSelectionne) {
                        listeTypeSelectionne.push(element);
                    }
                });
            }
            return listeTypeSelectionne;
        };
    }

    public addQuestion(group_id : string, listeQuestions : string[], questionnaire : string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let message = enseignant.addQuestion(group_id, listeQuestions, questionnaire);    
            
            return message;
            
        };
    }

    public postQuestionnaireSelectionne(group_id : string, questionnaireSelectionne : string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let cours = enseignant.listeCours.get(group_id);
            return cours.listeQuestionnaire.get(questionnaireSelectionne);
        }
    }

    public modifierQuestionnaire(group_id : string, nomQuestionnaire : string,
                                nouveauNomQuestionnaire : string,
                                nouvelleDescriptionQuestionnaire : string,
                                nouveauEtatActif : boolean, 
                                nouvelleListeQuestion : Question[],
                                token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let cours = enseignant.listeCours.get(group_id);
            let questionnaire = cours.listeQuestionnaire.get(nomQuestionnaire);
            if (nouvelleDescriptionQuestionnaire!=null) questionnaire.description = nouvelleDescriptionQuestionnaire;
            if (nouveauEtatActif!=null) questionnaire.etatActif = nouveauEtatActif;
            if (nouvelleListeQuestion!=null) questionnaire.listeQuestion = nouvelleListeQuestion;
            if (nouveauNomQuestionnaire!=null) { 
                questionnaire.nom = nouveauNomQuestionnaire;
                cours.listeQuestionnaire.delete(nomQuestionnaire);
                cours.listeQuestionnaire.set(questionnaire.nom, questionnaire);
            }
            return "Questionnaire modifié"
        }
    }

    public supprimerQuestionnaire(group_id : string, nomQuestionnaire : string, token : string) {
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            
            let cours = enseignant.listeCours.get(group_id);
            let questionnaire = cours.listeQuestionnaire.get(nomQuestionnaire);
            cours.listeQuestionnaire.delete(nomQuestionnaire);
            if(questionnaire.listeQuestion !== null) {
                questionnaire.listeQuestion.forEach(question => {
                    question.diminueNbQuestionnaire();
                });
            }
            return "Questionnaire supprimée"
        }
    }

    public recupererEnseignantAvecToken(token : string){        
        let enseignant = universite.listeEnseignant.get(token)
        return enseignant;
    }
}