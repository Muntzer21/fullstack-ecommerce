import { useAuthStore } from "@/lib/store/auth.store";
import { CreateProductDto } from "@/types/create-product";
import { Product } from "@/types/product";
import { ProductResponse } from "@/types/product-response";
import { UpdateProductDto } from "@/types/update-product";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: number;
  search?: string;
}

/* =========================
   Public product requests
========================= */

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/product/featured`, {
    cache: "no-store",
  });
console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch featured products");
  }

  return res.json();
}

export async function getRelatedProducts(
  categoryId: number,
  exclude: number,
  limit = 4,
): Promise<Product[]> {
  const res = await fetch(
    `${API_URL}/product/related/${categoryId}?exclude=${exclude}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch related products");
  }

  return res.json();
}

export async function getProducts({
  page = 1,
  limit = 12,
  category,
  search,
}: GetProductsParams = {}): Promise<ProductResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category) {
    params.set("category", category.toString());
  }

  if (search) {
    params.set("search", search);
  }

  const res = await fetch(`${API_URL}/product?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function getProductsByCategory(
  categoryId: number,
): Promise<Product[]> {
  const res = await fetch(`${API_URL}/product/category/${categoryId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products by category");
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
   Upload image
========================= */

interface UploadResponse {
  filename: string;
  url: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

/* =========================
   Admin product requests
========================= */

export async function createProduct(data: CreateProductDto) {
  const res = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      typeof error.message === "string"
        ? error.message
        : "Something went wrong",
    );
  }

  return res.json();
}

export async function updateProduct(id: number, data: UpdateProductDto) {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PATCH",
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
}
