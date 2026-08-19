export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type VerifyEmailDto = {
  email: string;
  code: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";

  isActive: boolean;
  isVerified: boolean;

  avatar: string | null;

  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type RegisterResponse = {
  message: string;
};

export type VerifyResponse = {
  message: string;
  accessToken: string;
  user: User;
};
