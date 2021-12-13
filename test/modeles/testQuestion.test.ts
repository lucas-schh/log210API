import 'jest-extended';
import { Question } from '../../src/core/Question';
import { Questionnaire } from '../../src/core/Questionnaire';

let question;
let questionnaire;

beforeAll(() => {
    question = new Question('type', 'tags', 'nom', 'enonce', true, 'retroaction v', 'retroaction f');
});

describe('Test Question', () => {
    it('test constructeur', () => {
        expect(question.type).toBe('type');
        expect(question.tags).toBe('tags');
        expect(question.nom).toBe('nom');
        expect(question.enonce).toBe('enonce');
        expect(question.verite).toBe(true);
        expect(question.retroaction_vrai).toBe('retroaction v');
        expect(question.retroaction_faux).toBe('retroaction f');
    });
    it('test getter et setter', () => {
        question.type = 'new type';
        question.tags = 'new tags';
        question.nom = 'new nom';
        question.enonce = 'new enonce';
        question.verite = false;
        question.retroaction_vrai = 'new retroaction v';
        question.retroaction_faux = 'new retroaction f';
        questionnaire = new Questionnaire('nom','description',false,[],null);
        const listeQuestionnaire = new Array<Questionnaire>();
        listeQuestionnaire.push(questionnaire);
        question.listeQuestionnaire = listeQuestionnaire;

        expect(question.type).toBe('new type');
        expect(question.tags).toBe('new tags');
        expect(question.nom).toBe('new nom');
        expect(question.enonce).toBe('new enonce');
        expect(question.verite).toBe(false);
        expect(question.retroaction_vrai).toBe('new retroaction v');
        expect(question.retroaction_faux).toBe('new retroaction f');
        expect(question.listeQuestionnaire[0]).toBe(questionnaire);
        expect(question.listeQuestionnaire).toBe(listeQuestionnaire);
    });
    it('test nbQuestionnaire', () => {
        question.nombreQuestionnaire = 0;
        question.augmenteNbQuestionnaire();
        expect(question.nombreQuestionnaire).toBe(1);
        question.diminueNbQuestionnaire();
        expect(question.nombreQuestionnaire).toBe(0);
    });
    /*
    it('test deleteQuestionnaire', () => {
        question.deleteQuestionnaire(new Questionnaire('nom1','description',true,null,null));
        expect(question.listeQuestionnaire[0]).toBe(questionnaire);
        question.deleteQuestionnaire(questionnaire);
        expect(question.listeQuestionnaire[0]).toBe(undefined);
    });
    */
});