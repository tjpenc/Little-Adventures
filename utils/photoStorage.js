import { storage } from './client';

// NOTES!
// photoStorage.upload() --- 2 params ---> (bucket, file)

// bucket --> the name of the folder in firebase where
// your file should go.
// EX: "profile_images", "pet_photos"

// file ---> the file you are uploading

// photoStorage.delete() -- 1 param ---> (filepath)

// Deletes the file BUT don't forget to also delete the reference in your database
// `${bucket}/${file.name}`
const photoStorage = {
  upload(file) {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`images/${file.name}`);
      fileRef.put(file).then(() => {
        storage.ref('images').child(file.name).getDownloadURL().then((url) => {
          console.warn(url);
          const imageObj = { imageUrl: url, filePath: `images/${file.name}` };
          resolve(imageObj);
          // setImg(url);
          // setPath(`images/${file.name}`);
          // setUploadStatus(true);
        });
      })
        .catch(reject);
    });
  },
  delete(filepath) {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(filepath);
    fileRef.delete().then(console.warn('deleted file'))
      .catch((error) => console.warn(error));
  },
};

export default photoStorage;
