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
