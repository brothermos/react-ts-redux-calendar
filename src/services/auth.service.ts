import { LoginResponse } from "../app-types/login.type";
import { ProfileResponse } from "../app-types/profile.type";
import { RegisterResponse } from "../app-types/register.type";
import { AxiosResponse, http } from "./http.service";

export async function register(
   name: string,
   email: string,
   password: string
): Promise<AxiosResponse<RegisterResponse>> {
   return await http.post<RegisterResponse>(
      "https://api.codingthailand.com/api/register",
      {
         name: name,
         email: email,
         password: password,
      }
   );
}

export async function login(
   email: string,
   password: string
): Promise<AxiosResponse<LoginResponse>> {
   return await http.post<LoginResponse>(
      "https://api.codingthailand.com/api/login",
      {
         email: email,
         password: password,
      }
   );
}

export function logout(): void {
   localStorage.removeItem("token");
}

export async function getProfile(): Promise<AxiosResponse<
   ProfileResponse,
   any
> | null> {
   const token = JSON.parse(localStorage.getItem("token")!) as LoginResponse; // as loginresponse ให้เป็น type login
   if (!token) {
      return null;
   }
   return await http.get<ProfileResponse>(
      "https://api.codingthailand.com/api/profile",
      {
         headers: { Authorization: "Bearer" + token.access_token },
      }
   );
}
