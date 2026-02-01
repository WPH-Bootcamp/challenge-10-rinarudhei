export type RegisterResponse = {
  id: number;
  email: string;
  username: string;
};

export type LoginParam = {
  email: string;
  password: string;
};

export interface LoginResponse {
  token: string;
}

export interface RegisterParam extends LoginParam {
  name: string;
  username: string;
  email: string;
  password: string;
}
