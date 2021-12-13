import 'jest-extended';
import { Cours } from '../../src/core/Cours';
import { Enseignant } from '../../src/core/Enseignant';
import { Etudiant } from '../../src/core/Etudiant';
import { Universite } from '../../src/core/Universite';

let universite;
let listeEtu = new Map<string,Etudiant>();
let listeEns = new Map<string,Enseignant>();
//let listeCou = new Map<string,Cours>();

beforeAll(() => {
    universite = new Universite(listeEtu,listeEns/*,listeCou*/); 
});

describe('Test Universite', () => {
    it('test constructeur', () => {
        expect(universite.listeEtudiants).toBe(listeEtu);
        expect(universite.listeEnseignant).toBe(listeEns);
        //expect(universite.listeCours).toBe(listeCou);
    });
    it('test getter et setter', () => {
        const nouvListeEtu = new Map<string,Etudiant>();
        const nouvListeEns = new Map<string,Enseignant>();
        //const nouvListeCou = new Map<string,Cours>();
        //const utilisateur = new Enseignant('nom','prenom','id','token',null);

        universite.listeEtudiants = nouvListeEtu;
        universite.listeEnseignant = nouvListeEns;
        //universite.listeCours = nouvListeCou;
        //universite.utilisateur = utilisateur;

        expect(universite.listeEtudiants).toBe(nouvListeEtu);
        expect(universite.listeEnseignant).toBe(nouvListeEns);
        //expect(universite.listeCours).toBe(nouvListeCou);
        //expect(universite.utilisateur).toBe(utilisateur);
    });
    /*
    it('test ajoutCours et getCours', () => {
        const cours = new Cours('id','prealable','titre',null,null,null,null,'day','hours','activity','mode','local','teacher_id');
        universite.ajoutCours(cours);
        expect(universite.getCours('id')).toBe(cours);
    });
    */
    it('test getListeGroupeCours', () => {
        expect(universite.getListeGroupeCours(new Enseignant('nom','prenom','id','token',null))).toBe(null);
    });
    /*
    it('test setQuestion', () => {
        universite.setQuestion('id','type','tags','nom','enonce',false,'retro1','retro2');
        expect(universite.getCours('id').listeQuestions.get('nom').nom).toBe('nom');
    });
    */
});