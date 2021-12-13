import 'jest-extended';
import { Cours } from '../../src/core/Cours';
import { Enseignant } from '../../src/core/Enseignant';
import {ControleurEnseignant} from '../../src/core/ControleurEnseignant';

let cours;
let enseignant;
let controleur;

beforeAll(() => {
    enseignant = new Enseignant('Vincent', 'Lacasse', 'cc-vincent.lacasse@etsmtl.ca', '9c4149a3e22bf75971083a2f86991fba', null);
    cours = new Cours('LOG121', 'none', 'Conception orientée objet', enseignant, null, null, null, null, null, null, null,null, enseignant.id);
    controleur = new ControleurEnseignant();
});

describe('Test ControleurEnseignant', () => {
    it('test auth', async() => {
        let newEns = await controleur.authEnseignant('cc-vincent.lacasse@etsmtl.ca', 'pass123');
        expect(newEns.id).toBe('cc-vincent.lacasse@etsmtl.ca');
    });
    it('test recupererEnseignantAvecJeton', async() => {
        let newId = await controleur.recupererEnseignantAvecToken('9c4149a3e22bf75971083a2f86991fba');
        expect(newId.id).toBe('cc-vincent.lacasse@etsmtl.ca');
    });
});

