"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/services/product.service";

import ProductRow from "./ProductRow";
import { Product } from "@/types/product";

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getProducts({
        page: 1,
        limit: 20,
      });

      setProducts(data.data);
    }

    load();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
