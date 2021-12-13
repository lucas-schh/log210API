import { universite, Universite } from "./Universite";
import { FacadeSGB } from "./SGB/FacadeSGB";
import { Enseignant} from "./Enseignant";



export class ControleurEnseignant {

    public async authEnseignant(email: string, password: string){
        let response = await FacadeSGB.authEnseignant(email, password);
        let data = JSON.parse(response);
        let token = data.token;
        let prenom = data.user.first_name;
        let nom = data.user.last_name;
        let id = data.user.id;
        let enseignant = universite.listeEnseignant.get(token)
        if(!enseignant){
            enseignant = new Enseignant(prenom, nom, id, token, null);
            universite.ajoutEnseignant(enseignant);
        }
        return enseignant;
    }

    public recupererEnseignantAvecToken(token : string){
        let enseignant = universite.listeEnseignant.get(token)
        return enseignant;
    }


}
