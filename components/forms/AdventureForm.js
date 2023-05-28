// Create and Edit adventure form
// Create and Edit discovery form
import { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createAdventure } from '../../api/adventuresData';

const initialState = {
  details: '',
  firebaseKey: '',
  imageUrl: '',
  intensity: '',
  toBeCompleted: false,
  isPublic: false,
  parentAdventureId: '',
  rating: 0,
  timeSubmitted: '',
  title: '',
  uid: '',
};

export default function AdventureForm() {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

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
    createAdventure(payload).then(() => router.push('/adventures/personal/myAdventures'));
  };

  return (
    <FormInputContainer>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Adventure Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Adventure Details" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Adventure Details"
            name="details"
            value={formInput.details}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Image"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Intensity" className="mb-3">
          <Form.Select
            type="text"
            placeholder="Intensity"
            name="intensity"
            value={formInput.intensity}
            onChange={handleChange}
            required
          >
            <option>Select a Type</option>
            <option value="flora">Easy</option>
            <option value="fauna">Medium</option>
            <option value="landmark">Hard</option>
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

          <FloatingLabel controlId="floatingInput1" label="To Be Completed?" className="mb-3">
            <Form.Check
              className="text-white mb-3"
              type="switch"
              id="toBeCompleted"
              name="toBeCompleted"
              label="To Be Completed?"
              checked={formInput.toBeCompleted}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  toBeCompleted: e.target.checked,
                }));
              }}
            />
          </FloatingLabel>
        </CheckBoxesContainer>

        <SubmitButtonContainer>
          <Button type="submit">Submit and View Adventures</Button>
          <Button type="submit">Add Some Discoveries!</Button>
          <Link href="/adventures/personal/myAdventures" passHref>
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
