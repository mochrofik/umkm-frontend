'use client';

import { GoogleUser } from "@/types/google_user";
import { useState } from "react";


interface CreatePasswordFormProps {
    google_user: GoogleUser;
    role: string;
}

export default function CreatePasswordForm({google_user, role}: CreatePasswordFormProps){

    const [loading, setLoading] = useState<boolean>(false);

    const submitForm =async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try{

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    return(
        
             <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8">

           
          <h1 className="text-2xl font-bold text-gray-800">Daftar Sebagai Pelanggan UMKM</h1>

        <p className="text-gray-500 mb-8">Lengkapi data di bawah</p>

        <form  className="space-y-6">
          {/* Bagian 1: Akun Pemilik */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 border-b pb-2">Data Pribadi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  required
                  type="text"
                  value={google_user.name ??""}
                  className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl  outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  readOnly
                  value={google_user.email}
                  className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

              <div>
              <label className="block text-sm font-medium text-gray-700">Nomor HP / WhatsApp</label>
              <input
                type="text"
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password (Min. 8 Karakter)</label>
              <input
                required
                minLength={8}
                type="password"
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        
          <button
            type="submit"
            disabled={loading}
            className={` cursor-pointer w-full py-4 rounded-xl font-bold text-lg text-white transition shadow-lg ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>
        </div>
        </div>
        
    );
}