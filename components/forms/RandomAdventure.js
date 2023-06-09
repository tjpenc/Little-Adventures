// import { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Button, Form, FloatingLabel } from 'react-bootstrap';
// import { getAllAdventures } from '../../api/adventuresData';
// import { useAuth } from '../../utils/context/authContext';
// import { getAllDiscoveries } from '../../api/discoveriesData';
// import BigAdventureCard from '../cards/BigAdventureCard';
// import BigDiscoveryCard from '../cards/BigDIscoveryCard';

// const initialState = {
//   adventure_or_discovery: '',
//   // intensity: '',
//   // type: '',
//   // rating: '',
// };

// export default function RandomAdventureForm() {
//   const [adventures, setAdventures] = useState([]);
//   const [discoveries, setDiscoveries] = useState([]);
//   const [objectArray, setObjectArray] = useState([]);
//   const [object, setObject] = useState([]);
//   const [adventureOrDiscovery, setAdventureOrDiscovery] = useState(0);
//   const [formInput, setFormInput] = useState(initialState);

//   const { user } = useAuth();

//   const decideAdventureOrDiscovery = () => {
//     // 1 is adventure, 0 is discovery
//     const randomNum = Math.floor(Math.random() * 2);
//     setAdventureOrDiscovery(randomNum);
//   };

//   useEffect(() => {
//     decideAdventureOrDiscovery();
//   }, [object]);

//   const filterAll = (array) => {
//     const filteredArray = array.filter((element) => element.isPublic === true && element.uid !== user.uid);
//     return filteredArray;
//   };

//   const getAdventuresAndDiscoveries = () => {
//     getAllAdventures().then((adventuresArray) => {
//       setAdventures(filterAll(adventuresArray));
//     });
//     getAllDiscoveries().then((discoveriesArray) => {
//       setDiscoveries(filterAll(discoveriesArray));
//     });
//   };

//   useEffect(() => {
//     getAdventuresAndDiscoveries();
//   }, []);

//   useEffect(() => {
//     setObjectArray(adventures.concat(discoveries));
//   }, [adventures, discoveries]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const selectRandomObject = (array) => {
//     const selectedObject = array[Math.floor(Math.random() * array.length)];
//     const newArray = [selectedObject];
//     return newArray;
//   };

//   // const filterByIntensity = (array) => {
//   //   array.filter((element) => element.intensity === formInput.intensity);
//   //   setObjectArray(array);
//   // };

//   // const filterByType = (array) => {
//   //   array.filter((element) => element.type === formInput.type);
//   //   setObjectArray(array);
//   // };

//   // const filterByRating = (array) => {
//   //   array.filter((element) => element.rating === formInput.rating);
//   //   setObjectArray(array);
//   // };

//   // const filterAllRatings = (array, input) => {
//   //   const filteredArray = array.filter((element) => element.isPublic === true && element.uid !== user.uid && element.rating === input.rating);
//   //   setObjectArray(filteredArray);
//   // };

//   // const handleSurpriseMe = (input) => {
//   //   if (adventureOrDiscovery) {
//   //     setFormInput({ adventure_or_discovery: 'adventure' });
//   //     getAllAdventures().then((adventuresArray) => {
//   //       setObjectArray(adventuresArray);
//   //     });
//   //   } else {
//   //     setFormInput({ adventure_or_discovery: 'discovery' });
//   //     getAllDiscoveries().then((discoveriesArray) => {
//   //       setObjectArray(discoveriesArray);
//   //     });
//   //   }

//   //     if (input) {
//   //       filterAllRatings(objectArray, input);
//   //     } else {
//   //       filterAll(objectArray);
//   //     }

//   //   if (objectArray.length > 1) {
//   //     const selectedObject = selectRandomObject(objectArray);
//   //     setObject(selectedObject);
//   //   } else {
//   //     setObject(objectArray[0]);
//   //   }
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const resolveFinalArray = () => {
//       if (objectArray.length > 1) {
//         setObject(selectRandomObject(objectArray));
//       } else if (objectArray.length === 1) {
//         setObject(objectArray[0]);
//       } else {
//         console.warn('no object is found');
//       }
//     };

//     if (formInput.adventure_or_discovery === 'adventure' || formInput.intensity) {
//       getAllAdventures().then((adventuresArray) => {
//         setAdventureOrDiscovery(1);
//         setObjectArray(adventuresArray);
//         resolveFinalArray();
//       });
//     } else if (formInput.adventure_or_discovery === 'discovery' || formInput.type) {
//       getAllDiscoveries().then((discoveriesArray) => {
//         setAdventureOrDiscovery(0);
//         setObjectArray(discoveriesArray);
//         resolveFinalArray();
//       });
//     } else if (formInput.rating) {
//       // handleSurpriseMe(formInput);
//     }
//   };

//   return (
//     <>
//       <RandomFormContainer>
//         <Form onSubmit={handleSubmit}>
//           <FloatingLabel controlId="floatingInput1" label="Adventure or Discovery" className="mb-3">
//             <Form.Select
//               type="text"
//               placeholder="Adventure or Discovery"
//               name="adventure_or_discovery"
//               value={formInput.adventure_or_discovery}
//               onChange={handleChange}
//             >
//               <option value="">Adventure or Discovery?</option>
//               <option value="adventure">Adventure</option>
//               <option value="discovery">Discovery</option>
//             </Form.Select>
//           </FloatingLabel>

//           <FloatingLabel controlId="floatingInput1" label="Intensity" className="mb-3">
//             <Form.Select
//               type="text"
//               placeholder="Intensity"
//               name="intensity"
//               value={formInput.intensity}
//               onChange={handleChange}
//             >
//               <option value="">Select an Intensity</option>
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </Form.Select>
//           </FloatingLabel>

//           <FloatingLabel controlId="floatingInput1" label="Type" className="mb-3">
//             <Form.Select
//               type="text"
//               placeholder="Discovery Name"
//               name="type"
//               value={formInput.type}
//               onChange={handleChange}
//             >
//               <option value="">Select a Type</option>
//               <option value="Flora">Flora</option>
//               <option value="Fauna">Fauna</option>
//               <option value="Landmark">Landmark</option>
//               <option value="Cryptid">Cryptid</option>
//             </Form.Select>
//           </FloatingLabel>

//           <FloatingLabel controlId="floatingInput1" label="Rating" className="mb-3">
//             <Form.Select
//               type="text"
//               placeholder="Rating"
//               name="rating"
//               value={formInput.rating}
//               onChange={handleChange}
//             >
//               <option value="">Rating</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </Form.Select>
//           </FloatingLabel>

//           {/* <Button onClick={handleSurpriseMe}>Surprise Me!</Button> */}
//           <Button type="submit">Find an Adventure</Button>
//         </Form>
//       </RandomFormContainer>
//       <RandomResultContainer>
//         {object?.map((obj) => (
//           formInput.adventure_or_discovery === 'adventure'
//             ? <BigAdventureCard key={obj.firebaseKey} adventureObj={obj} onUpdate={() => {}} />
//             : <BigDiscoveryCard key={obj.firebaseKey} discoveryObj={obj} onUpdate={() => {}} />
//         ))}
//       </RandomResultContainer>
//     </>
//   );
// }

// const RandomFormContainer = styled.div`
// `;

// const RandomResultContainer = styled.div`
// `;
