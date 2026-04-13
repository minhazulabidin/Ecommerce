import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginInfo } from "../ZustandStore/Auth.srote";

export const PrivetRoute = ({ children }) => {
  const navigate = useNavigate();
  const { addUserInfo } = useLoginInfo();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true })
      .then((res) => {
        addUserInfo(res.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  return <>{children}</>;
};
