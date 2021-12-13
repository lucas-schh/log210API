import axios from "axios";
import { universite } from "../Universite";
import { Cours } from "../Cours";
import { access } from "fs";
/*
    Classe façade SGB qui contient tous les commandes possibles du SGB
*/
export class FacadeSGB {
   
    public static async getListeCours() : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/course/all');
        return JSON.stringify(response.data);
    }
    
    public static async getListeNotesGroupe(group_id: string) : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/grade/group', { params: {group_id: group_id} });
        return JSON.stringify(response.data);
    }
    
    public static async setNote(student_id: string, group_id: string, type: string, type_id: number, note: number) : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/grade/insert', 
            { params: {student_id: student_id, group_id: group_id, type: type, type_id: type_id, note: note} });
        return JSON.stringify(response.data);
    }
    
    public static async getListeNotesEtudiant(student_id: string) : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/grade/student', { params: {student_id: student_id} });
        return JSON.stringify(response.data);
    }
    
    public static async ping() : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/healt/ping');
        return JSON.stringify(response.data);
    }
    
    public static async getListeSchedules() : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/Schedule/all');
        return JSON.stringify(response.data);
    }

    public static async getListeSchedulesEnseignant(id : string) {
        let response = await FacadeSGB.getListeSchedules();
        let data = JSON.parse(response).data;
        let listeGroupeCours = new Array();
        data.forEach(element => {
            if(element.teacher_id === id){
                let group_id = element.group_id;
                listeGroupeCours.push(group_id)
            }
        });
        return listeGroupeCours;
    }

    public static async getInfoGroupeCours(group_id) : Promise<Cours>{
        let response = await FacadeSGB.getListeSchedules();
        let data = JSON.parse(response).data;
        let cours = new Cours(null,null,null,null,null,null,null,null,null,null,null,null,null)
        data.forEach(element => {
            if(element.group_id == group_id){
                cours.id = element.group_id;
                cours.day = element.day;
                cours.hours = element.hours;
                cours.activity = element.activity;
                cours.mode = element.mode;
                cours.local = element.local;
                cours.teacher_id = element.teacher_id;
            }
        });
        return cours
    }
    
    public static async getListeSemestres() : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/semester/all');
        return JSON.stringify(response.data);
    }
    
    public static async getListeEtudiants() : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/student/all');
        return JSON.stringify(response.data);
    }
    
    public static async getEtudiantFromToken(token: string): Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/student/fromtoken', { params: {token: token} });
        return JSON.stringify(response.data);
    }
    
    public static async getLienEtudiantsGroupe(): Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/student/groupstudent');
        return JSON.stringify(response.data);
    }
    
    public static async authEtudiant(email: string, password: string): Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/student/login', { params: {email: email, password: password} });
        return JSON.stringify(response.data);
    }
    
    public static async getListeEnseignants() : Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/teacher/all');
        return JSON.stringify(response.data);
    }
    
    public static async getEnseignantFromToken(token: string): Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/teacher/fromtoken', { params: {token: token} });
        return JSON.stringify(response.data);
    }
    
    public static async authEnseignant(email: string, password: string): Promise<string> {
        const response = await axios.get('http://localhost:3200/api/v3/teacher/login', { params: {email: email, password: password} });
        return JSON.stringify(response.data);
    }
    
}