import React, { useState } from 'react'
import Cropper, { Point, Area } from 'react-easy-crop'

// --- Interface ---
interface ImageCropperProps {
  image: string;                                     // URL gambar atau base64
  onCropComplete: (croppedAreaPixels: Area) => void; // Fungsi saat tombol potong diklik
  onCancel: () => void;                              // Fungsi batal
}

export default function ImageCropper({ image, onCropComplete, onCancel }: ImageCropperProps) {
  // State untuk posisi crop (x, y)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  
  // State untuk zoom level
  const [zoom, setZoom] = useState<number>(1)
  
  // State untuk menyimpan hasil kalkulasi pixel pemotongan
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black">
      <div className="relative flex-1">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1} 
          onCropChange={setCrop}
          // Fungsi ini dipanggil setiap kali area potong berubah
          onCropComplete={(_croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels)
          }}
          onZoomChange={setZoom}
        />
      </div>
      
      <div className="bg-white p-4 flex flex-col gap-4">
        {/* Slider Zoom */}
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZoom(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        
        <div className="flex justify-end gap-3">
          <button 
            type="button"
            onClick={onCancel} 
            className="px-4 py-2 text-slate-600 font-medium hover:text-slate-800"
          >
            Batal
          </button>
          
          <button 
            type="button"
            onClick={() => {
              if (croppedAreaPixels) {
                onCropComplete(croppedAreaPixels)
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
          >
            Potong & Terapkan
          </button>
        </div>
      </div>
    </div>
  )
}