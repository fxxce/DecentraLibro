import React, { useState } from "react";

const Pinata_API_Key = process.env.REACT_APP_PINATA_API_KEY;
const pinata_SecretAPI_Key = process.env.REACT_APP_PINATA_API_SECRET;

const Input = ({ placeholder, name, type, value, handleChange, id }) => (
  <input
    id={id}
    name={name}
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e) => handleChange(e)}
    className="white-glassmorphism"
  />
);

const add_Book = ({ Add_Book }) => {
  const [title, set_title] = useState("");
  const [author, set_author] = useState("");
  const [avail_copies, set_available_copies] = useState("");
  const [pinata_CID, set_pinata_CID] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        set_title(value);
        break;
      case "author":
        set_author(value);
        break;
      case "avail_copies":
        set_available_copies(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify({ name: file.name }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: Pinata_API_Key,
          pinata_secret_api_key: pinata_SecretAPI_Key,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("File added to IPFS with CID:", result.IpfsHash);
      set_pinata_CID(result.IpfsHash);
    } else {
      console.error("Error uploading file to IPFS:", response.status);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !pinata_CID || !avail_copies) return;

    Add_Book(title, author, pinata_CID, avail_copies);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Book Title"
          name="title"
          type="text"
          value={title}
          handleChange={handleChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Input
          placeholder="Book Author"
          name="author"
          type="text"
          value={author}
          handleChange={handleChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Input
          placeholder="Number of Copies"
          name="avail_copies"
          type="number"
          value={avail_copies}
          handleChange={handleChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          placeholder="pdf here"
          type="file"
          id="pdfFileInput"
          accept="application/pdf"
          onChange={handleFileChange}
          className="white-glassmorphism"
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit} className="button">
        Add Book
      </button>
    </div>
  );
};

export default add_Book;