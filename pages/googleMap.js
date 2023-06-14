import styled from 'styled-components';
import Map from '../components/Map';

export default function GoogleMap() {
  return (
    <GoogleMapContainer>
      <h1>Discovery Map</h1>
      <Map onClick={() => {}} />
    </GoogleMapContainer>
  );
}

const GoogleMapContainer = styled.div`
  height: 100vh;
  width: 100%;
`;
