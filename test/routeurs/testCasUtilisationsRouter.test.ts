import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';

const request = supertest(app);

describe('test casUtilisationsRouter', () => {
    it('test loadCasAjouterCours', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasAjouterCours');
        expect(response.status).toBe(200);
    });
    it('test loadCasRecupererCours', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasRecupererCours');
        expect(response.status).toBe(200);
    });
    it('test loadCasRetirerCours', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasRetirerCours');
        expect(response.status).toBe(200);
    });
    it('test loadCasAjouterQuestion', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasAjouterQuestion');
        expect(response.status).toBe(200);
    });
    it('test loadCasRecupererQuestion', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasRecupererQuestion');
        expect(response.status).toBe(200);
    });
    it('test loadCasModifierQuestion', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasModifierQuestion');
        expect(response.status).toBe(200);
    });
    it('test loadCasSupprimerQuestion', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasSupprimerQuestion');
        expect(response.status).toBe(200);
    });
    it('test loadCasAjouterQuestionnaire', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasAjouterQuestionnaire');
        expect(response.status).toBe(200);
    });
    it('test loadCasRecupererQuestionnaire', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasRecupererQuestionnaire');
        expect(response.status).toBe(200);
    });
    it('test loadCasModifierQuestionnaire', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasModifierQuestionnaire');
        expect(response.status).toBe(200);
    });
    it('test loadCasSupprimerQuestionnaire', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasSupprimerQuestionnaire');
        expect(response.status).toBe(200);
    });
    it('test loadCasAjouterDevoir', async() => {
        const response = await request.get('/api/sga/casUtilisations/loadCasAjouterDevoir');
        expect(response.status).toBe(200);
    });
});