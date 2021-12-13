import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';
import { Etudiant } from '../../src/core/Etudiant';
import { Question } from '../../src/core/Question';

const request = supertest(app);

beforeAll(async() => {
    const response = await request.get('/api/sga/enseignant/authEnseignant/cc-vincent.lacasse@etsmtl.ca/pass');
    expect(response.status).toBe(200);

    const listeEtudiants:Etudiant[] = [];
    listeEtudiants.push(new Etudiant('etudiant1'));
    const response0 = await request.get('/api/sga/cours/addCours').query({group_id: 'S20213-LOG121-02', listeEtudiants: listeEtudiants, token: '9c4149a3e22bf75971083a2f86991fba'});
    expect(response0.status).toBe(201);
});

describe('test QuestionnaireRouter', () => {
    it('test postCoursSelectionneQuestionnaire', async() => {
        const response0 = await request.get('/api/sga/casUtilisations/loadCasAjouterQuestionnaire');
        expect(response0.status).toBe(200);
        const response = await request.get('/api/sga/questionnaire/postCoursSelectionneQuestionnaire').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.listeQuestionnaire).toEqual([]);
    });
    it('test createQuestionnaire', async() => {
        const response = await request.get('/api/sga/questionnaire/createQuestionnaire').query({group_id:'S20213-LOG121-02',nom:'nom',description:'description',etatActif:true,token:'9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        const responseA = await request.get('/api/sga/questionnaire/createQuestionnaire').query({group_id:'S20213-LOG121-02',nom:'nom1',description:'description1',etatActif:false,token:'9c4149a3e22bf75971083a2f86991fba'});
        expect(responseA.status).toBe(201);
        expect(responseA.body.message).toBe('Success');
        const response1 = await request.get('/api/sga/questionnaire/postCoursSelectionneQuestionnaire').query({group_id: 'S20213-LOG121-02', token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response1.status).toBe(201);
        expect(response1.body.listeQuestionnaire[0]._etatActif).toBe(true);
        expect(response1.body.listeQuestionnaire[1]._etatActif).toBe(false);
    });
    it('test postTypeQuestion', async () => {
        const response = await request.get('/api/sga/questionnaire/postTypeQuestion').query({group_id:'S20213-LOG121-02',typeSelectionne:'type',token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.listeTypeSelectionne).toEqual([]);
    });
    it('test postQuestionnaireSelectionne', async () => {
        const response = await request.get('/api/sga/questionnaire/postQuestionnaireSelectionne').query({group_id:'S20213-LOG121-02',questionnaireSelectionne:'nom',token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
        expect(response.body.questionnaire._etatActif).toBe(true);
    });
    it('test addQuestion', async () => {
        const question = new Question('type', 'tags', 'nom', 'enonce', true, 'retroaction v', 'retroaction f');
        const response = await request.get('/api/sga/questionnaire/addQuestion').query({group_id: 'S20213-LOG121-02',listeQuestions:[question],questionnaire:'nom'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
    });
    it('test modifierQuestionnaire', async () => {
        const response = await request.get('/api/sga/questionnaire/modifierQuestionnaire').query({group_id: 'S20213-LOG121-02',nomQuestionnaire:'nom',nouveauNomQuestionnaire:'nouvNom',nouvelleDescriptionQuestionnaire:'nouvDescription',nouveauEtatActif:false,nouvelleListeQuestion:[],token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
    });
    it('test supprimerQuestionnaire', async() => {
        const response = await request.get('/api/sga/questionnaire/supprimerQuestionnaire').query({group_id:'S20213-LOG121-02',nomQuestionnaire:'nouvNom',token: '9c4149a3e22bf75971083a2f86991fba'});
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Success');
    });
});