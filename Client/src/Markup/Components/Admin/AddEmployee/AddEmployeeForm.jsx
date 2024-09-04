import React, { useState } from "react";
//import services
import employeeService from "../../../../services/employee.service";
function EmployeeRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    if (file) {
      formData.append("file", file);
    }

    try {
      const token = localStorage.getItem("employee");
      console.log(token);
      const result = await employeeService.createEmployee(formData, token);
      if (result.status === "true") {
        setMsg("Employee Registered Successfully");
      } else {
        setMsg("Error: " + result.message);
      }
    } catch (error) {
      setMsg("Error: Could not register employee");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 60 }}>
      <div className="row">
        <h1>Employee Registration</h1>
        <div className="col-12">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Phone Number"
            autoComplete="off"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Role</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Upload Photo</label>
          <input
            className="form-control form-control-lg"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Register
        </button>
        <h1
          style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}
        >
          {msg}
        </h1>
      </div>
    </div>
  );
}

export default EmployeeRegister;
