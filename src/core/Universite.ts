import { Cours } from "./Cours";
import { Enseignant } from "./Enseignant";
import { Etudiant } from "./Etudiant";

export class Universite {
    private _listeEtudiants : Map<string,Etudiant>;
    private _listeEnseignant : Map<string,Enseignant>;


    constructor(listeEtudiants : Map<string,Etudiant>, listeEnseignant : Map<string,Enseignant>) {
        this._listeEtudiants = listeEtudiants;
        this._listeEnseignant = listeEnseignant;
    }


    set listeEtudiants (listeEtudiants : Map<string,Etudiant>) {
        this._listeEtudiants = listeEtudiants;
    }

    get listeEtudiants () {
        return this._listeEtudiants;
    }


    set listeEnseignant(listeEnseignant : Map<string,Enseignant>) {
        this._listeEnseignant = listeEnseignant;
    }

    get listeEnseignant(){
        return this._listeEnseignant;
    }


    ajoutEnseignant(enseignant : Enseignant){
        this._listeEnseignant.set(enseignant.token, enseignant)
    }

    getEnseignant(enseignantNom : string){
        
        return this._listeEnseignant.get(enseignantNom);
    }

    getListeGroupeCours(enseignant: Enseignant){
        return enseignant.listeCours;
    }

}

export const universite = new Universite(new Map<string,Etudiant>(), new Map<string,Enseignant>());
