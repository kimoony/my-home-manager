

function ItemImage({ setFile, percent }) {

  // Handles input change event and updates state
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <span>{percent} "% 완료"</span>
    </div>
  );
}

export default ItemImage

