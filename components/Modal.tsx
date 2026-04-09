import React from "react";
import { X } from "lucide-react";

/**
 * Interface untuk mendefinisikan struktur Props Modal
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;      // Fungsi yang tidak mengembalikan apa-apa
  children: React.ReactNode; // Bisa berupa elemen HTML atau komponen React
  title?: string;           // Tanda tanya (?) berarti prop ini opsional
}

export default function ModalComponent({ 
  isOpen, 
  onClose, 
  children, 
  title 
}: ModalProps) {
  
  // Jika modal tidak terbuka, jangan render apa pun
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <h3 className="text-lg font-bold text-slate-800">
            {title ?? "Informasi"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Konten Modal */}
        <div className="mt-2 p-6 max-h-[80vh] overflow-y-auto font-poppins text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
}