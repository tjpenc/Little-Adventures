import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function CardImages({ obj }) {
  const [alt, setAlt] = useState('');
  const [imageDiv, setImageDiv] = useState('');

  const getAlt = () => {
    if (obj.name) {
      setAlt(obj.name);
    } else if (obj.title) {
      setAlt(obj.title);
    }
  };

  const getStandInImage = () => {
    let image = '';
    if (!obj.imageUrl) {
      if (obj.title) {
        image = <Card.Img variant="top" src="/compass.png" alt={alt} style={{ height: '200px', objectFit: 'cover' }} />;
      } else if (obj.type === 'Flora') {
        image = <Card.Img variant="top" src="/flora.png" alt={alt} style={{ height: '200px', objectFit: 'cover' }} />;
      } else if (obj.type === 'Fauna') {
        image = <Card.Img variant="top" src="/fauna.png" alt={alt} style={{ height: '200px', objectFit: 'cover' }} />;
      } else if (obj.type === 'Landmark') {
        image = <Card.Img variant="top" src="/landmark.png" alt={alt} style={{ height: '200px', objectFit: 'cover' }} />;
      } else if (obj.type === 'Cryptid') {
        image = <Card.Img variant="top" src="/cryptid.png" alt={alt} style={{ height: '200px', objectFit: 'cover' }} />;
      }
    }
    setImageDiv(image);
  };

  useEffect(() => {
    getAlt();
    getStandInImage();
  }, [obj]);

  return (
    <>
      {obj.imageUrl
        ? <Card.Img variant="top" src={obj.imageUrl} alt={alt} style={{ height: '200px', objectFit: 'cover' }} />
        : imageDiv}
    </>
  );
}

CardImages.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

CardImages.defaultProps = {
  obj: {
    imageUrl: '',
    name: '',
    title: '',
    type: '',
  },
};
