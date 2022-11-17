import * as React from "react";
import { PrivateWrapperProps } from "../types/index";
import { TOKENKEY } from "../services/apiService";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "../services/apiService";

const PrivateWrapper = (props: PrivateWrapperProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCheckedLogin, setHasCheckedLogin] = useState(false);

  useEffect(() => {
    apiService("/auth/verify")
      .then((data) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setHasCheckedLogin(true);
      });
  }, []);

  if (!hasCheckedLogin) {
    return <></>;
  }

  if (isLoggedIn) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/admin/Items" />;
  }
};

export default PrivateWrapper;
