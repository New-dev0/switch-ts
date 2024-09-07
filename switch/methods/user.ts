import Client from "../client/client";
import User from "../models/user";
import { Endpoints } from "../client/endpoints";

export async function getUserByID(client: Client, id: number): Promise<User> {
  const response = await client.request(`${Endpoints.USER_SERVICE_URL}/api/users/getUserById?userid=${id}`, {
    method: "GET",
  });
  
  return response;
}

export async function getUserByUsername(client: Client, username: string): Promise<User> {
  if (username.startsWith("@")) {
    username = username.slice(1);
  }
  
  const response = await client.request(`${Endpoints.USER_SERVICE_URL}/api/users/getUserByUsername?username=${username}`, {
    method: "GET",
  });
    
  return response;
}
