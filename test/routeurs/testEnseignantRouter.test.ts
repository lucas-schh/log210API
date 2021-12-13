import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { universite } from '../../src/core/universite';

const request = supertest(app);

describe('Test EnseignantRouter', () => {
    it('test authEnseignant', async () => {
        const response1 = await request.get('/api/sga/enseignant/authEnseignant/Rick Astley/rickNroll');
        expect(response1.status).toBe(200);
        const response = await request.get('/api/sga/enseignant/authEnseignant/cc-vincent.lacasse@etsmtl.ca/pass');
        expect(response.status).toBe(200);
        expect(universite.getEnseignant('9c4149a3e22bf75971083a2f86991fba').id).toBe('cc-vincent.lacasse@etsmtl.ca');
    });
    it('test recupererEnseignantAvecJeton', async () => {
        const response = await request.get('/api/sga/enseignant/recupererEnseignantAvecToken').query({token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.id._id).toBe('cc-vincent.lacasse@etsmtl.ca');
    });
});