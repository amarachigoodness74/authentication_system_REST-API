export interface IUser {
  name: string;
  email: string;
  password: string;
  refreshToken?: string; 
}

export interface IUserRefreshToken {
  refreshToken?: string; 
}

export interface IUserWithoutPassword {
  name: string;
  email: string;
  refreshToken?: string; 
}