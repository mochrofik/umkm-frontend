/**
 * Interface untuk mendefinisikan area pemotongan gambar
 */
interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Fungsi untuk memotong gambar dan mengembalikannya dalam bentuk File
 * @param imageSrc - URL gambar atau dataURL
 * @param pixelCrop - Objek koordinat dan ukuran pemotongan
 */
export default async function getCroppedImg(
  imageSrc: string, 
  pixelCrop: PixelCrop
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;

  // Menunggu gambar selesai dimuat
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error("Gagal mendapatkan context canvas 2D");
  }

  // Menggambar bagian gambar yang dipilih ke dalam canvas
  ctx.drawImage(
    image,
    pixelCrop.x, 
    pixelCrop.y, 
    pixelCrop.width, 
    pixelCrop.height,
    0, 
    0, 
    pixelCrop.width, 
    pixelCrop.height
  );

  // Mengonversi canvas menjadi Blob lalu menjadi File
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas kosong atau gagal dikonversi ke Blob"));
        return;
      }
      
      // Membuat objek File dari Blob
      const file = new File([blob], "icon-toko.jpg", { type: "image/jpeg" });
      resolve(file);
    }, 'image/jpeg');
  });
}