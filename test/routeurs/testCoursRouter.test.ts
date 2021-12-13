import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { Etudiant } from '../../src/core/Etudiant';

const request = supertest(app);

beforeAll(async() => {
    const response = await request.get('/api/sga/enseignant/authEnseignant/cc-vincent.lacasse@etsmtl.ca/pass');
    expect(response.status).toBe(200);
});

describe('Test CoursRouter', () => {
    it('test getInfoGroupeCours', async() => {
        const response = await request.get('/api/sga/cours/getInfoGroupeCours').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.cours._id).toBe('LOG121');
    });
    it('test getGroupeCoursSGB', async() => {
        const response = await request.get('/api/sga/cours/getGroupeCoursSGB').query({token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.listeGroupeCours[0]).toBe('S20213-LOG121-02');
    });
    it('test recupererEtudiantsGroupeCours', async() => {
        const response = await request.get('/api/sga/cours/recupererEtudiantsGroupeCours').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.listeEtudiants[0]).toBe('first_name.last_name+2@gmail.com');
    });
    it('test addCours', async() => {
        const listeEtudiants:Etudiant[] = [];
        listeEtudiants.push(new Etudiant('etudiant1'));
        const response = await request.get('/api/sga/cours/addCours').query({group_id: 'S20213-LOG121-02', listeEtudiants: listeEtudiants, token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
    });
    it('test getCoursUtilisateur', async() => {
        await request.get('/api/sga/casUtilisations/loadCasRecupererCours');
        const response = await request.get('/api/sga/cours/getCoursUtilisateur').query({token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        //expect(response.body.listeCours[0]._id).toBe('S20213-LOG121-02');
    });
    it('test deleteCoursChoisi', async() => {
        const response = await request.get('/api/sga/cours/deleteCoursChoisi').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
    });
});