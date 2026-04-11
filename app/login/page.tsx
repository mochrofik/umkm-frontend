"use client";
import { useAuth } from "@/AuthContext";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface LoginFormData{
    email:string,
    password:string,
}

interface LoginResponse {
data: {
user: any; 
role: string[];
access_token: string;
};
message?: string;
}

export default function LoginPage() {
    const router = useRouter();
    const {login} = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
         const url = process.env.NEXT_PUBLIC_SITE_URL;
      const response = await fetch( `${url}api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
       if (response.ok) {
          const data = await response.json();
          const role = data.data.role[0];

          login(data.data.user, role, data.data.access_token)

          if(role === 'admin' || role === 'store'){
            router.push('/dashboard');
          }else{
            router.push('/');
          }
          
        } else {
            const errorData = await response.json();
            toast.error(JSON.stringify(errorData.message));
        }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }   
  }
    return (    
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <button 
      onClick={() => router.replace('/')}
      className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Kembali</span>
    </button>

    <div className="mb-10 text-center">
      <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">Le melleh!</h1>
      <p className="text-slate-500 mt-2 text-sm">Dukung UMKM daerahmu dengan rasa yang juara!</p>
    </div>
                 <form onSubmit={handleLogin} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email atau Nomor HP</label>
        <input 
          type="text" 
          value={formData.email}
          placeholder="Contoh: 08123456xxx"
          onChange={(e) => setFormData({...formData, email:e.target.value})}
          className="w-full p-3 text-slate-900 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kata Sandi</label>
        <input 
          type="password" 
          value={formData.password}
          placeholder="Masukkan kata sandi"
          onChange={(e) => setFormData({...formData, password:e.target.value})}
          className="w-full p-3 text-slate-900 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Tombol Login Biru Modern */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg text-white transition-all shadow-md shadow-blue-200 ${
          loading 
            ? 'bg-slate-300 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
        }`}
      >
        {loading && <Loader2 className="animate-spin" size={20} />}
        {loading ? 'Memproses...' : 'Masuk Sekarang'}
      </button>
    </form>

    <div className="mt-8 text-center text-sm text-slate-500">
      Belum punya akun? 
      <a href="/register-customer" className="ml-1 text-blue-600 font-bold hover:underline underline-offset-4">
        registrasi
      </a>
      <div className="px-2"> atau </div>
      <a href="/register" className="ml-1 text-blue-600 font-bold hover:underline underline-offset-4">
        ingin berjualan?
      </a>
    </div>
            </div>
        </div>
    );
}