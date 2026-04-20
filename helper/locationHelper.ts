export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  district?: string;
}

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung oleh browser Anda"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Reverse Geocoding via OSM Nominatim
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(url, {
            headers: { "Accept-Language": "id" },
          });
          
          const data = await response.json();

          console.log("data location",data);
          

          resolve({
            latitude,
            longitude,
            address: data.display_name,
            city: data.address?.city || data.address?.town || data.address?.residence,
            district: data.address?.suburb || data.address?.village,
          });
        } catch (error) {
          // Tetap resolve koordinat meskipun gagal ambil nama alamat
          resolve({
            latitude,
            longitude,
            address: "Gagal mengambil nama lokasi",
          });
        }
      },
      (err) => {
        reject(new Error("Gagal mengambil lokasi: " + err.message));
      },
      { enableHighAccuracy: true }
    );
  });
};