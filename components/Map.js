// eslint-disable-next-line import/no-extraneous-dependencies
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { clientCredentials } from '../utils/client';
import MapMarker from './MapMarker';
import { getAllDiscoveries, getUserDiscoveries } from '../api/discoveriesData';
import { useAuth } from '../utils/context/authContext';

const mapApiKey = clientCredentials.googleMapsApiKey;

export default function Map({ mapOnForm, onClick, usersMap }) {
  const [discoveries, setDiscoveries] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (usersMap) {
      getUserDiscoveries(user.uid).then((discoveriesArr) => {
        const foundDiscoveries = discoveriesArr.filter((discovery) => discovery.toBeDiscovered === false);
        setDiscoveries(foundDiscoveries);
      });
    } else {
      getAllDiscoveries().then(setDiscoveries);
    }
  }, []);

  const defaultProps = {
    center: {
      lat: 45,
      lng: -100,
    },
    zoom: 7,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{
      height: '70vh',
      width: '50%',
      marginLeft: '15%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      border: 'solid black 3px',
    }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={onClick}
      >
        {mapOnForm ? ''
          : discoveries?.map((discovery) => (
            <MapMarker key={discovery.firebaseKey} lat={discovery.lat} lng={discovery.lng} discoveryObj={discovery} />
          ))}
      </GoogleMapReact>
    </div>
  );
}

Map.propTypes = {
  mapOnForm: PropTypes.bool,
  usersMap: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Map.defaultProps = {
  mapOnForm: false,
  usersMap: false,
};
