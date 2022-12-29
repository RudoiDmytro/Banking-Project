import "./Dashboard.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Auth from "../Auth/Auth";
import Login from "../Login/Login";
import useToken from "../Auth/useToken";
import Button from "@mui/material/Button";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

export default function Dashboard() {
  const { setToken } = useToken()

  return (
    <div className="main">
      <div className="auth">
        <Modal
          button={
            <Button
              color="warning"
              size="large"
              variant="contained"
              startIcon={<VpnKeyRoundedIcon />}
            >
              Sign Up
            </Button>
          }
        >
          <Auth setToken={setToken} />
        </Modal>
        <Modal
          button={
            <Button
              color="warning"
              size="large"
              variant="contained"
              startIcon={<LoginRoundedIcon />}
            >
              Sign In
            </Button>
          }
        >
          <Login setToken={setToken} />
        </Modal>
      </div>
      <div className="content">
        <h2>It`s my banking app</h2>
        
      </div>
    </div>
  );
}
