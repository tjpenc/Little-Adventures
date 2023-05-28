// Create and Edit adventure form
// Create and Edit discovery form
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createDiscovery } from '../../api/discoveriesData';
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

export default function AdventureForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [adventures, setAdventures] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getUserAdventures(user.uid).then(setAdventures);
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid, timeSubmitted: Date().toString() };
    createDiscovery(payload).then(() => router.push('/discoveries/personal/myDiscoveries'));
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
            <option value="flora">Flora</option>
            <option value="fauna">Fauna</option>
            <option value="landmark">Landmark</option>
            <option value="cryptid">Cryptid</option>
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
            <option value="">Select an Adventure</option>
            <option value="none">None</option>
            {
              adventures.map((adventure) => (
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
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Select>
        </FloatingLabel>

        <CheckBoxesContainer>
          <FloatingLabel controlId="floatingInput1" label="Public" className="mb-3">
            <Form.Check
              className="text-white mb-3"
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
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput1" label="To Be Discovered?" className="mb-3">
            <Form.Check
              className="text-white mb-3"
              type="switch"
              id="toBeDiscovered"
              name="toBeDiscovered"
              label="To Be Discovered?"
              checked={formInput.toBeDiscovered}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  isDiscovered: e.target.checked,
                }));
              }}
            />
          </FloatingLabel>
        </CheckBoxesContainer>

        <SubmitButtonContainer>
          <Button type="submit">Submit and View Discoveries</Button>
          <Button type="submit">Add Another Discovery!</Button>
          <Link href="/discoveries/personal/myDiscoveries" passHref>
            <Button>Cancel</Button>
          </Link>
        </SubmitButtonContainer>
      </Form>
    </FormInputContainer>
  );
}

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
