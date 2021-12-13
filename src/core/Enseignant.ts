import { Cours } from "./Cours";
import { Question } from "./Question";
import { Devoir } from "./Devoir";

export class Enseignant {
    private _nom: string;
    private _prenom: string;
    private _id: string;
    private _token: string;
    private _listeCours : Map<string,Cours>;

    constructor(nom: string, prenom: string, id: string, token: string, listeCours : Map<string,Cours>) {
        this._nom = nom;
        this._id = id;
        this._prenom = prenom;
        this._token = token;
        this._listeCours = listeCours;
    }

    set nom(nom: string) {
        this._nom = nom;
    }

    get nom(){
        return this._nom;
    }

    set id(id: string) {
        this._id = id;
    }

    get id(){
        return this._id
    }

    set prenom(prenom: string) {
        this._prenom = prenom;
    }

    get prenom(){
        return this._prenom
    }

    set token(token: string) {
        this._token = token;
    }

    get token(){
        return this._token;
    }

    set listeCours(listeCours: Map<string,Cours>) {
        this._listeCours = listeCours;
    }

    get listeCours() {
        return this._listeCours;
    }

    public ajoutCours(cours: Cours){
        if(this._listeCours == null){
            this._listeCours = new Map()
        }
        this._listeCours.set(cours.id, cours)
    }

    public addQuestion(group_id : string, listeQuestions : string[], questionnaire : string) {
        let cours = this.listeCours.get(group_id);
        let vrailistequestion = [];
        listeQuestions.forEach(element => {
            vrailistequestion.push(cours.listeQuestions.get(element));
        });
        let vraiquestionnaire = cours.listeQuestionnaire.get(questionnaire);
        vraiquestionnaire.addlisteQuestion(vrailistequestion);
        return "Questions ajoutées au questionnaire"
    }

    public ajoutDevoir(group_id : string, devoir : Devoir){
        let cours = this._listeCours.get(group_id)
        cours.listeDevoir.set(devoir.nom, devoir);
    }

}