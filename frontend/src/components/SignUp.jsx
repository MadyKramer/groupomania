import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//STATE
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  //COMPORTEMENTS
  const handleRegistrer = async (e) => {
    e.preventDefault();
    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const workstationError = document.querySelector(".workstation.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
      data: {
        firstName,
        lastName,
        workstation,
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          firstNameError.innerHTML = res.data.error.firstName;
          lastNameError.innerHTML = res.data.error.lastName;
          workstationError.innerHTML = res.data.error.workstation;
          emailError.innerHTML = res.data.error.email;
          passwordError.innerHTML = res.data.error.password;
        } else {
          navigate('/')
        }
      })
      .catch((err) => console.log(err));
  };

  //RENDER
  return (
    <form
      action=""
      className="formWrapper"
      onSubmit={handleRegistrer}
      id="SignUpForm"
    >
      {/* <input name="avatar" id="avatar" className="avatar" type="file" /> */}
      <label htmlFor="firstName"></label>
      <input
        name="firstName"
        id="firstName"
        className="firstName"
        type="text"
        placeholder="Prénom"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <div className="firstName error"></div>
      <br />
      <label htmlFor="lastName"></label>
      <input
        name="lastName"
        id="lastName"
        className="lastName"
        type="text"
        placeholder="Nom"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <div className="lastName error"></div>
      <br />
      <label htmlFor="workstation"></label>
      <input
        name="workStation"
        id="workStation"
        className="workStation"
        type="text"
        placeholder="Poste Occupé"
        onChange={(e) => setWorkstation(e.target.value)}
        value={workstation}
      />
      <div className="workstation error"></div>
      <br />
      <label htmlFor="email"></label>
      <input
        name="email"
        id="email"
        className="email"
        type="email"
        placeholder="E-mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password"></label>
      <input
        name="password"
        id="password"
        className="password"
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Inscription" className="loginBtn"></input>
    </form>
  );
};

export default SignUp;
