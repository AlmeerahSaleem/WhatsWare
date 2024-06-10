import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using Axios for HTTP requests

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    grade: "",
  });

  // Fetch student data from cloud database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "mongodb+srv://cluster0.hv31ji3.mongodb.net/WhatsWare-db/students"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("YOUR_CLOUD_DB_ENDPOINT/students", newStudent);
      setStudents([...students, newStudent]);
      setNewStudent({ name: "", age: "", grade: "" });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div>
      <h2>Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="age"
          value={newStudent.age}
          onChange={handleInputChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="grade"
          value={newStudent.grade}
          onChange={handleInputChange}
          placeholder="Grade"
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentTable;
