import { useAuthStore } from "@/lib/store/auth.store";
import { Category } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =========================
   Public requests
========================= */

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getCategory(id: number): Promise<Category> {
  const res = await fetch(`${API_URL}/category/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  return res.json();
}

/* =========================
   Authentication headers
========================= */

function getAuthHeaders() {
  const token = useAuthStore.getState().accessToken;

  return {
    Authorization: `Bearer ${token}`,
  };
}

function getJsonAuthHeaders() {
  return {
    ...getAuthHeaders(),
    "Content-Type": "application/json",
  };
}

/* =========================
   Admin requests
========================= */

export interface CreateCategoryDto {
  nameEn: string;
  nameAr: string;
}

export interface UpdateCategoryDto {
  nameEn?: string;
  nameAr?: string;
}

export async function createCategory(
  data: CreateCategoryDto,
): Promise<Category> {
  const res = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      typeof error.message === "string"
        ? error.message
        : "Failed to create category",
    );
  }

  return res.json();
}

export async function updateCategory(
  id: number,
  data: UpdateCategoryDto,
): Promise<Category> {
  const res = await fetch(`${API_URL}/category/${id}`, {
    method: "PATCH",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      typeof error.message === "string"
        ? error.message
        : "Failed to update category",
    );
  }

  return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/category/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      typeof error.message === "string"
        ? error.message
        : "Failed to delete category",
    );
  }

  // Your NestJS remove() may return no body.
  // Therefore DON'T call res.json() here.
}
