import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

export default function Marker({ img }) {
  return (
    <Card style={{ width: '50px' }}>
      <Card.Img variant="top" src={img} alt="thing" style={{ height: '50px' }} />
    </Card>
  );
}

Marker.propTypes = {
  img: PropTypes.string.isRequired,
};
