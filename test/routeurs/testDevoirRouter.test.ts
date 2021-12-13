import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { Etudiant } from '../../src/core/Etudiant';

const request = supertest(app);

beforeAll(async() => {
    const response = await request.get('/api/sga/enseignant/authEnseignant/cc-vincent.lacasse@etsmtl.ca/pass');
    expect(response.status).toBe(200);

    const listeEtudiants:Etudiant[] = [];
    listeEtudiants.push(new Etudiant('etudiant1'));
    const response0 = await request.get('/api/sga/cours/addCours').query({group_id: 'S20213-LOG121-02', listeEtudiants: listeEtudiants, token: '9c4149a3e22bf75971083a2f86991fba'});
    expect(response0.status).toBe(201);
});

describe('test DevoirRouter', () => {
    it('test postCoursSelectionne', async() => {
        const response0 = await request.get('/api/sga/casUtilisations/loadCasAjouterDevoir');
        expect(response0.status).toBe(200);
        const response = await request.get('/api/sga/devoir/postCoursSelectionne').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
        expect(response.body.listeDevoir).toEqual([]);
    });
    it('test addDevoir', async() => {
        const response = await request.get('/api/sga/devoir/addDevoir').query({group_id:'S20213-LOG121-02',nom:'nom',description:'description',dateDebut:'dateD',dateFin:'dateF',noteMaximale:100,etatVisible:true,token:'9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
        const responseA = await request.get('/api/sga/devoir/addDevoir').query({group_id:'S20213-LOG121-02',nom:'nom1',description:'description1',dateDebut:'dateD1',dateFin:'dateF1',noteMaximale:106,etatVisible:false,token:'9c4149a3e22bf75971083a2f86991fba'});
        expect(responseA.status).toBe(200);
        expect(responseA.body.message).toBe('Success');
        const response1 = await request.get('/api/sga/devoir/postCoursSelectionne').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response1.body.listeDevoir[0]._etatVisible).toBe(true);
        expect(response1.body.listeDevoir[1]._etatVisible).toBe(false);
    });
    
});