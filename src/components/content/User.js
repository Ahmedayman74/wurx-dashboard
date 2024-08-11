import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const location = window.location;

  useEffect(() => {
    axios
      .get(`https://tasktrial.vercel.app/getUser/${params.userId}`)
      .then(function (response) {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.userId]);

  // Function to convert user data to CSV format
  const convertUserToCSV = (user) => {
    const csvHeader = "Name,Position,Email,Phone\n"; // Add any fields you need
    const csvRow = `${user.name || ""},${user.position || ""},${
      user.email || ""
    },${user.phone || ""}\n`; // Add other fields as necessary
    return csvHeader + csvRow;
  };

  // Function to trigger the CSV download
  const handleDownloadContact = () => {
    const csv = convertUserToCSV(user);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Ensure the file has the .csv extension and a valid name
    const fileName = `${
      user.name ? user.name.replace(/ /g, "_") : "contact"
    }.csv`;

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName; // Ensure .csv extension
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the URL object after the download to free memory
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <div className="hero-sec rounded-md"></div>
      <div className="flex items-center justify-center">
        <img
          className="rounded-full w-32 h-32 -mt-10 shadow-md"
          alt=""
          src={user.avatar}
        />
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="mt-5 text-indigo-950 capitalize font-extrabold text-center text-xl">
          {user.name}
        </h1>
        <p className="mt-1 text-fuchsia-500 capitalize font-medium text-center text-xl">
          {user.position}
        </p>
        <button
          className="mt-2 bg-fuchsia-600 text-white px-5 py-2 rounded-md"
          onClick={handleDownloadContact}>
          Download Contact
        </button>
        <QRCode
          className="py-10"
          size={256}
          value={`${location.host}/dashboard/users/${params.userId}`}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};

export default User;
