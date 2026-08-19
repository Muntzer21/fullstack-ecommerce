import { useAuthStore } from "@/lib/store/auth.store";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;

  user: {
    id: number;
    name: string;
  };

  product: {
    id: number;
    nameEn: string;
    nameAr: string;
  };
}

export interface CreateReviewDto {
  productId: number;
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

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

export async function getProductReviews(productId: number): Promise<Review[]> {
  const res = await fetch(`${API_URL}/reviews/product/${productId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}

export async function createReview(data: CreateReviewDto): Promise<Review> {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Failed to create review",
    );
  }

  return res.json();
}

export async function updateReview(
  id: number,
  data: UpdateReviewDto,
): Promise<Review> {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PATCH",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Failed to update review",
    );
  }

  return res.json();
}

export async function deleteReview(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Failed to delete review",
    );
  }
}

export async function getAllReviews(): Promise<Review[]> {
  const res = await fetch(`${API_URL}/reviews`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message)
        ? error.message[0]
        : error.message || "Failed to fetch reviews",
    );
  }

  return res.json();
}