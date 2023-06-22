import PropTypes from 'prop-types';

// Photo Upload component

export default function PhotoUploadInput({
  setFile, uploadBtn, handleUpload, isUploaded,
}) {
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
        {uploadBtn
        && <button type="button" color="green" onClick={handleUpload}>Upload Photo</button>}
        {isUploaded && <span> File Uploaded!</span>}
      </div>
    </>
  );
}

PhotoUploadInput.propTypes = {
  setFile: PropTypes.func.isRequired,
  handleUpload: PropTypes.func,
  uploadBtn: PropTypes.bool,
  isUploaded: PropTypes.bool,
};

PhotoUploadInput.defaultProps = {
  uploadBtn: false,
  isUploaded: false,
  handleUpload: () => {},
};
