// Create and Edit discovery form
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createDiscovery, updateDiscovery } from '../../api/discoveriesData';
import { getUserAdventures } from '../../api/adventuresData';

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
};

export default function DiscoveryForm({ discoveryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getUserAdventures(user.uid).then(setAdventures);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (discoveryObj.firebaseKey) {
      updateDiscovery(formInput).then(() => router.push(`/discoveries/personal/${discoveryObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, timeSubmitted: Date().toString() };
      createDiscovery(payload).then(() => router.push('/discoveries/personal/myDiscoveries'));
    }
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

        <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Discovery Name"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
          />
        </FloatingLabel>

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
            <option value="">Where did you find this?</option>
            {/* <option value="none">None</option> */}
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
          <Button type="submit">Submit and View Discoveries</Button>
          {/* {!discoveryObj ? <Button type="submit">Add Another Discovery!</Button> : '' } */}
          <Link href="/discoveries/personal/myDiscoveries" passHref>
            <Button>Cancel</Button>
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
    isCompleted: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.string,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
  }),
};

DiscoveryForm.defaultProps = {
  discoveryObj: {
    details: 'Adventure Details',
    firebaseKey: '',
    imageUrl: 'Image',
    intensity: 'Intensity',
    isCompleted: true,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: '3',
    timeSubmitted: 'Time Submitted',
    title: 'Adventure Title',
    uid: 'UID',
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
