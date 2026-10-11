"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryMap({ courier, delivery, status }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const courierMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLineRef = useRef(null);

  const cLat = courier?.lat || 9.0035;
  const cLng = courier?.lng || 38.7760;
  const dLat = delivery?.lat || 9.0085;
  const dLng = delivery?.lng || 38.7830;

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: false
      }).setView([cLat, cLng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const courierIcon = L.divIcon({
        className: "custom-courier-marker",
        html: `
          <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background-color: rgba(24, 84, 42, 0.2); animation: courierPulse 2s infinite ease-out;"></div>
            <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #18542a; border: 2.5px solid #ffffff; box-shadow: 0 3px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 15px;">
              🛵
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const destIcon = L.divIcon({
        className: "custom-dest-marker",
        html: `
          <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
            <div style="width: 30px; height: 30px; border-radius: 50%; background-color: #f96015; border: 2.5px solid #ffffff; box-shadow: 0 3px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 14px;">
              📍
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const courierMarker = L.marker([cLat, cLng], { icon: courierIcon })
        .addTo(map)
        .bindPopup(`<strong>Courier:</strong> ${courier?.name || "Driver"}<br/>${courier?.vehicle || "Vehicle"}`);

      const destMarker = L.marker([dLat, dLng], { icon: destIcon })
        .addTo(map)
        .bindPopup(`<strong>Delivery Address:</strong><br/>${delivery?.address || "Customer Location"}`);

      const routeLine = L.polyline(
        [
          [cLat, cLng],
          [dLat, dLng]
        ],
        {
          color: "#18542a",
          weight: 4,
          dashArray: "6, 8",
          opacity: 0.85
        }
      ).addTo(map);

      mapInstanceRef.current = map;
      courierMarkerRef.current = courierMarker;
      destinationMarkerRef.current = destMarker;
      routeLineRef.current = routeLine;

      map.fitBounds(
        [
          [cLat, cLng],
          [dLat, dLng]
        ],
        { padding: [50, 50], maxZoom: 16 }
      );
    } else {
      const map = mapInstanceRef.current;
      if (courierMarkerRef.current) {
        courierMarkerRef.current.setLatLng([cLat, cLng]);
        courierMarkerRef.current.setPopupContent(
          `<strong>Courier:</strong> ${courier?.name || "Driver"}<br/>${courier?.vehicle || "Vehicle"}`
        );
      }
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setLatLng([dLat, dLng]);
        destinationMarkerRef.current.setPopupContent(
          `<strong>Delivery Address:</strong><br/>${delivery?.address || "Customer Location"}`
        );
      }
      if (routeLineRef.current) {
        routeLineRef.current.setLatLngs([
          [cLat, cLng],
          [dLat, dLng]
        ]);
      }
      map.fitBounds(
        [
          [cLat, cLng],
          [dLat, dLng]
        ],
        { padding: [50, 50], maxZoom: 16 }
      );
    }

    return () => {};
  }, [cLat, cLng, dLat, dLng, courier, delivery]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "420px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      }}
    >
      <div
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
        role="region"
        aria-label="Interactive Leaflet map showing courier and delivery destination"
      />
      <style>{`
        @keyframes courierPulse {
          0% { transform: scale(0.85); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
