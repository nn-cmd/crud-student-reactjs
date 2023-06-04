import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/delete/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#222", color: "#fff", minHeight: "100vh" }}
    >
      <h1 style={{ color: "#00adb5" }}>Student List</h1>
      <Link to="/create" className="btn btn-success">
        Add+
      </Link>
      <table className="table table-dark mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.ID}>
              <td>{student.ID}</td>
              <td>{student.Name}</td>
              <td>{student.Email}</td>
              <td>
                <Link to={`/update/${student.ID}`} className="btn btn-primary">
                  Update
                </Link>
                <button
                  className="btn btn-danger ms-2"
                  onClick={(e) => handleDelete(student.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
