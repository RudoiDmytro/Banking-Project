import React from "react";
import classes from "./MyForm.module.css";
import Button from "@mui/material/Button";

export default function MyForm({
  handleSubmit,
  setUserName,
  setEmail,
  setPhone,
  setPassword,
}) {
  return (
    <div className={classes.form}>
      <div className={classes.title}>Please Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className={`${classes.container} ${classes.ic1}`}>
          <input
            id="name"
            className={classes.input}
            required
            type="text"
            placeholder=" "
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className={classes.cut}></div>
          <label htmlFor="name" className={classes.placeholder}>
            Username
          </label>
        </div>

        <div className={`${classes.container} ${classes.ic2}`}>
          <input
            id="email"
            className={classes.input}
            required
            type="email"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={classes.cut}></div>
          <label htmlFor="email" className={classes.placeholder}>
            Email
          </label>
        </div>
        <div className={`${classes.container} ${classes.ic2}`}>
          <input
            id="phone"
            className={classes.input}
            required
            type="text"
            placeholder=" "
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className={classes.cut}></div>
          <label htmlFor="phone" className={classes.placeholder}>
            Phone
          </label>
        </div>
        <div className={`${classes.container} ${classes.ic2}`}>
          <input
            id="pass"
            className={classes.input}
            required
            type="password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={classes.cut}></div>
          <label htmlFor="pass" className={classes.placeholder}>
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
          Submit
        </Button>
      </form>
    </div>
  );
}
