import { Devoir } from "./Devoir";
import { universite } from "./Universite";

export class ControleurDevoir{

    public postCoursSelectionne(group_id : string, token : string){
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            if (enseignant.listeCours !== null) {
                let cours = enseignant.listeCours.get(group_id);
                return cours.listeDevoir;
            }
            return [];
        }        
    }

    public addDevoir(group_id : string,
                        nom: string, 
                        description: string, 
                        dateDebut: string, 
                        dateFin : string,
                        noteMaximale : number, 
                        etat : boolean,
                        token : string,
                        ){
        let enseignant = this.recupererEnseignantAvecToken(token)
        if (enseignant) {
            let devoir = new Devoir(nom, description,noteMaximale,dateDebut,dateFin, etat)
            enseignant.ajoutDevoir(group_id,devoir);
        }
    }

    public recupererEnseignantAvecToken(token : string){
        let enseignant = universite.listeEnseignant.get(token)
        return enseignant;
    }
}