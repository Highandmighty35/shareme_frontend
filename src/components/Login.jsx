import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const createOrGetUser = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    localStorage.setItem("uid", decoded.sub);
    const doc = {
      _id: decoded.sub,
      _type: "user",
      userName: decoded.name,
      image: decoded.picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
    console.log(doc);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            >
              <GoogleLogin
                onSuccess={createOrGetUser}
                onFailure={createOrGetUser}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
