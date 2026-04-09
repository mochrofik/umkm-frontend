"use client";

import React from "react";

/**
 * Interface untuk mendefinisikan tipe data props komponen Loading
 */
interface LoadingProps {
  size?: string;      // Contoh: "h-10 w-10" (Opsional)
  color?: string;     // Contoh: "border-orange-500" (Opsional)
  fullPage?: boolean; // Menentukan apakah loading menutupi seluruh layar
  text?: string;      // Teks tambahan di bawah spinner (Opsional)
}

const Loading = ({
  size = "h-8 w-8",
  color = "border-blue-600",
  fullPage = false,
  text = "",
}: LoadingProps) => {
  
  // Komponen Spinner Utama
  // Kita bungkus dalam variabel agar bisa digunakan kembali di return bawah
  const Spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${size} ${color} animate-spin rounded-full border-4 border-t-transparent`}
      ></div>
      {text && (
        <p className="mt-2 text-sm font-medium text-gray-600 font-poppins">
          {text}
        </p>
      )}
    </div>
  );

  // Jika fullPage true, tampilkan overlay di tengah layar (fixed)
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
        {Spinner}
      </div>
    );
  }

  // Jika tidak, tampilkan spinner biasa sesuai posisi elemen berada
  return Spinner;
};

export default Loading;