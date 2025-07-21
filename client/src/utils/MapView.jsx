import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = () => {
  const position = [12.9716, 77.5946];

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={15} style={{ height: '300px', width: '100%', borderRadius: '10px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Your Restaurant Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
