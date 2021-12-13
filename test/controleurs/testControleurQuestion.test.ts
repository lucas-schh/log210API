import 'jest-extended';
import { Cours } from '../../src/core/Cours';
import { Enseignant } from '../../src/core/Enseignant';
import {ControleurQuestion} from '../../src/core/ControleurQuestion';
import { universite } from '../../src/core/Universite';
import { Etudiant } from '../../src/core/Etudiant';
import { Question } from '../../src/core/Question';

let cours;
let enseignant;
let controleur;
let listeQuestions;
let q1;
let q2;

beforeAll(() => {
    enseignant = new Enseignant('Vincent', 'Lacasse', 'cc-vincent.lacasse@etsmtl.ca', '9c4149a3e22bf75971083a2f86991fba', null);
    cours = new Cours('LOG121', 'none', 'Conception orientée objet', enseignant, null, null, null, null, null, null, null,null, enseignant.id);
    controleur = new ControleurQuestion();
    q1 = new Question('QCM', null, 'BOT', 'Que pensez-vous des pingouins?', true, 'Ils sont majestueux', 'Ils sont nuls');
    q2 = new Question('QCM', null, 'Question bonus', 'Chat ou chien', true, 'Chat', 'Chien');
    listeQuestions = [q1, q2];
    cours.listeQuestions = listeQuestions;
    universite.ajoutEnseignant(enseignant);
    enseignant.ajoutCours(cours);
});

describe('Test ControleurQuestion', () => {
    it('test postCoursSelectionne', async() => {
        let questionsAttendues = controleur.postCoursSelectionne('LOG121', '9c4149a3e22bf75971083a2f86991fba');
        expect(questionsAttendues).toEqual(listeQuestions); 
    });
    it('test setQuestion', async() =>{
        
    })
});