import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createAdventure, updateAdventure } from '../../api/adventuresData';

const initialState = {
  details: '',
  firebaseKey: '',
  imageUrl: '',
  intensity: '',
  toBeDiscovered: false,
  isPublic: false,
  parentAdventureId: '',
  rating: 0,
  timeSubmitted: '',
  title: '',
  uid: '',
};

export default function AdventureForm({ adventureObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (adventureObj.firebaseKey) setFormInput(adventureObj);
  }, [adventureObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adventureObj.firebaseKey) {
      updateAdventure(formInput).then(() => router.push(`/adventures/personal/${adventureObj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, timeSubmitted: Date().toString() };
      createAdventure(payload).then(() => router.push('/adventures/personal/myAdventures'));
    }
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
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
            label="To Be Completed?"
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
          <Button type="submit">Submit and View Adventures</Button>
          {/* {!adventureObj ? <Button type="submit">Add Some Discoveries!</Button> : ''} */}
          <Link href="/adventures/personal/myAdventures" passHref>
            <Button>Cancel</Button>
          </Link>
        </SubmitButtonContainer>
      </Form>
    </FormInputContainer>
  );
}

AdventureForm.propTypes = {
  adventureObj: PropTypes.shape({
    details: PropTypes.string,
    firebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
    intensity: PropTypes.string,
    toBeDiscovered: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.number,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
  }),
};

AdventureForm.defaultProps = {
  adventureObj: {
    details: 'Adventure Details',
    firebaseKey: '',
    imageUrl: 'Image',
    intensity: 'Intensity',
    toBeDiscovered: true,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: 3,
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
