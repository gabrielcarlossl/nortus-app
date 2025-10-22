'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapData } from '@/types';
import { getMapData } from '@/services/map.service';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * Componente para atualizar o centro e zoom do mapa
 */
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([center[1], center[0]], zoom);
  }, [center, zoom, map]);

  return null;
}

/**
 * Retorna o SVG do ícone baseado na categoria (paths do Lucide React)
 */
const getCategoryIconSvg = (category: string): string => {
  const svgBase =
    '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">';
  const svgClose = '</svg>';

  const iconPaths: Record<string, string> = {
    // MapPin icon - tourism
    tourism:
      '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    // Activity icon - sports
    sports: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    // Plane icon - transport
    transport:
      '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    // GraduationCap icon - education
    education: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    // Landmark icon - heritage
    heritage:
      '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    // Home icon
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    // Car icon
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    // Briefcase icon
    professional:
      '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  };

  const path = iconPaths[category] || iconPaths.tourism;
  return `${svgBase}${path}${svgClose}`;
};

/**
 * Cria um ícone customizado baseado na categoria
 */
const createCustomIcon = (color: string = '#3B82F6', category: string = 'default') => {
  const iconSvg = getCategoryIconSvg(category);

  const iconHtml = `
    <div class="leaflet-custom-marker" style="background-color: ${color}">
      ${iconSvg}
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-wrapper',
    iconSize: [46, 46],
    iconAnchor: [23, 23],
    popupAnchor: [0, -23],
  });
};

/**
 * @description Componente de mapa de clientes por região
 */
export function MapChart() {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        const data = await getMapData();
        setMapData(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do mapa');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  const filteredLocations = mapData?.locations.filter(location => {
    const locationMatch = selectedLocation === 'all' || location.id === selectedLocation;
    const categoryMatch = selectedCategory === 'all' || location.category === selectedCategory;
    return locationMatch && categoryMatch;
  });

  // Extrair categorias únicas
  const categories = Array.from(new Set(mapData?.locations.map(loc => loc.category) || []));

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Carregando mapa...</div>
      </div>
    );
  }

  if (error || !mapData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-400">{error || 'Erro ao carregar o mapa'}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Filtros */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="all">Todos os locais</option>
          {mapData.locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-[#0f1623] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="all">Todos os tipos</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Mapa */}
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-700">
        <MapContainer
          center={[mapData.center[1], mapData.center[0]]}
          zoom={mapData.zoom}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater center={mapData.center} zoom={mapData.zoom} />

          {filteredLocations?.map(location => (
            <Marker
              key={location.id}
              position={[location.coordinates[1], location.coordinates[0]]}
              icon={createCustomIcon(location.color, location.category)}
            >
              <Popup>
                <div className="text-gray-900">
                  <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                  <p className="text-sm mb-2">{location.description}</p>
                  {location.address && <p className="text-xs text-gray-600">{location.address}</p>}
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {location.category}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legenda */}
      <div className="mt-4 flex gap-4 flex-wrap">
        {categories.map(category => {
          const location = mapData.locations.find(loc => loc.category === category);
          const iconSvg = getCategoryIconSvg(category);

          return (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                style={{ backgroundColor: location?.color || '#3B82F6' }}
                dangerouslySetInnerHTML={{
                  __html: iconSvg.replace('width="22" height="22"', 'width="16" height="16"'),
                }}
              />
              <span className="text-sm text-gray-400">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
