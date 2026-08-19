"use client";

import { deleteProduct } from "@/services/product.service";

export default function DeleteProductButton({ id }: { id: number }) {
  async function remove() {
    if (!confirm("Delete product?")) {
      return;
    }

    await deleteProduct(id);

    window.location.reload();
  }

  return (
    <button
      onClick={remove}
      className="rounded bg-red-600 px-3 py-2 text-white"
    >
      Delete
    </button>
  );
}
