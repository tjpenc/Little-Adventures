// Create and Edit discovery form
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createDiscovery, updateDiscovery } from '../../api/discoveriesData';
import { getUserAdventures } from '../../api/adventuresData';
import Map from '../Map';
import { BasicButton } from '../../styles/commonStyles';
import PhotoUploadInput from '../PhotoUploadInput';
import photoStorage from '../../utils/photoStorage';

const initialState = {
  adventureId: '',
  details: '',
  firebaseKey: '',
  imageUrl: '',
  name: '',
  type: '',
  toBeDiscovered: false,
  isPublic: false,
  rating: 0,
  lng: 0,
  lat: 0,
  filePath: '',
};

export default function DiscoveryForm({ discoveryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [adventures, setAdventures] = useState([]);
  const [isMapShowing, setIsMapShowing] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [filePath, setFilePath] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getUserAdventures(user.uid).then((adventuresArray) => {
      const completedAdventures = adventuresArray.filter((adventure) => adventure.toBeExplored === false);
      setAdventures(completedAdventures);
    });
  }, [user.uid]);

  useEffect(() => {
    if (discoveryObj.firebaseKey) setFormInput(discoveryObj);
  }, [discoveryObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMapClick = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      lat: e.lat,
      lng: e.lng,
    }));
  };

  const toggleMap = () => {
    setIsMapShowing(!isMapShowing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateThisDiscovery = () => updateDiscovery(formInput).then(() => router.push(`/discoveries/personal/${discoveryObj.firebaseKey}`));
    photoStorage.upload(file, setImageUrl, setFilePath).then(() => {
      if (discoveryObj.firebaseKey) {
        if (discoveryObj.filePath !== formInput.filePath) {
          photoStorage.delete(discoveryObj.filePath).then(updateThisDiscovery);
        } else {
          updateThisDiscovery();
        }
      } else {
        const payload = {
          ...formInput,
          uid: user.uid,
          timeSubmitted: Date().toString(),
          imageUrl,
          filePath,
        };
        createDiscovery(payload).then(() => router.push('/discoveries/personal/myDiscoveries'));
      }
    });
  };

  return (
    <FormInputContainer>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Discovery Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Discovery Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Description" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Discovery Name"
            name="details"
            value={formInput.details}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        {/* <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Discovery Name"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
          />
        </FloatingLabel> */}

        <PhotoUploadInput setFile={setFile} />

        <FloatingLabel controlId="floatingInput1" label="Type" className="mb-3">
          <Form.Select
            type="text"
            placeholder="Discovery Name"
            name="type"
            value={formInput.type}
            onChange={handleChange}
            required
          >
            <option>Select a Type</option>
            <option value="Flora">Flora</option>
            <option value="Fauna">Fauna</option>
            <option value="Landmark">Landmark</option>
            <option value="Cryptid">Cryptid</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Adventure">
          <Form.Select
            aria-label="Adventure"
            name="adventureId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.adventureId}
            required
          >
            <option value="">Which adventure was this on?</option>
            <option value="none">None</option>
            {
              adventures?.map((adventure) => (
                <option
                  key={adventure.firebaseKey}
                  value={adventure.firebaseKey}
                >
                  {adventure.title}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Rating" className="mb-3">
          <Form.Select
            type="text"
            placeholder="Rating"
            name="rating"
            value={formInput.rating}
            onChange={handleChange}
            required
          >
            <option>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Select>
        </FloatingLabel>

        <CheckBoxesContainer>
          <FloatingLabel controlId="floatingInput1" label="Latitude" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Latitude"
              name="lat"
              value={formInput.lat}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="Longitude" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Longitude"
              name="lng"
              value={formInput.lng}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          {isMapShowing
            ? <><BasicButton onClick={toggleMap}>Close map</BasicButton> <Map mapOnForm onClick={handleMapClick} style={{}} /></>
            : <BasicButton onClick={toggleMap}>See map</BasicButton>}
        </CheckBoxesContainer>

        <CheckBoxesContainer>
          <Form.Check
            className="text-black mb-3"
            type="switch"
            id="isPublic"
            name="isPublic"
            label="Public?"
            checked={formInput.isPublic}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                isPublic: e.target.checked,
              }));
            }}
          />

          <Form.Check
            className="text-black mb-3"
            type="switch"
            id="toBeDiscovered"
            name="toBeDiscovered"
            label="To Be Discovered?"
            checked={formInput.toBeDiscovered}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                toBeDiscovered: e.target.checked,
              }));
            }}
          />
        </CheckBoxesContainer>

        <SubmitButtonContainer>
          <BasicButton type="submit">Submit and View Discoveries</BasicButton>
          <Link href={!discoveryObj.toBeDiscovered ? '/discoveries/personal/myDiscoveries' : '/toExplore/discoveries'} passHref>
            <BasicButton>Cancel</BasicButton>
          </Link>
        </SubmitButtonContainer>
      </Form>
    </FormInputContainer>
  );
}

DiscoveryForm.propTypes = {
  discoveryObj: PropTypes.shape({
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    intensity: PropTypes.string,
    toBeDiscovered: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.string,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    filePath: PropTypes.string,
  }),
};

DiscoveryForm.defaultProps = {
  discoveryObj: {
    details: 'Adventure Details',
    firebaseKey: '',
    imageUrl: 'Image',
    intensity: 'Intensity',
    toBeDiscovered: false,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: '3',
    timeSubmitted: 'Time Submitted',
    title: 'Adventure Title',
    uid: 'UID',
    filePath: '',
  },
};

const FormInputContainer = styled.div`
`;

const CheckBoxesContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SubmitButtonContainer = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
`;
