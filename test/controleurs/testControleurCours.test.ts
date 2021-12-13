import 'jest-extended';
import { Cours } from '../../src/core/Cours';
import { Enseignant } from '../../src/core/Enseignant';
import {ControleurCours} from '../../src/core/ControleurCours';
import { universite } from '../../src/core/Universite';
import { Etudiant } from '../../src/core/Etudiant';

let cours;
let enseignant;
let controleur;

beforeAll(() => {
    enseignant = new Enseignant('Vincent', 'Lacasse', 'cc-vincent.lacasse@etsmtl.ca', '9c4149a3e22bf75971083a2f86991fba', null);
    cours = new Cours('LOG121', 'none', 'Conception orientée objet', enseignant, null, null, null, null, null, null, null,null, enseignant.id);
    controleur = new ControleurCours();
    universite.ajoutEnseignant(enseignant);
});

describe('Test ControleurCours', () => {
    it('test getInfoGroupCours', async() => {
        let newCours = await controleur.getInfoGroupeCours('LOG120', '9c4149a3e22bf75971083a2f86991fba');
        expect(newCours).toBe(undefined);   
        let newCours2 = await controleur.getInfoGroupeCours('S20213-LOG240-02', '9c4149a3e22bf75971083a2f86991fba');
        expect(newCours2.id).toBe('LOG240');
    });
    it('test recupererEtudiantsGroupeCours', async() => {
        let listeEtudiantsResult = await controleur.recupererEtudiantsGroupeCours('S20213-LOG240-02','9c4149a3e22bf75971083a2f86991fba');
        expect(listeEtudiantsResult).toEqual(["first_name.last_name+8@gmail.com", "first_name.last_name+24@gmail.com", "first_name.last_name+40@gmail.com", "first_name.last_name+56@gmail.com", "first_name.last_name+72@gmail.com", "first_name.last_name+88@gmail.com"]);
    })
    it('test addCours', async() => {
        controleur.addCours('S20213-LOG240-02', [{"_id": "first_name.last_name+8@gmail.com"}, {"_id": "first_name.last_name+24@gmail.com"}, {"_id": "first_name.last_name+40@gmail.com"}, {"_id": "first_name.last_name+56@gmail.com"}, {"_id": "first_name.last_name+72@gmail.com"}, {"_id": "first_name.last_name+88@gmail.com"}], '9c4149a3e22bf75971083a2f86991fba');
        let coursAttendu = await controleur.getInfoGroupeCours('S20213-LOG240-02', '9c4149a3e22bf75971083a2f86991fba');
        expect(coursAttendu.id).toBe('LOG240');
    });
    

});

