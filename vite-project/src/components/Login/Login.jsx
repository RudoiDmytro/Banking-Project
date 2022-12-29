import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { message } from "antd";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await loginUser({
      email,
      password,
    });
    setToken(token);

    if (token.error) {
      messageApi.open({
        type: "error",
        content: token.error,
        duration: 2.5,
      });
    } else {
      messageApi
        .open({
          type: "success",
          content: "You succesfully signed in!",
          duration: 2.5,
        })
        .then(() => navigate("/preferences"));
    }
  };

  return (
    <>
      {contextHolder}
      <div className={classes.form}>
        <div className={classes.title}>Please Sign In</div>
        <form onSubmit={handleSubmit}>
          <div className={`${classes.container} ${classes.ic1}`}>
            <input
              id="email-1"
              className={classes.input}
              required
              type="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={classes.cut}></div>
            <label htmlFor="email-1" className={classes.placeholder}>
              Email
            </label>
          </div>
          <div className={`${classes.container} ${classes.ic2}`}>
            <input
              id="pass-1"
              className={classes.input}
              required
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={classes.cut}></div>
            <label htmlFor="pass-1" className={classes.placeholder}>
              Password
            </label>
          </div>
          <Button
            className={classes.submit}
            type="submit"
            size="large"
            variant="outlined"
            sx={{
              color: "#eee",
              backgroundColor: "darkslateblue",
              borderRadius: 12,
            }}
          >
            <span>Submit</span>
          </Button>
        </form>
      </div>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
