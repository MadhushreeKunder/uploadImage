import { useState } from "react";
import "./styles.css";
import axios from "axios";

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "socialmedia");
    setLoading(true);

    const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
      method: "POST",
      body: data
    });
    const file = await response.json();
    console.log(file);

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="file" name="file" onChange={uploadImage}></input>
      <br />
      {loading ? (
        <h3>Loading..</h3>
      ) : (
        <img src={image} style={{ width: "20rem" }} />
      )}
    </div>
  );
}
