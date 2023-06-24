import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';

export default function Slider({ obj }) {
  const listRef = useRef(null);
  const indexCounterRef = useRef(0);
  const [alt, setAlt] = useState('');
  console.warn(typeof obj.extraPictures);

  useEffect(() => {
    if (obj.title) {
      setAlt(obj.title);
    } else if (obj.name) {
      setAlt(obj.name);
    }
  }, [obj, obj.extraPictures]);

  const scrollToIndex = (index) => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll('li > img')[index];
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const scrollUp = () => {
    if (indexCounterRef.current > 0) {
      indexCounterRef.current -= 1;
      scrollToIndex(indexCounterRef.current);
    }
  };

  const scrollDown = () => {
    if (indexCounterRef.current < obj.extraPictures.length) {
      indexCounterRef.current += 1;
      scrollToIndex(indexCounterRef.current);
    }
  };
  return (
    <>
      {obj.extraPictures
      && (
      <>
        <button type="button" onClick={scrollUp}>Up</button>
        <button type="button" onClick={scrollDown}>Down</button>
      </>
      )}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <ul ref={listRef}>
          <li>
            <Card.Img variant="top" src={obj.imageUrl} alt={alt} style={{ height: '200px' }} />
          </li>
          {obj.extraPictures
            ? obj.extraPictures.map((image) => (
              <li>
                <Card.Img key={`${image.firebaseKey}${image.imageUrl}`} variant="top" src={image.imageUrl} alt={alt} style={{ height: '200px' }} />
              </li>
            ))
            : ''}
        </ul>
      </div>
    </>
  );
}

Slider.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    firebaseKey: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    extraPictures: PropTypes.shape([
      {
        imageUrl: PropTypes.string,
        filePath: PropTypes.string,
      },
    ]),
  }),
};

Slider.defaultProps = {
  obj: {
    title: '',
    name: '',
    extraPictures: [
      {
        imageUrl: '',
        filePath: '',
      },
    ],
  },
};
