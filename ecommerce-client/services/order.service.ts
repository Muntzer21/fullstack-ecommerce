import { useAuthStore } from "@/lib/store/auth.store";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders() {
  const token = useAuthStore.getState().accessToken;

  return {
    Authorization: `Bearer ${token}`,
  };
}

/* =========================
   User
========================= */

export async function createOrder(
  items: { productId: number; quantity: number }[],
) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });
  console.log(res);
  

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message) ? error.message[0] : error.message,
    );
  }

  return res.json();
}

export async function getMyOrders() {
  const res = await fetch(`${API_URL}/orders/my/orders`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function getOrder(id: number) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order.");
  }

  return res.json();
}

/* =========================
   Admin
========================= */

export async function getAllOrders(page = 1, limit = 10) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${API_URL}/orders?${params.toString()}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function updateOrderStatus(id: number, status: string) {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      Array.isArray(error.message) ? error.message[0] : error.message,
    );
  }

  return res.json();
}
