import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  RegisterResponse,
  VerifyResponse,
  AuthResponse,
} from "@/types/auth";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(data: RegisterDto): Promise<RegisterResponse> {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);
  

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message);
  }
  return res.json();
}

export async function login(data: LoginDto): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message);
  }

  return res.json();
}

export async function verifyEmail(
  data: VerifyEmailDto,
): Promise<VerifyResponse> {
  console.log(data);

  const res = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Verification failed");
  }

  return res.json();
}

