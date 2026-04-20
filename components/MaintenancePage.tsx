"use client";
import { Construction, ArrowLeft, Hammer } from "lucide-react";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Ilustrasi Utama */}
        <div className="relative h-[300px] flex items-center justify-center bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden mb-8 border border-slate-100">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="relative flex flex-col items-center">
            <div className="p-5 bg-blue-50 rounded-2xl mb-4 animate-bounce">
              <Construction size={64} className="text-blue-600" />
            </div>
            <div className="flex gap-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full animate-ping"></span>
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-ping [animation-delay:0.2s]"></span>
              <span className="h-2 w-2 bg-blue-200 rounded-full animate-ping [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>

        {/* Teks Deskripsi */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Fitur Sedang Dikembangkan
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Sabar ya! Kami sedang meracik bumbu terbaik untuk fitur{" "}
          <span className="font-semibold text-blue-600">Le melle</span> ini agar
          siap membantu UMKM di Madura.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* <button className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all active:scale-95">
            <ArrowLeft size={18} />
            Kembali ke Beranda
          </button> */}

          <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <Hammer size={12} />
            Powered by FikTech Developer Team
          </div>
        </div>
      </div>
    </div>
  );
}
