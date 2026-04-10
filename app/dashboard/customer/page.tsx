"use client";

import ModalComponent from "@/components/Modal";
import getCroppedImg from "@/helper/cropImage/cropImage";
import { Plus, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

// Definisi Interface untuk Data Form
interface CustomerFormData {
  id: number | null;
  nik: string;
  name: string;
  email: string;
  password: string;
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

export default function CustomerPage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<number | null>(null);

  const [formData, setFormData] = useState<CustomerFormData>({
    id: null,
    nik: "",
    name: "",
    email: "",
    password: "",
    role: "customer",
    status: "",
    address: "",
    phone_number: "",
    latitude: "",
    longitude: "",
    gender: "",
    date_of_birth: "",
    postal_code: "",
  });

  const [processing, setProcessing] = useState<boolean>(false);

  const [selectedImg, setSelectedImage] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const [imageToCrop, setImageToCrop] = useState<string | ArrayBuffer | null>(null);
  const [showCropper, setShowCropper] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleCropDone = async (croppedPixels: any): Promise<void> => {
    if (imageToCrop && typeof imageToCrop === "string") {
      const croppedImage = await getCroppedImg(imageToCrop, croppedPixels);
      setPreviewImg(URL.createObjectURL(croppedImage));
      setShowCropper(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Customer</h1>
          <p className="text-slate-500 text-sm">Kelola Data Customer</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={18} /> Tambah Customer
        </button>
      </div>

      <form className="mb-6" onSubmit={(e: FormEvent) => e.preventDefault()}>
        <div className="relative w-full md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            size={18}
          />

          <input
            type="text"
            placeholder="Cari & tekan enter...."
            className="w-full border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20
            pl-10 pr-4 py-2"
          />
        </div>
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">No</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Pelanggan</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Alamat</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Jenis Kelamin</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Lokasi</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            {/* Body tabel dikosongkan sesuai kode asli */}
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Akun Pelanggan"}
        >
          <form className="overflow-y-auto max-h-[70vh]" onSubmit={(e: FormEvent) => e.preventDefault()}>
            <div className="p-6 space-y-4">
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Informasi Akun
                </h4>

                <div>
                  <div className="md:col-span-1 space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-4">
                      Foto Profil
                    </label>
                    <div className="aspect-square w-40 mx-auto border-2 border-dashed border-slate-200 rounded-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 group relative">
                      {previewImg ? (
                        <img
                          src={previewImg}
                          alt="Preview Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <User
                            className="mx-auto text-slate-300 mb-2"
                            size={40}
                          />
                          <span className="text-xs text-slate-400">
                            Belum ada foto profil
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={onChangeFile}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 text-center">
                      Rekomendasi ukuran 1:1 (Square) maks 2MB
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password{" "}
                    {isEditing && (
                      <span className="text-xs text-slate-400 font-normal">
                        (Kosongkan jika tidak ganti)
                      </span>
                    )}
                  </label>
                  <input
                    type="password"
                    required={!isEditing}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                    value={formData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
                      value={formData.status}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="verify">Verify</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    No. Telepon (Opsional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
                    value={formData.phone_number}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        phone_number: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Alamat
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
                    value={formData.address}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </ModalComponent>
      )}
    </div>
  );
}