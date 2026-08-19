export type CreateProductDto = {
  nameEn: string;
  nameAr: string;

  descriptionEn: string;
  descriptionAr: string;

  price: number;

  stock: number;


  imageUrl: string;

  categoryId: number;
};
