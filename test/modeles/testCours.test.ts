import 'jest-extended';
import { Cours } from '../../src/core/Cours';
import { Enseignant } from '../../src/core/Enseignant';
import { Etudiant } from '../../src/core/Etudiant';
import { Question } from '../../src/core/Question';
import { Questionnaire } from '../../src/core/Questionnaire';

let cours;
let enseignant;

beforeAll(() => {
    enseignant = new Enseignant('Vincent', 'Lacasse', 'cc-vincent.lacasse@etsmtl.ca', '9c4149a3e22bf75971083a2f86991fba', null);
    cours = new Cours('LOG121', 'none', 'Conception orientée objet', enseignant, null, null, null,'day','hours','activity','mode','local','teacher_id');
});

describe('Test Cours', () => {
    it('test constructeur', () => {
        expect(cours.id).toBe('LOG121');
        expect(cours.prealables).toBe('none');
        expect(cours.titre).toBe('Conception orientée objet');
        expect(cours.enseignant).toBe(enseignant);
    });
    it('test getter et setter', () => {
        cours.id = 'LOL101';
        cours.titre = 'Climb lol';
        cours.prealables = 'gamer';

        const ens = new Enseignant('Rick', 'Astley', 'Rick roll', 'Never gonna give you up', null)
        cours.enseignant = ens;

        const listeEtu = [];
        cours.listeEtudiants = listeEtu;

        const listeQue = new Map<String, Question>();
        cours.listeQuestions = listeQue;

        const listeQuestionnaire = new Map<String, Questionnaire>();
        cours.listeQuestionnaire = listeQuestionnaire;

        expect(cours.id).toBe('LOL101');
        expect(cours.titre).toBe('Climb lol');
        expect(cours.prealables).toBe('gamer');
        expect(cours.enseignant).toBe(ens);
        expect(cours.listeEtudiants).toBe(listeEtu);
        expect(cours.listeQuestions).toBe(listeQue);
        expect(cours.listeQuestionnaire).toBe(listeQuestionnaire);
    });
    it('test addQuestion', () => {
        cours.listeQuestions = null;
        cours.addQuestion('type','tags','nom','enonce',false,'retroaction_reponse_vrai','retroaction_reponse_fausse');
        expect(cours.listeQuestions.get('nom').nom).toBe('nom');
        cours.addQuestion('type','tags','nom1','enonce',true,'retro1','retro2');
        expect(cours.listeQuestions.get('nom1').nom).toBe('nom1');
    });
    it('test addEtudiant', () => {
        cours.listeEtudiants = null;
        const etudiant1 = new Etudiant('id');
        cours.addEtudiant(etudiant1);
        expect(cours.listeEtudiants[0].id).toBe('id');

        const etudiant2 = new Etudiant('123');
        cours.addEtudiant(etudiant2);
        expect(cours.listeEtudiants[1].id).toBe('123');
    });
    it('test createQuestionnaire', () => {
        const rep = cours.createQuestionnaire('nom', 'description', false);
        expect(rep).toBe('Questionnaire créé');
        expect(cours.listeQuestionnaire.get('nom').etatActif).toBe(false);
    });
});