import 'jest-extended';
import { Etudiant } from '../../src/core/Etudiant';

let etudiant;

beforeAll(() => {
    etudiant = new Etudiant('id');
});

describe('Test Etudiant', () => {
    it('test', () => {
        expect(etudiant.id).toBe('id');
    });
});