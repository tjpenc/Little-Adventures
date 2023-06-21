import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Ratings({ obj }) {
  const [ratingArray, setRatingArray] = useState([]);
  const [ratingType, setRatingType] = useState('');
  const numSlots = Number(obj.rating);
  // const ratingArray = Array(numSlots).fill(null);
  const createRatingArray = () => {
    const array = [];
    for (let i = 0; i < numSlots; i++) {
      array.push(i);
    }
    setRatingArray(array);
  };

  const getRatingType = () => {
    if (obj.type) {
      if (obj.type === 'Flora' || obj.type === 'Fauna') {
        setRatingType('Rarity');
      } else if (obj.type === 'Landmark') {
        setRatingType('Neatness');
      } else {
        setRatingType('Spooks');
      }
    } else {
      setRatingType('Rating');
    }
  };

  useEffect(() => {
    createRatingArray();
    getRatingType();
  }, [obj]);

  return (
    <>
      {ratingType}: {ratingArray.map((i) => (
        <Image key={`${obj.firebaseKey}${i}`} src="/star.png" width="10px" height="10px" />
      ))}
    </>
  );
}

Ratings.propTypes = {
  obj: PropTypes.shape({
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
    type: PropTypes.string,
  }),
};

Ratings.defaultProps = {
  obj: {
    rating: '',
    firebaseKey: '',
    type: 'Rating',
  },
};
