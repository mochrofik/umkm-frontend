"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple, LeafletMouseEvent } from "leaflet";

// Mendefinisikan Icon Marker agar tidak error saat build
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// --- Interfaces ---
interface ChangeViewProps {
  center: LatLngTuple;
}

interface MapPickerProps {
  lat: number | null | undefined;
  lng: number | null | undefined;
  onChange: (lat: number, lng: number) => void;
}

// Komponen untuk menangani pergerakan peta (Auto Center)
function ChangeView({ center }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapPicker({ lat, lng, onChange }: MapPickerProps) {
  // Koordinat default: Surabaya (karena Anda menyebutkan UMR Surabaya sebelumnya)
  // Atau default ke Jakarta [-6.2, 106.816]
  const defaultCenter: LatLngTuple = [-7.2575, 112.7521]; 

  const [position, setPosition] = useState<LatLngTuple>(
    lat && lng ? [lat, lng] : defaultCenter
  );

  // Update posisi jika koordinat dari props berubah (misal dari geolocation browser)
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  function LocationMarker() {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); // Update marker secara lokal
        onChange(lat, lng);      // Kirim data ke parent
      },
    });

    return <Marker position={position} icon={markerIcon} />;
  }

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-slate-200 mt-2 relative z-0">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={position} />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}