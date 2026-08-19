export interface Product {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  stock: number;
  imageUrl: string;

  category: {
    id: number;
    nameEn: string;
    nameAr: string;
    image: string;
  };

  createdAt: string;
  updatedAt: string;
}
