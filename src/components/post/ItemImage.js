// import React, { useState } from 'react';
import { storage } from '../../firebase';
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

// function ItemImage() {
//   // 이미지
//   const [image, setImage] = useState("");

//   const imgChange = (e) => {
//     e.preventDefault();
//     const file = e.tart.files[0];
//     setImage(file)
//   }



//   return (
//     <div>
//       <label>이미지 </label>
//       <input type="file" accept="image/*" src={image} />
//     </div>
//   )
// }

// export default ItemImage

import { useState, useEffect, useRef } from "react";


const FileInput = () => {
  const [file, setFile] = useState("");
  const [previewURL, setPreviewURL] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (file !== "") {
      setPreview(
        <img className="img_preview" src={previewURL} alt="previewImage" />
      );
    }
    return () => { };
  }, [file, previewURL]);

  const handleFileOnChange = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);

      saveToFirebaseStorage(file);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleFileButtonClick = e => {
    e.preventDefault();
    fileRef.current.click();
  };

  // 여기가 upload 함수입니다.
  const saveToFirebaseStorage = file => {
    const uniqueKey = new Date().getTime();
    const newName = file.name
      .replace(/[~`!#$%^&*+=\-[\]\\';,/{}()|\\":<>?]/g, "")
      .split(" ")
      .join("");

    const metaData = {
      contentType: file.type
    };

    const storageRef = sRef(storage, "Images/" + newName + uniqueKey);
    const UploadTask = uploadBytesResumable(storageRef, file, metaData);
    UploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        alert(`error: image upload error ${JSON.stringify(error)}`);
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then(downloadUrl => {
          console.log(`완료 url: ${downloadUrl}`);
        });
      }
    );
  };

  // 여기가 delete 코드입니다.
  const deleteFile = () => {
    const desertRef = sRef(storage, "Images/파일이름을넣어주세요");

    deleteObject(desertRef)
      .then(() => {
        console.log(`delete success`);
      })
      .catch(error => {
        console.log(`delete ${error}`);
      });
  };

  return (
    <div>
      <div className="priveiw-rapping">{preview}</div>
      <div style={{ padding: 10 }}>
        <input
          ref={fileRef}
          hidden={true}
          id="file"
          type="file"
          onChange={handleFileOnChange}
        ></input>

        <button onClick={handleFileButtonClick}>UPLOAD</button>
        <button onClick={deleteFile}>DELETE</button>
      </div>
    </div>
  );
};

export default FileInput;