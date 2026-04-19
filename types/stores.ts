import { StoreCategories } from "./store_categories";

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface Store {
  id: number;
  user_id: number;
  name: string;
  slug: string;
  address: string;
  description: string | null;
  phone_number: string | null;
  latitude: number | string | null;
  longitude: number | string | null;
  open_at: string | null;
  close_at: string | null;
  logo: string | null;
  logo_url: string;
  rating: number;
  is_open: string;
  user: User;
  jarak: number
  store_categories: StoreCategories[  ]
}

export interface StoreFormData {
  name: string;
  id: number | null;
  store_name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  address: string;
  description: string;
  phone_number: string;
  latitude: number | string;
  longitude: number | string;
  open_at: string;
  close_at: string;
  slug: string;
}

export interface StoreResponse {
  success: boolean;
  data: {
    data: Store[];
    current_page: number;
    last_page: number;
    per_page: number;
  };
}