import { Etudiant } from './Etudiant';
import { Enseignant } from './Enseignant';
import { Question } from './Question';
import { Questionnaire } from './Questionnaire';
import { Devoir } from './Devoir';

export class Cours {
    // classe inspirée de la classe conceptuelle (du MDD)
    private _id: string;
    private _titre: string;
    private _prealables: string;
    private _enseignant: Enseignant;
    private _listeEtudiants: Etudiant[];
    private _listeQuestion: Map<String, Question>;
    private _listeQuestionnaire : Map<String, Questionnaire>
    private _listeDevoir : Map<string, Devoir> = new Map<string, Devoir>();

    private _day: string;
    private _hours: string;
    private _activity: string;
    private _mode: string;
    private _local: string;
    private _teacher_id: string;

    constructor(id: string, 
                prealables: string, 
                titre: string, 
                enseignant : Enseignant, 
                listeEtudiants : Etudiant[], 
                listeQuestion : Map<String, Question>, 
                listeQuestionnaire : Map<String, Questionnaire>,
                day: string,
                hours: string,
                activity: string,
                mode: string,
                local: string,
                teacher_id: string
                ) {
        this._id = id;
        this._titre = titre;
        this._prealables = prealables;
        this._enseignant = enseignant;
        this._listeEtudiants = listeEtudiants;
        this._listeQuestion = listeQuestion;
        this._listeQuestionnaire = new Map();
        this._listeDevoir = new Map();
        this._day = day;
        this._hours = hours;
        this._activity = activity;
        this._mode = mode;
        this._local = local;
        this._teacher_id = teacher_id;
    }

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get titre() {
        return this._titre;
    }

    set titre(titre:string) {
        this._titre = titre;
    }

    get prealables() {
        return this._prealables;
    }

    set prealables(prealables:string) {
        this._prealables = prealables;
    }

    get enseignant() {
        return this._enseignant;
    }

    set enseignant(enseignant:Enseignant) {
        this._enseignant = enseignant;
    }

    get listeEtudiants() {
        return this._listeEtudiants;
    }

    set listeEtudiants(listeEtudiants: Etudiant[]) {
        this._listeEtudiants = listeEtudiants;
    }

    get listeQuestions(){
        return this._listeQuestion;
    }

    set listeQuestions(listeQuestions : Map<String, Question>){
        this._listeQuestion = listeQuestions;
    }

    get listeQuestionnaire(){
        return this._listeQuestionnaire;
    }

    set listeQuestionnaire(listeQuestionnaire : Map<String, Questionnaire>){
        this._listeQuestionnaire=listeQuestionnaire;
    }

    get listeDevoir(){
        return this._listeDevoir;
    }


    get day(){
        return this._day
    }

    set day (day : string){
        this._day=day;
    }

    get hours(){
        return this._hours
    }
    set hours (hours : string){
        this._hours=hours;
    }

    get activity(){
        return this._activity
    }
    set activity (activity : string){
        this._activity=activity;
    }
    get mode(){
        return this._mode
    }
    set mode (mode : string){
        this._mode=mode;
    }
    get local(){
        return this._local
    }
    set local (local : string){
        this._local=local;
    }
    get teacher_id(){
        return this._teacher_id
    }
    set teacher_id (teacher_id : string){
        this._teacher_id=teacher_id;
    }






    addQuestion(type:string,tags:string,nom:string,
        enonce:string,verite:boolean,retroaction_reponse_vrai:string,
        retroaction_reponse_fausse:string) {
        if(this._listeQuestion == null){
                this._listeQuestion = new Map();
        }
        this.listeQuestions.set(nom, new Question(type,tags,nom,enonce,verite,retroaction_reponse_vrai,retroaction_reponse_fausse));
    }

    addEtudiant(etudiant : Etudiant){
        if(this._listeEtudiants == null){
            this._listeEtudiants = [];
        }
        this._listeEtudiants.push(etudiant)
    }

    createQuestionnaire(nom : string, description : string, etatActif : boolean) {
        let questionnaire = new Questionnaire(nom, description, etatActif, null, null);
        this._listeQuestionnaire.set(nom, questionnaire);
        return "Questionnaire créé"
    }

}