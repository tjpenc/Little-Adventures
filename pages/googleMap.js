import styled from 'styled-components';
import Map from '../components/Map';

export default function GoogleMap() {
  return (
    <MapContainer>
      <Map onClick={() => {}} />
    </MapContainer>
  );
}

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
  border: solid black 3px;
`;
