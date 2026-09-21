import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    document.title = "Admin Login | AS Cleaning Services";
  }, []);

  return <Navigate to="/login" replace />;
};

export default Register;
