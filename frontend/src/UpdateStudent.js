import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const { ID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID", ID); // Access the ID parameter here
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:8081/update/" + ID, { Name, Email })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="container"
      style={{ backgroundColor: "#222", color: "#fff", minHeight: "100vh" }}
    >
      <h1 style={{ color: "#00adb5", marginBottom: "2rem" }}>UpdateStudent</h1>
      <h1 style={{ color: "#00adb5", marginBottom: "2rem" }}>ID :{ID}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ color: "#00adb5" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            style={{ backgroundColor: "#393e46", color: "#fff" }}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label"
            style={{ color: "#00adb5" }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: "#393e46", color: "#fff" }}
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#00adb5", borderColor: "#00adb5" }}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
