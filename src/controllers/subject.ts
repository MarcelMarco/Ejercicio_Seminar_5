import { Request,Response } from "express";
import { insertSubject,getSubject,getSubjects,updateSubject,deleteSubject, matriculateSubject, getListOfUsers, getListOfSubjects} from "../services/subject";
import { handleHttp } from "../utils/error.handle";
import { User } from "../interfaces/user.interface";
import { Subject } from "../interfaces/subject.interface";
import { ObjectId } from 'mongodb';


const get_Subject = async({params}:Request,res:Response)=>{
    try{
        const {idSubject} = params;
        const response = await getSubject(idSubject);
        const data = response ? response:"NOT_FOUND";
        console.log(data);
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_SUBJECT");
    }
};

const get_Subjects = async (req:Request,res:Response) => {
    try{
        const response = await getSubjects();
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_SUBJECT");
    }
};


// Me devuelve toda la asignatura pero soy incapaz de conseguir filtrarlo, si hago lo siguiente me da error
// const usuario = data.users[];
const get_ListOfUsers = async({params}:Request,res:Response)=>{  
    try{
        const {idSubject} = params;        
        const response = await getListOfUsers(idSubject);
        const data = response ? response:"NOT_FOUND";
        // if (response?.users != undefined){
        //     response.users.forEach(element => console.log(element));
        // }
        // const users = response?.users;
        // console.log(users);
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USERS");
    }
};


const get_ListOfSubjects = async({params}:Request,res:Response)=>{  
    try{
        const {idUser} = params;
        const response = await getListOfSubjects(idUser);
        const data = response ? response:"NOT_FOUND";
        // const usuarios = response?.users;
        // if (Object.entries(response).length != 0){
        //     for(let i = 0; i < usuarios.length; i++) {
        //         console.log(usuarios[i].name);  // (o el campo que necesites)
        //     }
        // }
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_SUBJECT");
    }
};

const update_Subject = async ({params,body}:Request,res:Response)=>{
    try{
        const {idSubject} = params;
        const response = await updateSubject(idSubject,body);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_UPDATE_SUBJECT");
    }
};

const post_Subject = async ({body}:Request,res:Response)=>{
    try{
        const response = await insertSubject(body);
        res.send(response);
    }catch(e){
        handleHttp(res,"ERROR_POST_SUBJECT");
    }
};

const delete_Subject = async ({params}:Request,res:Response)=>{
    try{
        const {idSubject} = params;
        const response = await deleteSubject(idSubject);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_DELETE_SUBJECT");
    }
};

const matriculate_Subject = async ({body}:Request,res:Response)=>{
    try{
        const { idUser, idSubject } = body;
        const response = await matriculateSubject(idUser, idSubject);
        res.send(response);
    }catch(e){
        handleHttp(res,"ERROR_MATRICULATE_IN_A_SUBJECT");
    }
};

export{get_Subject,get_Subjects,post_Subject,update_Subject,delete_Subject,matriculate_Subject,get_ListOfUsers,get_ListOfSubjects};