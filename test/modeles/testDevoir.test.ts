import 'jest-extended';
import { Devoir } from '../../src/core/Devoir';

let devoir;

beforeAll(() => {
    devoir = new Devoir('nom','description',100,'dateD','dateF',false);
});

describe('test devoir', () => {
    it('test constructeur', () => {
        expect(devoir.nom).toBe('nom');
        expect(devoir.description).toBe('description');
        expect(devoir.noteMaximale).toBe(100);
        expect(devoir.dateDebut).toBe('dateD');
        expect(devoir.dateFin).toBe('dateF');
        expect(devoir.etatVisible).toBe(false);
    });
});