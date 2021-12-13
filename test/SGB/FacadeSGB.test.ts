import 'jest-extended';
import { FacadeSGB } from '../../src/core/SGB/FacadeSGB'

describe('Test FacadeSGB', () => {
    it('ping test', async () => {
        const json = JSON.parse(await FacadeSGB.ping());
        expect(json.message).toBe('Success');
    });
    it('cours/all test', async () => {
        const json = JSON.parse(await FacadeSGB.getListeCours());
        expect(json.message).toBe('Success');

        expect(json.data[0].id).toBe('LOG121');
        expect(json.data[0].prealable).toBe('none');
        expect(json.data[0].titre).toBe('Conception orientée object');

        //expect(json.data[2].prealable).toBe(undefined);

        expect(json.data[5].id).toBe('LOG430');
        expect(json.data[5].prealable).toBe('LOG210');
        expect(json.data[5].titre).toBe('Architecture logicielle');
    });
    it('grade/insert test', async () => {
        const json = JSON.parse(await FacadeSGB.setNote('first_name.last_name+1@gmail.com', 'S20213-LOG121-01', 'Quiz', 1, 97));
        expect(json.message).toBe('Success');

        expect(json.data).toBe('first_name.last_name+1@gmail.com');
    });
    it('grade/group test', async () => {
        const json = JSON.parse(await FacadeSGB.getListeNotesGroupe('S20213-LOG121-01'));
        expect(json.message).toBe('Success');

        expect(json.data[0].student_id).toBe('first_name.last_name+1@gmail.com');
        expect(json.data[0].group_id).toBe('S20213-LOG121-01');
        expect(json.data[0].type).toBe("Quiz");
        expect(json.data[0].type_id).toBe("1");
        expect(json.data[0].note).toBe("97");
    });
    it('grade/student test', async () => {
        const json = JSON.parse(await FacadeSGB.getListeNotesEtudiant('first_name.last_name+1@gmail.com'));
        expect(json.message).toBe('Success');

        expect(json.data[0].student_id).toBe('first_name.last_name+1@gmail.com');
        expect(json.data[0].group_id).toBe('S20213-LOG121-01');
        expect(json.data[0].type).toBe("Quiz");
        expect(json.data[0].type_id).toBe("1");
        expect(json.data[0].note).toBe("97");
    });
    it('schedule/all test', async () => {
        const json = JSON.parse(await FacadeSGB.getListeSchedules());
        expect(json.message).toBe('Success');

        expect(json.data[0].group_id).toBe('S20213-LOG121-01');
        expect(json.data[0].day).toBe('Mer');
        expect(json.data[0].hours).toBe('08:30-12:00');
        expect(json.data[0].activity).toBe('C');
        expect(json.data[0].mode).toBe('P');
        expect(json.data[0].local).toBe('D-4012');
        expect(json.data[0].teacher_id).toBe('');

        expect(json.data[40].group_id).toBe('S20213-LOG430-02');
        expect(json.data[40].day).toBe('Mar');
        expect(json.data[40].hours).toBe('18:00-21:00');
        expect(json.data[40].activity).toBe('Labo B');
        expect(json.data[40].mode).toBe('D');
        expect(json.data[40].local).toBe('A-3450');
        expect(json.data[40].teacher_id).toBe('');
    });
    it('semester/all test', async () => {
        const json = JSON.parse(await FacadeSGB.getListeSemestres());
        expect(json.message).toBe('Success');

        expect(json.data[0].id).toBe('S20211');
        expect(json.data[0].name).toBe('Hiver 2021');
        expect(json.data[0].start).toBe('2021-12-27');
        expect(json.data[0].end).toBe('2021-04-24');

        expect(json.data[2].id).toBe('S20213');
        expect(json.data[2].name).toBe('Automne 2021');
        expect(json.data[2].start).toBe('2021-08-29');
        expect(json.data[2].end).toBe('2021-12-25');
    });
    it('student/all test', async () => {
        const json = JSON.parse(await FacadeSGB.getListeEtudiants());
        expect(json.message).toBe('Success');

        expect(json.data[0].first_name).toBe('first_name_1');
        expect(json.data[0].last_name).toBe('last_name_1');
        expect(json.data[0].id).toBe('first_name.last_name+1@gmail.com');

        expect(json.data[99].first_name).toBe('first_name_100');
        expect(json.data[99].last_name).toBe('last_name_100');
        expect(json.data[99].id).toBe('first_name.last_name+100@gmail.com');
    });
    it('student/fromtoken test', async () => {
        const json = JSON.parse(await FacadeSGB.getEtudiantFromToken('e649905a37aa58c397647862118e3474'));
        expect(json.message).toBe('Success');

        expect(json.user.first_name).toBe('first_name_1');
        expect(json.user.last_name).toBe('last_name_1');
        expect(json.user.id).toBe('first_name.last_name+1@gmail.com');
    });
    it('student/groupstudent test', async () => {
        const json = JSON.parse(await FacadeSGB.getLienEtudiantsGroupe());
        expect(json.message).toBe('Success');

        expect(json.data[0].group_id).toBe('S20213-LOG121-01');
        expect(json.data[0].student_id).toBe('first_name.last_name+1@gmail.com');

        expect(json.data[99].group_id).toBe('S20213-LOG210-01');
        expect(json.data[99].student_id).toBe('first_name.last_name+100@gmail.com');
    });
    it('student/login test', async () => {
        const json = JSON.parse(await FacadeSGB.authEtudiant('first_name.last_name+1@gmail.com', 'password'));
        expect(json.message).toBe('Success');

        expect(json.token).toBe('e649905a37aa58c397647862118e3474');
        expect(json.user.first_name).toBe('first_name_1');
        expect(json.user.last_name).toBe('last_name_1');
        expect(json.user.id).toBe('first_name.last_name+1@gmail.com');
    });
    it('teacher/all', async () => {
        const json = JSON.parse(await FacadeSGB.getListeEnseignants());
        expect(json.message).toBe('Success');

        expect(json.data[0].first_name).toBe('Vincent');
        expect(json.data[0].last_name).toBe('Lacasse');
        expect(json.data[0].id).toBe('cc-vincent.lacasse@etsmtl.ca');

        expect(json.data[7].first_name).toBe('Yves');
        expect(json.data[7].last_name).toBe('Durocher');
        expect(json.data[7].id).toBe('yves.durocher@etsmtl.ca');
    });
    it('student/fromtoken test', async () => {
        const json = JSON.parse(await FacadeSGB.getEnseignantFromToken('9c4149a3e22bf75971083a2f86991fba'));
        expect(json.message).toBe('Success');

        expect(json.user.first_name).toBe('Vincent');
        expect(json.user.last_name).toBe('Lacasse');
        expect(json.user.id).toBe('cc-vincent.lacasse@etsmtl.ca');
    });
    it('student/login test', async () => {
        const json = JSON.parse(await FacadeSGB.authEnseignant('cc-vincent.lacasse@etsmtl.ca', 'password'));
        expect(json.message).toBe('Success');

        expect(json.token).toBe('9c4149a3e22bf75971083a2f86991fba');
        expect(json.user.first_name).toBe('Vincent');
        expect(json.user.last_name).toBe('Lacasse');
        expect(json.user.id).toBe('cc-vincent.lacasse@etsmtl.ca');
    });
    it('getListSchedulesEnseignant test', async () => {
        const array = await FacadeSGB.getListeSchedulesEnseignant('cc-vincent.lacasse@etsmtl.ca');

        expect(array[0]).toBe('S20213-LOG121-02');
        expect(array[1]).toBe(undefined);
    });
});