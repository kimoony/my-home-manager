function ItemImage({ setFile, percent, imgUpload }) {
  // Handles input change event and updates state
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {/* <button onClick={imgUpload}>Upload</button> */}
      <span>{percent} "% 완료"</span>
    </div>
  );
}

export default ItemImage;
