export interface LoginResponse {
   access_token: string;
   token_type: string;
   expires_in: number;
}

export interface LoginErrorResponse {
   message: string;
   status_code: number;
}
