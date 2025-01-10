import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const StationsMap = ({ stations }) => {
  return (
    // <MapContainer center={[55.885230937994756, -4.298976632058913]} zoom={13} style={{ height: "400px", width: "100%" }}>
    <MapContainer center={[55.871751, -4.28836]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]}>
          <Popup>
            <strong>{station.name}</strong>
            <br />
            Total: {station.number_of_available_vehicles} 
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StationsMap;