import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// import { deleteSingleAdventure } from '../../api/adventuresData';
import { useEffect, useRef, useState } from 'react';
import { deleteDiscoveriesOfAdventure } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import { AddToExploreContainer } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';
import photoStorage from '../../utils/photoStorage';
import Ratings from '../Ratings';
import PhotoUploadInput from '../PhotoUploadInput';
import { updateAdventure } from '../../api/adventuresData';

export default function BigAdventureCard({ adventureObj }) {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(true);
  const listRef = useRef(null);
  const indexCounterRef = useRef(0);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsUploaded(false);
  }, []);

  const deleteThisAdventure = () => deleteDiscoveriesOfAdventure(adventureObj.firebaseKey)
    .then(adventureObj.filePath && photoStorage.delete(adventureObj.filePath))
    .then(() => {
      router.push('/adventures/personal/myAdventures');
    });

  const scrollToIndex = (index) => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll('li > img')[index];
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const extraPictures = [
    {
      filePath: '/compass.png',
      imageUrl: '/compass.png',
    },
    {
      filePath: '/cryptid.png',
      imageUrl: '/cryptid.png',
    },
    {
      filePath: 'string',
      imageUrl: '/tree.png',
    },
  ];

  const scrollUp = () => {
    if (indexCounterRef.current > 0) {
      indexCounterRef.current -= 1;
      scrollToIndex(indexCounterRef.current);
    }
  };

  const scrollDown = () => {
    if (indexCounterRef.current < extraPictures.length - 1) {
      indexCounterRef.current += 1;
      scrollToIndex(indexCounterRef.current);
    }
  };

  const handleUpload = () => {
    photoStorage.upload(file).then((imageObj) => {
      if (adventureObj.extraPictures) {
        const newArray = adventureObj.extraPictures.push(imageObj);
        const payload = { extraPictures: newArray, firebaseKey: adventureObj.firebaseKey };
        updateAdventure(payload).then(setIsUploaded(true));
      } else {
        const newArray = [imageObj];
        const payload = { extraPictures: newArray, firebaseKey: adventureObj.firebaseKey };
        updateAdventure(payload).then(setIsUploaded(true));
      }
    });
  };

  return (
    <>
      <BigAdventureCardContainer>
        <Card style={{ width: '18rem', margin: '10px' }}>
          {adventureObj.uid !== user.uid
            ? <AddToExploreContainer><AddToExploreButton firebaseKey={adventureObj.firebaseKey} isDiscovery={false} /></AddToExploreContainer>
            : ''}
          <button type="button" onClick={scrollUp}>Up</button>
          <button type="button" onClick={scrollDown}>Down</button>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <ul ref={listRef}>
              <li>
                <Card.Img variant="top" src={adventureObj.imageUrl} alt={adventureObj.title} style={{ height: '200px' }} />
              </li>
              {adventureObj.extraPictures
                ? adventureObj.extraPictures.map((image) => (
                  <li>
                    <Card.Img variant="top" src={image.imageUrl} alt={adventureObj.title} style={{ height: '200px' }} />
                  </li>
                ))
                : ''}
            </ul>
          </div>
          <Card.Body>
            <Card.Title>{adventureObj.title}</Card.Title>
            <Card.Text>Intesity: {adventureObj.intensity}</Card.Text>
            <Card.Text>Details: {adventureObj.details}</Card.Text>
            <Card.Text><Ratings obj={adventureObj} /></Card.Text>
            {adventureObj.uid !== user.uid ? '' : (
              <>
                <Link href={`/adventures/personal/edit/${adventureObj.firebaseKey}`} passHref>
                  <Button variant="info">EDIT</Button>
                </Link>
                <Button variant="danger" onClick={deleteThisAdventure} className="m-2">
                  DELETE
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      </BigAdventureCardContainer>
      <PhotoUploadInput uploadBtn setFile={setFile} handleUpload={handleUpload} isUploaded={isUploaded} />
    </>
  );
}

BigAdventureCard.propTypes = {
  adventureObj: PropTypes.shape({
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    intensity: PropTypes.string,
    isCompleted: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.string,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    filePath: PropTypes.string,
    extraPictures: PropTypes.shape([
      {
        imageUrl: PropTypes.string,
        filePath: PropTypes.string,
      },
    ]),
  }),
};

BigAdventureCard.defaultProps = {
  adventureObj: {
    details: 'Adventure Details',
    firebaseKey: 'FirebaseKey',
    imageUrl: 'Image',
    intensity: 'Intensity',
    isCompleted: true,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: '3',
    timeSubmitted: 'Time Submitted',
    title: 'Adventure Title',
    uid: 'UID',
    filePath: '',
    extraPictures: [
      {
        imageUrl: '',
        filePath: '',
      },
    ],
  },
};

const BigAdventureCardContainer = styled.div`
  width: 500px;
  height: 1000px;
  display: flex;
  border: solid black 2px;
  align-items: center;
`;
