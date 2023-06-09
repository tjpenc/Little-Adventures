import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { getAllAdventuresAndDiscoveries } from '../api/mergedData';
import BigAdventureCard from '../components/cards/BigAdventureCard';
import BigDiscoveryCard from '../components/cards/BigDIscoveryCard';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  adventure_or_discovery: '',
  intensity: '',
  type: '',
  rating: 0,
};

export default function RandomAdventure() {
  const [formInput, setFormInput] = useState(initialState);
  const [objectsArray, setObjectsArray] = useState([]);
  const [randomObject, setRandomObject] = useState({});
  const [selectedObject, setSelectedObject] = useState({});
  const [triggerNewObj, setTriggerNewObj] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isFormSelectedOpen, setIsFormSelectedOpen] = useState(false);
  const [isSurpriseClicked, setIsSurpriseClicked] = useState(false);
  const { user } = useAuth();

  const getRandomObject = (array) => {
    const obj = array[Math.floor(Math.random() * array.length)];
    return obj;
  };

  const filterOutUserObjects = (array) => array.filter((obj) => obj.uid !== user.uid && obj.isPublic);

  useEffect(() => {
    getAllAdventuresAndDiscoveries().then((objects) => {
      const filteredArray = filterOutUserObjects(objects);
      if (isSurpriseClicked) {
        setRandomObject(getRandomObject(filteredArray));
      }
    });
  }, [triggerNewObj]);

  useEffect(() => {
    getAllAdventuresAndDiscoveries().then((objects) => {
      const filteredArray = filterOutUserObjects(objects);
      setObjectsArray(filteredArray);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSurpriseMe = () => {
    setIsSurpriseClicked(true);
    setTriggerNewObj(!triggerNewObj);
    setTimeout(() => {
      setIsFormSelectedOpen(false);
      setIsSurpriseOpen(true);
    }, 150);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn(formInput);

    getAllAdventuresAndDiscoveries().then((objects) => {
      const filteredArray = filterOutUserObjects(objects);
      console.warn(filteredArray);
      setObjectsArray(filteredArray);
      console.warn(objectsArray);
    }).then(() => {
      if (formInput.adventure_or_discovery === 'adventure') {
        const array = objectsArray.filter((obj) => obj.title);
        setObjectsArray(array);
      } else if (formInput.adventure_or_discovery === 'discovery') {
        const array = objectsArray.filter((obj) => obj.name);
        setObjectsArray(array);
      }

      if (formInput.intensity) {
        const array = objectsArray.filter((obj) => obj.intensity === formInput.intensity);
        setObjectsArray(array);
      }

      if (formInput.type) {
        const array = objectsArray.filter((obj) => obj.type === formInput.type);
        setObjectsArray(array);
      }

      if (formInput.rating) {
        const array = objectsArray.filter((obj) => obj.rating === formInput.rating);
        setObjectsArray(array);
      }

      if (objectsArray.length > 0) {
        setSelectedObject(getRandomObject(objectsArray));
      } else {
        console.warn('nothing matches these criteria');
      }
      console.warn('filtering');
    }).then(() => {
      console.warn('rendering');
      setIsSurpriseOpen(false);
      setIsFormSelectedOpen(true);
    });
  };

  return (
    <RandomContainer className="main_container">
      <RandomContentContainer>
        <Form>
          <FloatingLabel controlId="floatingInput1" label="Adventure or Discovery?" className="mb-3">
            <Form.Select
              type="text"
              placeholder="Adventure or Discovery?"
              name="adventure_or_discovery"
              value={formInput.adventure_or_discovery}
              onChange={handleChange}
            >
              <option value="">Adventure or Discovery?</option>
              <option value="adventure">Adventure</option>
              <option value="discovery">Discovery</option>
            </Form.Select>
          </FloatingLabel>

          {formInput.adventure_or_discovery === 'discovery' || formInput.type
            ? (
              <FloatingLabel controlId="floatingInput1" label="Intensity" className="mb-3">
                <Form.Select
                  type="text"
                  placeholder="Intensity"
                  name="intensity"
                  value={formInput.intensity}
                  onChange={handleChange}
                  disabled
                  readOnly
                >
                  <option value="">Select an Intensity</option>
                </Form.Select>
              </FloatingLabel>
            )
            : (
              <FloatingLabel controlId="floatingInput1" label="Intensity" className="mb-3">
                <Form.Select
                  type="text"
                  placeholder="Intensity"
                  name="intensity"
                  value={formInput.intensity}
                  onChange={handleChange}
                >
                  <option value="">Select an Intensity</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Form.Select>
              </FloatingLabel>
            )}

          {formInput.adventure_or_discovery === 'adventure' || formInput.intensity
            ? (
              <FloatingLabel controlId="floatingInput1" label="Type" className="mb-3">
                <Form.Select
                  type="text"
                  placeholder="Discovery Name"
                  name="type"
                  value={formInput.type}
                  onChange={handleChange}
                  disabled
                  readOnly
                >
                  <option value="">Select a Type</option>
                </Form.Select>
              </FloatingLabel>
            )
            : (
              <FloatingLabel controlId="floatingInput1" label="Type" className="mb-3">
                <Form.Select
                  type="text"
                  placeholder="Discovery Name"
                  name="type"
                  value={formInput.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Type</option>
                  <option value="Flora">Flora</option>
                  <option value="Fauna">Fauna</option>
                  <option value="Landmark">Landmark</option>
                  <option value="Cryptid">Cryptid</option>
                </Form.Select>
              </FloatingLabel>
            )}

          <FloatingLabel controlId="floatingInput1" label="Rating" className="mb-3">
            <Form.Select
              type="text"
              placeholder="Rating"
              name="rating"
              value={formInput.rating}
              onChange={handleChange}
              required
            >
              <option value="">Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </FloatingLabel>

          <Button onClick={handleSurpriseMe}>Surprise Me</Button>
          <Button type="submit" onClick={handleSubmit}>Submit Form</Button>
        </Form>
      </RandomContentContainer>
      {isSurpriseOpen
        ? (
          <RandomContentContainer>
            {randomObject.title
              ? <BigAdventureCard key={randomObject.firebaseKey} adventureObj={randomObject} onUpdate={() => {}} />
              : <BigDiscoveryCard key={randomObject.firebaseKey} discoveryObj={randomObject} onUpdate={() => {}} />}
          </RandomContentContainer>
        )
        : ''}
      {isFormSelectedOpen
        ? (
          <RandomContentContainer>
            {selectedObject.title
              ? <BigAdventureCard key={selectedObject.firebaseKey} adventureObj={selectedObject} onUpdate={() => {}} />
              : <BigDiscoveryCard key={selectedObject.firebaseKey} discoveryObj={selectedObject} onUpdate={() => {}} />}
          </RandomContentContainer>
        )
        : ''}
    </RandomContainer>
  );
}

const RandomContainer = styled.div`
  border: solid black 3px;
`;

const RandomContentContainer = styled.div`
  border: solid black 3px;
  flex-basis: 50%;
`;
