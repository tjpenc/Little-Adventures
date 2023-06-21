// import { useState } from 'react';
import PropTypes from 'prop-types';
// import photoStorage from '../utils/photoStorage';

// Photo Upload component

export default function PhotoUploadInput({ setFile }) {
  // const [file, setFile] = useState(null);
  // const [isUploaded, setIsUploaded] = useState(false);

  // Handles selecting an image
  const handleChange = (e) => {
    console.warn(e.target.files[0]);
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleChange} />
        {/* <button type="button" color="green" onClick={handleUpload}>
          Upload Photo
        </button>
        {isUploaded && <span>File Uploaded!</span>} */}
      </div>
    </>
  );
}

PhotoUploadInput.propTypes = {
  // handleUpload: PropTypes.func.isRequired,
  // setImageUrl: PropTypes.func.isRequired,
  // setFilePath: PropTypes.func.isRequired,
  setFile: PropTypes.func.isRequired,
};
