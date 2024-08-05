import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import QRCode from "react-qr-code";

const User = () => {
  const params = useParams();
  // console.log(params.userId);
  const [user, setUser] = useState([]);
  const location = window.location;
  useEffect(() => {
    axios
      .get(`https://tasktrial.vercel.app/getUser/${params.userId}`)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  console.log(user.avatar);
  return (
    <div className=" relative">
      <div className="hero-sec rounded-md"></div>
      <div className=" flex items-center justify-center">
        <img
          className="rounded-full w-32 h-32 -mt-10 shadow-md"
          alt=""
          src={user.avatar}></img>
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className=" mt-5 text-indigo-950 capitalize  font-extrabold text-center text-xl">
          {user.name}
        </h1>
        <p className=" mt-1 text-fuchsia-500 capitalize  font-medium text-center text-xl">
          {user.position}
        </p>
        <button className=" mt-2 bg-fuchsia-600 text-white px-5 py-2 rounded-md">
          Download Contact
        </button>
        <QRCode
          className="py-10"
          size={256}
          // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`${location.host}/dashboard/users/${params.userId}`}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

export default User;
