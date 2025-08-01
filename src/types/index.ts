export interface Product {
  id: string;
  name: string;
  description: string;
  type: 'Pharmaceutique' | 'Parapharmaceutique' | 'Cosmétique';
  pharmacyLocation: string;
  pharmacyComment: string;
  price: number;
  inStock: boolean;
  prescribedBy?: string;
  pharmacyRating: number;
  userReviews: UserReview[];
  pharmacyId: string; // ID of the pharmacy that owns this product
  imageUrl?: string; // Optional product image URL
}

export interface UserReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  pharmacy: Pharmacy | null;
}

export interface FilterState {
  searchTerm: string;
  selectedType: string;
}