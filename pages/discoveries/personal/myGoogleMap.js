import styled from 'styled-components';
import Map from '../../../components/Map';

export default function myGoogleMap() {
  return (
    <GoogleMapContainer>
      <h1>My Discovery Map</h1>
      <Map usersMap onClick={() => {}} />
    </GoogleMapContainer>
  );
}

const GoogleMapContainer = styled.div`
  height: 100vh;
  width: 100%;
`;
