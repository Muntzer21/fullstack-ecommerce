import { useAuthStore } from "@/lib/store/auth.store";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

function getAuthHeaders() {
  const token = useAuthStore.getState().accessToken;

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getUsers(): Promise<AdminUser[]> {
  const res = await fetch(`${API_URL}/user`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function updateUserRole(id: number, role: "USER" | "ADMIN") {
  const res = await fetch(`${API_URL}/user/${id}/role`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Failed to update user role",
    );
  }

  return res.json();
}
