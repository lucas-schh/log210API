import 'jest-extended';
import { Enseignant } from '../../src/core/Enseignant';
import { Cours } from '../../src/core/Cours';
import { Devoir } from '../../src/core/Devoir';

let enseignant;

beforeAll(() => {
    enseignant = new Enseignant('Lacasse', 'Vincent', 'cc-vincent.lacasse@etsmtl.ca', '9c4149a3e22bf75971083a2f86991fba', null);
});

describe('Test Enseignant', () => {
    it('test constructeur', () => {
        expect(enseignant.prenom).toBe('Vincent');
        expect(enseignant.nom).toBe('Lacasse');
        expect(enseignant.id).toBe('cc-vincent.lacasse@etsmtl.ca');
        expect(enseignant.token).toBe('9c4149a3e22bf75971083a2f86991fba');
    });
    it('test getter et setter', () => {
        enseignant.prenom = 'Rick';
        enseignant.nom = 'Astley';
        enseignant.id = "We're no strangers to love";
        enseignant.token = "you know the rules and so do I";
        
        const map = new Map();
        const cours = new Cours('LOG121', 'none', 'Conception orientée objet', enseignant, null, null, null,'day','hours','activity','mode','local','teacher_id');
        map.set(cours.id, cours);
        
        enseignant.listeCours = map;

        expect(enseignant.prenom).toBe('Rick');
        expect(enseignant.nom).toBe('Astley');
        expect(enseignant.id).toBe("We're no strangers to love");
        expect(enseignant.token).toBe("you know the rules and so do I");

        expect(enseignant.listeCours).toBe(map);
        expect(enseignant.listeCours.get(cours.id)).toBe(cours);
    });
    it('test ajoutCours', () => {
        const cours = new Cours('id', 'qqch', 'nom', null, null, null, null,'day1','hours1','activity1','mode1','local1','teacher_id1');
        enseignant.listeCours = null;
        enseignant.ajoutCours(cours);
        expect(enseignant.listeCours.get(cours.id)).toBe(cours);
        const autreCours = new Cours('id1', 'lol', 'haaa', null, null, null, null,'day2','hours2','activity2','mode2','local2','teacher_id2');
        enseignant.ajoutCours(autreCours);
        expect(enseignant.listeCours.get(autreCours.id)).toBe(autreCours);
    });
    it('test addQuestion', () => {
        enseignant.listeCours.get('id').addQuestion('type','tags','nom','enonce',false,'retro1','retro2');
        enseignant.listeCours.get('id').createQuestionnaire('nom', 'description', true);
        const rep = enseignant.addQuestion('id', ['nom'], 'nom');
        expect(rep).toBe('Questions ajoutées au questionnaire');
        expect(enseignant.listeCours.get('id').listeQuestionnaire.get('nom').listeQuestion[0].verite).toBe(false);
    });
    it('test ajoutDevoir', () => {
        const devoir = new Devoir('nom','description',100,'dateD','dateF',false);
        enseignant.ajoutDevoir('id',devoir);
        expect(enseignant.listeCours.get('id').listeDevoir.get('nom')).toBe(devoir);
    });
});