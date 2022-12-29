import React, { useState } from "react";
import PropTypes from "prop-types";
import MyForm from "../UI/MyForm/MyForm";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Auth({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      email,
      phone,
      password,
    });
    setToken(token);
    if (token.error) {
      alert(token.error);
    } else {
      alert("You succesfully signed up!!!");
    }
  };

  return (
    <MyForm
      handleSubmit={handleSubmit}
      setUserName={setUserName}
      setEmail={setEmail}
      setPhone={setPhone}
      setPassword={setPassword}
    />
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};
