"use client";

import Image from "next/image";

import { Link } from "@/i18n/navigation";

import DeleteProductButton from "./DeleteProductButton";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductRow({ product }: Props) {
  return (
    <tr className="border-t">
      <td className="p-4">
        <Image
          src={product.imageUrl}
          alt={product.nameEn}
          width={60}
          height={60}
          className="rounded"
        />
      </td>

      <td>{product.nameEn}</td>

      <td>{product.category?.nameEn}</td>

      <td>${product.price}</td>

      <td>{product.stock}</td>

      <td>
        <div className="flex gap-3">
          <Link
            href={`/dashboard/products/${product.id}`}
            className="rounded bg-blue-600 px-3 py-2 text-white"
          >
            Edit
          </Link>

          <DeleteProductButton id={product.id} />
        </div>
      </td>
    </tr>
  );
}
