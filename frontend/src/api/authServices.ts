import type { User } from "../types/user";
import type { apiUserResponse } from "../types/userResponse";
import api from "./axios";

export const loginUser = async (email:string,password:string): Promise<apiUserResponse <User[]>> => {
    console.log("inofo send", email,password);
  const { data } = await api.post("/auth/login",{email,password});
 
  return data;
};

export const registeUser = async (username:string,email:string,password:string,role:string): Promise<apiUserResponse <User[]>> => {
    console.log(username,email,password,role)
  const { data } = await api.post("/auth/register",{username,email,password,role});
   console.log("retour inscription",data)
  return data;
};


