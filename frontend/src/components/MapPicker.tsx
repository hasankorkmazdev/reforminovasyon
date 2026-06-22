"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  lat: number;
  lng: number;
  onPositionChange: (lat: number, lng: number) => void;
  onAddressChange?: (address: string) => void;
  height?: string;
  draggable?: boolean;
}

export default function MapPicker({
  lat,
  lng,
  onPositionChange,
  onAddressChange,
  height = "400px",
  draggable = true,
}: MapPickerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView([lat, lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markerIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker([lat, lng], { icon: markerIcon, draggable }).addTo(map);
    markerRef.current = marker;

    const handleDrag = async () => {
      const pos = marker.getLatLng();
      onPositionChange(pos.lat, pos.lng);
      if (onAddressChange) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.lat}&lon=${pos.lng}&format=json&accept-language=tr`
          );
          const data = await res.json();
          onAddressChange(data.display_name || "Adres bulunamadı");
        } catch {
          onAddressChange("Adres alınamadı");
        }
      }
    };

    marker.on("dragend", handleDrag);

    map.on("click", (e: L.LeafletMouseEvent) => {
      marker.setLatLng(e.latlng);
      onPositionChange(e.latlng.lat, e.latlng.lng);
      if (onAddressChange) {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json&accept-language=tr`
        )
          .then((r) => r.json())
          .then((data) => onAddressChange(data.display_name || "Adres bulunamadı"))
          .catch(() => onAddressChange("Adres alınamadı"));
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
      mapRef.current.setView([lat, lng], 15);
    }
  }, [lat, lng]);

  return <div ref={containerRef} style={{ width: "100%", height, borderRadius: "12px", zIndex: 0 }} />;
}
