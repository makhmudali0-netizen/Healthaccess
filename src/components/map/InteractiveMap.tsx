import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { dbService } from '../../services/dbService';
import { UZBEKISTAN_REGIONS, UZBEKISTAN_DISTRICTS_MAP, REGION_COORDINATES } from '../../data/mockData';
import { Facility, FacilityType } from '../../types';
import {
  MapPin,
  Building2,
  Pill,
  Clock,
  Phone,
  Navigation,
  Check,
  Search,
  ShieldAlert,
  X,
  Compass,
  ArrowRight,
  Route,
  Zap,
  Star
} from 'lucide-react';

// Haversine Formula to calculate distance in KM between 2 lat/lng points
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface InteractiveMapProps {
  onBookAppointment?: (facilityId: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onBookAppointment }) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // Cascading Region & District Filter State
  const [selectedRegion, setSelectedRegion] = useState<string>("Toshkent shahri");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<FacilityType | 'all'>('all');
  const [onlyEmergency, setOnlyEmergency] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected facility and routing state
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearestFacility, setNearestFacility] = useState<{ facility: Facility; distanceKm: number } | null>(null);
  const [isRoutingActive, setIsRoutingActive] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distanceKm: number; timeDrive: number; timeWalk: number } | null>(null);

  // Leaflet Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    setFacilities(dbService.getFacilities());
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCoords = REGION_COORDINATES[selectedRegion] || { lat: 41.2995, lng: 69.2401 };
      const map = L.map(mapContainerRef.current, {
        center: [initialCoords.lat, initialCoords.lng],
        zoom: 12,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Tile Layer based on Dark/Light theme
    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const attribution = '&copy; OpenStreetMap contributors';

    // Remove existing tile layers
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrl, { attribution, maxZoom: 19 }).addTo(map);

  }, [theme]);

  // Handle Region change & map pan
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const coords = REGION_COORDINATES[selectedRegion];
    if (coords) {
      mapInstanceRef.current.flyTo([coords.lat, coords.lng], 12, { duration: 1.2 });
    }
    // Reset district filter on region change
    setSelectedDistrict("all");
  }, [selectedRegion]);

  // Handle District change
  useEffect(() => {
    if (!mapInstanceRef.current || selectedDistrict === "all") return;
    const districtFacilities = facilities.filter(f => f.region === selectedRegion && f.district === selectedDistrict);
    if (districtFacilities.length > 0) {
      const first = districtFacilities[0];
      mapInstanceRef.current.flyTo([first.coordinates.lat, first.coordinates.lng], 14, { duration: 1 });
    }
  }, [selectedDistrict]);

  // Filter facilities
  const filteredFacilities = facilities.filter(f => {
    if (selectedRegion && f.region !== selectedRegion) return false;
    if (selectedDistrict !== 'all' && f.district !== selectedDistrict) return false;
    if (selectedType !== 'all' && f.type !== selectedType) return false;
    if (onlyEmergency && !f.emergency24_7) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name[language].toLowerCase().includes(q);
      const matchAddr = f.address[language].toLowerCase().includes(q);
      return matchName || matchAddr;
    }
    return true;
  });

  // Calculate & Auto-select Nearest Facility whenever User Location or Filtered List changes
  useEffect(() => {
    if (!userLocation || filteredFacilities.length === 0) return;

    let minDist = Infinity;
    let closest: Facility | null = null;

    filteredFacilities.forEach(f => {
      const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, f.coordinates.lat, f.coordinates.lng);
      if (dist < minDist) {
        minDist = dist;
        closest = f;
      }
    });

    if (closest) {
      setNearestFacility({ facility: closest, distanceKm: minDist });
    }
  }, [userLocation, filteredFacilities]);

  // Plot Facility Markers on Leaflet Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    filteredFacilities.forEach(facility => {
      const isSelected = selectedFacility?.id === facility.id;
      const isPharmacy = facility.type === 'pharmacy';

      // Custom Leaflet DivIcon
      const iconHtml = `
        <div class="relative flex items-center justify-center">
          <div class="w-9 h-9 rounded-2xl shadow-xl flex items-center justify-center text-base border-2 ${
            isSelected
              ? 'bg-amber-400 text-black border-white scale-125 z-50 ring-4 ring-amber-400/40'
              : isPharmacy
              ? 'bg-emerald-600 text-white border-white'
              : 'bg-rose-600 text-white border-white'
          }">
            ${isPharmacy ? '💊' : '🏥'}
          </div>
          ${facility.emergency24_7 ? '<span class="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border border-white animate-ping"></span>' : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([facility.coordinates.lat, facility.coordinates.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <b style="font-size: 13px; color: #0f172a;">${facility.name[language]}</b>
          <p style="font-size: 11px; color: #64748b; margin-top: 2px;">${facility.address[language]}</p>
          <div style="margin-top: 6px; font-weight: bold; font-size: 11px; color: #0d9488;">
            ${facility.workingHours.is24_7 ? '24/7 Ochiq' : facility.workingHours.weekdays}
          </div>
        </div>
      `);

      marker.on('click', () => {
        setSelectedFacility(facility);
      });

      markersRef.current.push(marker);
    });

  }, [filteredFacilities, selectedFacility, language]);

  // Request GPS User Location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Brauzeringizda GPS navigatsiya qo'llab-quvvatlanmaydi");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);

        const map = mapInstanceRef.current;
        if (map) {
          // Remove old user marker
          if (userMarkerRef.current) map.removeLayer(userMarkerRef.current);

          const userIconHtml = `
            <div class="relative flex items-center justify-center">
              <span class="w-6 h-6 rounded-full bg-blue-500/30 animate-ping absolute"></span>
              <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-[10px] text-white font-bold">
                📍
              </div>
            </div>
          `;

          const userIcon = L.divIcon({
            html: userIconHtml,
            className: 'user-location-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          userMarkerRef.current = L.marker([coords.lat, coords.lng], { icon: userIcon }).addTo(map);
          map.flyTo([coords.lat, coords.lng], 14, { duration: 1.5 });
        }
      },
      err => {
        // Fallback to current region center if user denies permission
        const fallback = REGION_COORDINATES[selectedRegion] || { lat: 41.2995, lng: 69.2401 };
        setUserLocation(fallback);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([fallback.lat, fallback.lng], 13);
        }
      }
    );
  };

  // Draw Live Vector Polyline Route from User -> Target Facility
  const handleDrawRoute = (target: Facility) => {
    const origin = userLocation || REGION_COORDINATES[selectedRegion] || { lat: 41.2995, lng: 69.2401 };
    const dest = target.coordinates;

    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing route polyline
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
    }

    // Draw route line
    const routePolyline = L.polyline(
      [
        [origin.lat, origin.lng],
        [dest.lat, dest.lng]
      ],
      {
        color: '#0d9488',
        weight: 6,
        opacity: 0.8,
        dashArray: '10, 10'
      }
    ).addTo(map);

    polylineRef.current = routePolyline;

    // Fit map bounds to show full route
    map.fitBounds(routePolyline.getBounds(), { padding: [40, 40] });

    // Calculate route details
    const dist = calculateDistanceKm(origin.lat, origin.lng, dest.lat, dest.lng);
    const driveMin = Math.max(2, Math.round(dist * 2.5));
    const walkMin = Math.max(5, Math.round(dist * 12));

    setRouteInfo({
      distanceKm: parseFloat(dist.toFixed(1)),
      timeDrive: driveMin,
      timeWalk: walkMin
    });
    setIsRoutingActive(true);
  };

  const availableDistricts = UZBEKISTAN_DISTRICTS_MAP[selectedRegion] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Cascading Region/District Control Panel */}
      <div className="bg-white dark:bg-black p-5 rounded-3xl border border-slate-200 dark:border-neutral-800 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center">
              <MapPin className="w-7 h-7 mr-2.5 text-rose-600 dark:text-rose-500 shrink-0" />
              <span>O'zbekiston Tibbiyot Xaritasi</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Viloyat va tumanlar bo'yicha shifoxona hamda dorixonalarni xaritadan topish va eng yaqin masofani aniqlash
            </p>
          </div>

          {/* GPS Location Button */}
          <button
            onClick={handleGetLocation}
            className="inline-flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow transition shrink-0"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Mening joylashuvim (GPS)</span>
          </button>
        </div>

        {/* Cascading Filter Bar: Region -> District -> Type -> Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-neutral-800">
          
          {/* Select Region */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">1. Viloyat</label>
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {UZBEKISTAN_REGIONS.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          {/* Select District */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">2. Tuman / Shahar</label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Barcha tumanlar</option>
              {availableDistricts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Facility Type */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">3. Maskan turi</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value as FacilityType | 'all')}
              className="w-full bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">Barchasi (Shifoxona + Dorixona)</option>
              <option value="hospital">🏥 Faqat Shifoxonalar</option>
              <option value="pharmacy">💊 Faqat Dorixonalar</option>
              <option value="clinic">🏨 Klinikalar</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">4. Qidirish</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Shifoxona yoki ko'cha nomi..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-slate-400"
              />
            </div>
          </div>

        </div>

        {/* Emergency & Filter Toggles */}
        <div className="flex items-center space-x-3 pt-1">
          <button
            onClick={() => setOnlyEmergency(!onlyEmergency)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              onlyEmergency
                ? 'bg-rose-600 text-white border-rose-500 shadow'
                : 'bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-neutral-800'
            }`}
          >
            <span>🚨 24/7 Tez Yordam Maskanlari</span>
          </button>
        </div>

      </div>

      {/* Auto Nearest Facility Recommendation Notification Box */}
      {nearestFacility && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shrink-0">
              ⚡
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-white/20 px-2 py-0.5 rounded">
                Sizga eng yaqin maskan aniqlandi
              </span>
              <h4 className="font-extrabold text-sm mt-0.5">
                {nearestFacility.facility.name[language]} — {nearestFacility.distanceKm < 1 ? `${Math.round(nearestFacility.distanceKm * 1000)} metr` : `${nearestFacility.distanceKm.toFixed(1)} km`} uzoqlikda
              </h4>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedFacility(nearestFacility.facility);
              handleDrawRoute(nearestFacility.facility);
            }}
            className="bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow transition shrink-0 flex items-center space-x-1"
          >
            <Route className="w-4 h-4 text-emerald-700 mr-1" />
            <span>Eng yaqin yo'lni chizish</span>
          </button>
        </div>
      )}

      {/* Main Map + Sidebar Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[620px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-neutral-800">
        
        {/* Real Leaflet Map Container */}
        <div className="lg:col-span-2 relative h-full bg-slate-900">
          
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Active Polyline Route Status Overlay Banner */}
          {isRoutingActive && routeInfo && selectedFacility && (
            <div className="absolute top-4 left-4 right-14 z-20 bg-black/90 backdrop-blur text-white p-3.5 rounded-2xl border border-teal-500/40 shadow-2xl flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-3">
                <Navigation className="w-5 h-5 text-teal-400 shrink-0 animate-pulse" />
                <div>
                  <h4 className="font-bold text-xs text-teal-300">
                    Yo'nalish chizildi: {selectedFacility.name[language]}
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    Masofa: <b className="text-white">{routeInfo.distanceKm} km</b> • 🚗 Avto: ~{routeInfo.timeDrive} min • 🚶 Piyoda: ~{routeInfo.timeWalk} min
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsRoutingActive(false);
                  if (polylineRef.current && mapInstanceRef.current) {
                    mapInstanceRef.current.removeLayer(polylineRef.current);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Right Sidebar: Selected Facility Card / List */}
        <div className="bg-white dark:bg-black p-4 overflow-y-auto flex flex-col justify-between space-y-4">
          
          {selectedFacility ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    selectedFacility.type === 'pharmacy' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {selectedFacility.type === 'pharmacy' ? '💊 Dorixona' : '🏥 Shifoxona'}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
                    {selectedFacility.name[language]}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedFacility(null);
                    setIsRoutingActive(false);
                    if (polylineRef.current && mapInstanceRef.current) {
                      mapInstanceRef.current.removeLayer(polylineRef.current);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={selectedFacility.imageUrl}
                alt={selectedFacility.name[language]}
                className="w-full h-36 object-cover rounded-2xl border border-slate-200 dark:border-neutral-800"
              />

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 text-teal-600 mr-2 shrink-0 mt-0.5" />
                  <span>{selectedFacility.address[language]} ({selectedFacility.district})</span>
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                  <span>{selectedFacility.workingHours.is24_7 ? '24/7 Ochiq' : selectedFacility.workingHours.weekdays}</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 text-teal-600 mr-2 shrink-0" />
                  <a href={`tel:${selectedFacility.phone}`} className="font-bold text-teal-600 hover:underline">
                    {selectedFacility.phone}
                  </a>
                </p>
              </div>

              {/* Action Buttons: Draw Route & Book Appointment */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-neutral-800">
                <button
                  onClick={() => handleDrawRoute(selectedFacility)}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2"
                >
                  <Route className="w-4 h-4" />
                  <span>Yo'nalish va Chiziq Tortish</span>
                </button>

                {onBookAppointment && (
                  <button
                    onClick={() => onBookAppointment(selectedFacility.id)}
                    className="w-full py-2.5 bg-slate-100 dark:bg-neutral-900 text-slate-900 dark:text-white font-bold text-xs rounded-xl border border-slate-200 dark:border-neutral-800 hover:bg-slate-200 transition text-center"
                  >
                    Qabulga yozilish
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-neutral-800">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Maskanlar ro'yxati ({filteredFacilities.length})
                </h3>
                <span className="text-[10px] text-slate-400">{selectedRegion}</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredFacilities.length === 0 ? (
                  <p className="text-xs text-slate-400 py-8 text-center">Ushbu hududda maskanlar topilmadi</p>
                ) : (
                  filteredFacilities.map(fac => (
                    <div
                      key={fac.id}
                      onClick={() => {
                        setSelectedFacility(fac);
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.flyTo([fac.coordinates.lat, fac.coordinates.lng], 14, { duration: 1 });
                        }
                      }}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 hover:bg-teal-50 dark:hover:bg-neutral-800 cursor-pointer transition border border-slate-200 dark:border-neutral-800 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                          fac.type === 'pharmacy' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {fac.type === 'pharmacy' ? '💊' : '🏥'}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 line-clamp-1">
                            {fac.name[language]}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {fac.district} • {fac.workingHours.is24_7 ? '24/7' : 'Ochiq'}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
