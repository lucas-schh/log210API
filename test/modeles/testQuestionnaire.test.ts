import 'jest-extended';
import { Etudiant } from '../../src/core/Etudiant';
import { Question } from '../../src/core/Question';
import { Questionnaire } from '../../src/core/Questionnaire';

let questionnaire;

beforeAll(() => {
    questionnaire = new Questionnaire('nom','description',false,null,null);
});

describe('Test Questionnaire', () => {
    it('test constructeur', () => {
        expect(questionnaire.nom).toBe('nom');
        expect(questionnaire.description).toBe('description');
        expect(questionnaire.etatActif).toBe(false);
        expect(questionnaire.listeQuestion).toBe(null);
        expect(questionnaire.listeEtudiant).toBe(null);
    });
    it('test getter et setter', () => {
        questionnaire.nom = 'new nom';
        questionnaire.description = 'new description';
        questionnaire.etatActif = true;

        const listeQuestion = new Array<Question>();
        const listeEtudiant = new Map<number, Etudiant>();

        questionnaire.listeQuestion = listeQuestion;
        questionnaire.listeEtudiant = listeEtudiant;

        expect(questionnaire.nom).toBe('new nom');
        expect(questionnaire.description).toBe('new description');
        expect(questionnaire.etatActif).toBe(true);
        expect(questionnaire.listeQuestion).toBe(listeQuestion);
        expect(questionnaire.listeEtudiant).toBe(listeEtudiant);
    });
    it('test addQuestion', () => {
        questionnaire.listeQuestion = new Array<Question>();
        const question = new Question('type', 'tags', 'nom', 'enonce', true, 'retroaction v', 'retroaction f');
        questionnaire.addQuestion(question);
        expect(questionnaire.listeQuestion[0]).toBe(question);
    });
});