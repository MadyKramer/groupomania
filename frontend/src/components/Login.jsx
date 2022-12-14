// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { decodeToken } from "react-jwt";
import axios from "axios";

const Login = () => {
  //STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthContext();

  //COMPORTEMENTS
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const userInfos = decodeToken(res.data.token);
        const userLogin = {
          id: userInfos.username.id,
          lastname: userInfos.username.lastname,
          firstname: userInfos.username.firstname,
          email: userInfos.username.email,
          workstation: userInfos.username.workstation,
          hasright: userInfos.username.hasright,
          avatar: userInfos.username.avatar,
          token: res.data.token,
        };
        setUser(userLogin);
        navigate("/feed");
      })

      .catch((err) => {
        emailError.innerHTML = err.response.data.message;
      });
  };

  //RENDER
  return (
    <form
      action=""
      onSubmit={handleLogin}
      className="formWrapper"
      id="loginForm"
    >
      <label htmlFor="email">E-mail</label>
      <input
        name="email"
        id="email"
        type="email"
        placeholder="E-mail"
        aria-label="Adresse email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="on"
      />
      <div className="email error"></div>
      <br />

      <label htmlFor="password">Mot de passe</label>
      <input
        name="password"
        id="password"
        aria-label="mot de passe"
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        autoComplete="on"
      />

      <br />
      <input type="submit" value="Connexion" className="loginBtn"></input>
    </form>
  );
};

export default Login;
