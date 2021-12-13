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

describe('test QuestionRouter', () => {
    it('test postCoursSelectionne', async() => {
        const response0 = await request.get('/api/sga/casUtilisations/loadCasAjouterQuestion');
        expect(response0.status).toBe(200);
        const response = await request.get('/api/sga/question/postCoursSelectionne').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
        expect(response.body.questions).toEqual([]);
    });
    it('test setQuestion', async() => {
        const response = await request.get('/api/sga/question/setQuestion').query({cours:'S20213-LOG121-02',type:'type',tags:'tags',nom:'nom',enonce:'enonce',verite:true,retroaction_reponse_vrai:'retro1',retroaction_reponse_fausse:'retro2',token:'9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        const responseA = await request.get('/api/sga/question/setQuestion').query({cours:'S20213-LOG121-02',type:'type',tags:'tags',nom:'nomDiff',enonce:'enonce',verite:false,retroaction_reponse_vrai:'retro1',retroaction_reponse_fausse:'retro2',token:'9c4149a3e22bf75971083a2f86991fba'});
        expect(responseA.status).toBe(201);
        expect(responseA.body.message).toBe('Success');
        const response1 = await request.get('/api/sga/question/postCoursSelectionne').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response1.body.questions[0]._verite).toBe(true);
        expect(response1.body.questions[1]._verite).toBe(false);
    });
    it('test modifierQuestion', async () => {
        const response = await request.get('/api/sga/question/modifierQuestion').query({questionOriginale:'nom',type:'type2',tags:'tags2',nom:'nomDiff2',enonce:'enonce',verite:false,retroaction_reponse_vrai:'retro3',retroaction_reponse_fausse:'retro4',token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        const response1 = await request.get('/api/sga/question/modifierQuestion').query({questionOriginale:'nomDiff2',type:'type2',tags:'tags2',nom:'nomDiff2',enonce:'enonce',verite:true,retroaction_reponse_vrai:'retro3',retroaction_reponse_fausse:'retro4',token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response1.status).toBe(201);
        expect(response1.body.message).toBe('Success');
    });
    it('test supprimerQuestion', async () => {
        const response = await request.get('/api/sga/question/supprimerQuestion').query({nomQuestion:'nomDiff',token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
    });
});