import api from "./axios";
import type { User } from "../types/user";
import type { apiUserResponse } from "../types/userResponse";
export const getUsers = async (): Promise<apiUserResponse <User[]>> => {
  const { data } = await api.get("/users");
  return data;
};

export const getUserById = async (id: number): Promise<apiUserResponse <User>> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export const createUser = async (user: User): Promise<apiUserResponse <User>> => {
  const { data } = await api.post("/users", user);
  return data;
};

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<apiUserResponse <User>> => {
  const { data } = await api.put(`/users/${id}`, user);
  return data;
};

export const deleteUser = async (id: number): Promise<apiUserResponse <null>> => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
