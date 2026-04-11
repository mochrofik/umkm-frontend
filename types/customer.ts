export interface CustomerFormData {
  id: number | null;
  nik: string;
  name: string;
  email: string;
  password?: string; 
  role: string;
  status: string;
  address: string;
  phone_number: string;
  latitude: string;
  longitude: string;
  gender: string;
  date_of_birth: string;
  postal_code: string;
}

export interface UserData {
  id: number;
  name: string;
    email: string;
    status: string;
    role: string;
    created_at: string;
    updated_at: string; 
}


export interface CustomerData {
  id: number;
  user_id: number;
  nik: string;
  name: string;
  email: string;
  role: string;
  status: string;
  address: string;
  phone_number: string;
  latitude: string;
  longitude: string;
  gender: string;
  date_of_birth: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  avatar: string | null;
  avatar_url: string | null;
  user: UserData;
}

export interface CustomerResponse {  
    success: boolean;
    message: string;
    data: {
        data: CustomerData[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    }
 }