import internal from 'stream';
import { Questionnaire } from './Questionnaire';
import { Etudiant } from './Etudiant';

export class Question {
    // classe inspirée de la classe conceptuelle (du MDD)
    private _type: string;
    private _tags: string;
    private _nom: string;
    private _enonce: string;
    private _verite: boolean;
    private _retroaction_vrai: string;
    private _retroaction_faux: string;
    private _nombreQuestionnaire: number;
    private _etudiants : Map<number, Etudiant>;
    
    constructor(type : string, tags : string, nom : string, enonce : string,
        verite : boolean, retroaction_vrai: string, retroaction_faux: string) {
        this._nom = nom;
        this._tags = tags;
        this._type = type;
        this._enonce = enonce;
        this._verite = verite;
        this._retroaction_vrai = retroaction_vrai;
        this._retroaction_faux = retroaction_faux;
        this._nombreQuestionnaire = 0;
    }

    get nom() {
        return this._nom;
    }

    get tags() {
        return this._tags;
    }

    get type() {
        return this._type;
    }
    get enonce() {
        return this._enonce;
    }
    get verite() {
        return this._verite;
    }
    get retroaction_vrai() {
        return this._retroaction_vrai;
    }
    get retroaction_faux() {
        return this._retroaction_faux;
    }

    set nom(nom: string) {
        this._nom = nom;
    }
    set tags(tags: string) {
        this._tags = tags;
    }
    set type(type: string) {
        this._type = type;
    }
    set enonce(enonce: string) {
        this._enonce = enonce;
    }
    set verite(verite: boolean) {
        this._verite = verite;
    }
    set retroaction_vrai(retroaction_vrai: string) {
        this._retroaction_vrai = retroaction_vrai;
    }

    set retroaction_faux(retroaction_faux: string) {
        this._retroaction_faux = retroaction_faux;
    }

    public get nombreQuestionnaire(): number {
        return this._nombreQuestionnaire;
    }
    public set nombreQuestionnaire(value: number) {
        this._nombreQuestionnaire = value;
    }

    public augmenteNbQuestionnaire(){
        this._nombreQuestionnaire ++;
    }

    public diminueNbQuestionnaire(){
        this._nombreQuestionnaire --;
    }
    
}
