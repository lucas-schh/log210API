import { Question } from './Question';
import { Etudiant } from './Etudiant';

export class Questionnaire {

    private _nom: string;
    private _description: string;
    private _etatActif: boolean;
    private _listeQuestion: Question[];
    private _listeEtudiant : Map<number, Etudiant>;

    constructor(nom : string, description : string, etatActif : boolean, listeQuestion : Question[], listeEtudiant : Map<number, Etudiant>) {
        this._nom = nom;
        this._description = description;
        this._etatActif=etatActif;
        this._listeQuestion=listeQuestion;
        this._listeEtudiant=listeEtudiant;
    }

    get nom() {
        return this._nom;
    }

    get description() {
        return this._description;
    }

    get etatActif() {
        return this._etatActif;
    }

    get listeQuestion() {
        return this._listeQuestion;
    }

    get listeEtudiant() {
        return this._listeEtudiant;
    }

    set nom(nom: string) {
        this._nom = nom;
    }
    set description(description: string) {
        this._description = description;
    }
    set etatActif(etatActif: boolean) {
        this._etatActif = etatActif;
    }
    set listeQuestion(listeQuestion: Question[]) {
        this._listeQuestion = listeQuestion;
    }

    set listeEtudiant(listeEtudiant: Map<number, Etudiant>) {
        this._listeEtudiant = listeEtudiant;
    }
    
    addQuestion(question : Question) {
        if(this._listeQuestion == null){
            this._listeQuestion = [];
        }
        this._listeQuestion.push(question);
        question.augmenteNbQuestionnaire()
    }

    addlisteQuestion(questions : Question[]) {
        questions.forEach(element => {
            this.addQuestion(element);            
        });
    }
}
