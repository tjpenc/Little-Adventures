import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel } from 'react-bootstrap';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createAdventure, updateAdventure } from '../../api/adventuresData';
import { BasicButton } from '../../styles/commonStyles';
import PhotoUploadInput from '../PhotoUploadInput';
import photoStorage from '../../utils/photoStorage';

const initialState = {
  details: '',
  firebaseKey: '',
  imageUrl: '',
  intensity: '',
  toBeExplored: false,
  isPublic: false,
  parentAdventureId: '',
  rating: '0',
  timeSubmitted: '',
  title: '',
  uid: '',
  filePath: '',
  extraPictures: [{
    imageUrl: '',
    filePath: '',
  }],
};

export default function AdventureForm({ adventureObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [file, setFile] = useState(null);
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

  const mutateFormInput = (newSource) => {
    const newInput = formInput;
    delete newInput.imageUrl;
    delete newInput.filePath;
    newInput.imageUrl = newSource.imageUrl;
    newInput.filePath = newSource.filePath;
    return newInput;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateThisAdventure = () => updateAdventure(formInput).then(() => router.push(`/adventures/personal/${adventureObj.firebaseKey}`));
    const createThisAdventure = (payload) => createAdventure(payload).then(() => router.push('/adventures/personal/myAdventures'));
    if (adventureObj.firebaseKey && file) {
      photoStorage.upload(file).then((imageObj) => {
        photoStorage.delete(adventureObj.filePath);
        updateThisAdventure(mutateFormInput(imageObj));
      });
    } else if (adventureObj.firebaseKey) {
      updateThisAdventure();
    } else if (file) {
      photoStorage.upload(file, user.uid).then((imageObj) => {
        const payload = {
          ...formInput,
          uid: user.uid,
          timeSubmitted: Date().toString(),
          imageUrl: imageObj.imageUrl,
          filePath: imageObj.filePath,
        };
        createThisAdventure(payload);
      });
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        timeSubmitted: Date().toString(),
      };
      createThisAdventure(payload);
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
        {/*
        <FloatingLabel controlId="floatingInput1" label="Image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Image"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
          />
        </FloatingLabel> */}

        <PhotoUploadInput setFile={setFile} />

        <FloatingLabel controlId="floatingInput1" label="Intensity" className="mb-3">
          <Form.Select
            type="text"
            placeholder="Intensity"
            name="intensity"
            value={formInput.intensity}
            onChange={handleChange}
            required
          >
            <option>Select an Intensity</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
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
            id="toBeExplored"
            name="toBeExplored"
            label="To Be Explored?"
            checked={formInput.toBeExplored}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                toBeExplored: e.target.checked,
              }));
            }}
          />
        </CheckBoxesContainer>

        <SubmitButtonContainer>
          <BasicButton type="submit">Submit Adventure</BasicButton>
          <Link href={!adventureObj.toBeExplored ? '/adventures/personal/myAdventures' : '/toExplore/adventures'} passHref>
            <BasicButton>Cancel</BasicButton>
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
    toBeExplored: PropTypes.bool,
    isPublic: PropTypes.bool,
    parentAdventureId: PropTypes.string,
    rating: PropTypes.string,
    timeSubmitted: PropTypes.string,
    title: PropTypes.string,
    uid: PropTypes.string,
    filePath: PropTypes.string,
  }),
};

AdventureForm.defaultProps = {
  adventureObj: {
    details: 'Adventure Details',
    firebaseKey: '',
    imageUrl: 'Image',
    intensity: 'Intensity',
    toBeExplored: false,
    isPublic: false,
    parentAdventureId: 'Parent Adventure Id',
    rating: '0',
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
