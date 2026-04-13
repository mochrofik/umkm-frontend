'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';

// Define interface untuk data form
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  store_name: string;
  slug: string;
  address: string;
  description: string;
  phone_number: string;
  role: string;
  status: string;
}

export default function RegisterUMKM() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    store_name: '',
    slug: '',
    address: '',
    description: '',
    phone_number: '',
    role: 'store',
    status: 'verify',
  });

  const handleStoreNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData({ 
      ...formData, 
      store_name: value, 
      slug: generatedSlug 
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
      const url = `${baseUrl}api/register`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Pendaftaran Berhasil!');
        router.push('/login');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Pendaftaran gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8">

           <button 
      onClick={() => router.replace('/')}
      className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
    >
      <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
      <span className="text-sm font-medium">Kembali</span>
    </button>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Partner UMKM</h1>

        <p className="text-gray-500 mb-8">Lengkapi data di bawah untuk mulai berjualan di Le melle.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bagian 1: Akun Pemilik */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 border-b pb-2">Data Pemilik</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl  outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password (Min. 8 Karakter)</label>
              <input
                required
                minLength={8}
                type="password"
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {/* Bagian 2: Data Toko */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-semibold text-blue-600 border-b pb-2">Detail Toko UMKM</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Toko</label>
              <input
                required
                type="text"
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.store_name}
                onChange={handleStoreNameChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug URL (Otomatis)</label>
              <input
                readOnly
                type="text"
                className="mt-1 w-full p-3 border rounded-xl bg-gray-100 text-gray-500 outline-none"
                value={formData.slug}
                placeholder="nasi-goreng-pak-eko"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor HP / WhatsApp</label>
              <input
                type="text"
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone_number}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone_number: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alamat Lengkap Toko</label>
              <textarea
                required
                rows={3}
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi Toko (Jualan apa saja?)</label>
              <textarea
                required
                rows={3}
                className="mt-1 w-full p-3 border border-gray-200 text-black rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition shadow-lg ${
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