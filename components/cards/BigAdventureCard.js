import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { deleteDiscoveriesOfAdventure } from '../../api/mergedData';
import { useAuth } from '../../utils/context/authContext';
import { BasicButton, TitleContainer } from '../../styles/commonStyles';
import AddToExploreButton from '../buttons/AddToExploreButton';
import photoStorage from '../../utils/photoStorage';
import Ratings from '../Ratings';
import CardImages from '../CardImages';
// import PhotoUploadInput from '../PhotoUploadInput';
// import { updateAdventure } from '../../api/adventuresData';
// import Slider from '../Slider';

export default function BigAdventureCard({ adventureObj }) {
  // const [file, setFile] = useState(null);
  // const [isUploaded, setIsUploaded] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   setIsUploaded(false);
  // }, []);

  const deleteThisAdventure = () => deleteDiscoveriesOfAdventure(adventureObj.firebaseKey)
    .then(adventureObj.filePath && photoStorage.delete(adventureObj.filePath))
    .then(() => {
      router.push('/adventures/personal/myAdventures');
    });

  // const handleUpload = () => {
  //   photoStorage.upload(file).then((imageObj) => {
  //     if (adventureObj.extraPictures) {
  //       const existingPictures = adventureObj.extraPictures;
  //       const updatedPictures = { existingPictures, imageObj };
  //       const payload = { extraPictures: updatedPictures, firebaseKey: adventureObj.firebaseKey };
  //       updateAdventure(payload).then(setIsUploaded(true));
  //     } else {
  //       const payload = { extraPictures: imageObj, firebaseKey: adventureObj.firebaseKey };
  //       updateAdventure(payload).then(setIsUploaded(true));
  //     }
  //   });
  // };

  return (
    <>
      <BigAdventureCardContainer>
        <AdventureContainer>
          <ImageContainer>
            <CardImages obj={adventureObj} />
          </ImageContainer>
          {/* <Slider obj={adventureObj} /> */}
          <Container>
            <TitleContainer>
              <Card.Title>{adventureObj.title}</Card.Title>
            </TitleContainer>
            <InfoContainer>Intesity: {adventureObj.intensity}</InfoContainer>
            <InfoContainer>Details: {adventureObj.details}</InfoContainer>
            <InfoContainer><Ratings obj={adventureObj} /></InfoContainer>
            {adventureObj.uid !== user.uid ? <AddToExploreButton firebaseKey={adventureObj.firebaseKey} isDiscovery={false} /> : (
              <>
                <Link href={`/adventures/personal/edit/${adventureObj.firebaseKey}`} passHref>
                  <BasicButton variant="info">EDIT</BasicButton>
                </Link>
                <BasicButton variant="danger" onClick={deleteThisAdventure} className="m-2">
                  DELETE
                </BasicButton>
              </>
            )}
          </Container>
        </AdventureContainer>
      </BigAdventureCardContainer>
      {/* <PhotoUploadInput uploadBtn setFile={setFile} handleUpload={handleUpload} isUploaded={isUploaded} /> */}
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
    // extraPictures: PropTypes.shape([
    //   {
    //     imageUrl: PropTypes.string,
    //     filePath: PropTypes.string,
    //   },
    // ]),
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
    // extraPictures: [
    //   {
    //     imageUrl: '',
    //     filePath: '',
    //   },
    // ],
  },
};

const BigAdventureCardContainer = styled.div`
  width: 80%;
  height: 100%;
`;

const AdventureContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ImageContainer = styled.div`
 width: 20%;
 object-fit: cover;
`;

const Container = styled.div`
  width: 50%;
  margin-left: 10px;
`;

const InfoContainer = styled.div`
  margin: 7px;
  > .details {
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
