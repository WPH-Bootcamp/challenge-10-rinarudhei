export type RegisterResponse = {
  id: number;
  email: string;
  username: string;
};

export type LoginParam = {
  email: string;
  passsword: string;
};

export interface LoginResponse {
  token: string;
}

export interface RegisterParam extends LoginParam {
  name: string;
  username: string;
}
