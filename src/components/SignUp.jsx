import React, { Component } from "react";
/*import { Jumbotron, Grid Row, Col, Image, Button } from "react-bootstrap";*/
import "./SignUp.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/
);

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class SignUp extends Component {
  //constructor(props) {
  //super(props);

  state = {
    first_name: null,
    last_name: null,
    email: null,
    designation: null,
    password: null,
    cpassword: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("http://localhost:8080/DefectTrackerSystem/saveUser", {
      method: "POST",
      headers: {
        Accept: "application/json,text/plain,*/*",
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    console.log("Name", name);
    console.log("value", value);

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 && value.length > 0
            ? "Minimun 3 characters required"
            : "";
        break;

      case "lastName":
        formErrors.lastName =
          value.length < 3 && value.length > 0
            ? "Minimun 3 characters required"
            : "";
        break;

      case "email":
        formErrors.email =
          emailRegex.test(value) && value.length > 0
            ? ""
            : "Invalid Email Address";
        break;

      case "password":
        formErrors.password =
          value.length < 6 && value.length > 0
            ? "Minimun 6 characters required"
            : "";
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>SignUp Form</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                id="first_name"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                id="last_name"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="designation">
              <label htmlFor="email">Designation</label>
              <select
                name="designation"
                id="designation"
                noValidate
                onChange={this.handleChange}
              >
                <option>Select Your Designation</option>
                <option>Software Engineer</option>
                <option>Senior Software Engineer</option>
                <option>QA Engineer</option>
                <option>Senior QA Engineer</option>
              </select>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="cpassword">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Password"
                name="cpassword"
                id="cpassword"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
