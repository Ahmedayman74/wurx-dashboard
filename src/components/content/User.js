import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  ArrowDown,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const User = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [downloadTriggered, setDownloadTriggered] = useState(false);

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

  // Function to convert user data to vCard format
  const convertUserToVCard = (user) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${user.name || ""}
ORG:${user.position || ""}
EMAIL:${user.email || ""}
TEL:${user.phone || ""}
END:VCARD`;
  };

  // Function to trigger the VCF download
  const triggerDownload = (vCard, fileName) => {
    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleDownloadContact = () => {
    const vCard = convertUserToVCard(user);
    const fileName = `${
      user.name ? user.name.replace(/ /g, "_") : "contact"
    }.vcf`;
    triggerDownload(vCard, fileName);
  };

  useEffect(() => {
    if (
      !downloadTriggered &&
      window.location.pathname.includes("/download-contact") &&
      user.name
    ) {
      setDownloadTriggered(true);
      const vCard = convertUserToVCard(user);
      const fileName = `${
        user.name ? user.name.replace(/ /g, "_") : "contact"
      }.vcf`;
      triggerDownload(vCard, fileName);
    }
  }, [user, downloadTriggered]);

  return (
    <div className="relative">
      <img
        className="w-full -mt-10 shadow-md"
        alt=""
        src={require("../../imgs/image 3 (1).png")}
      />
      <div className="container px-10 pb-20">
        <img className="w-32 h-32 -mt-10 shadow-md" alt="" src={user.avatar} />
        <div className="flex justify-between gap-10 mt-10">
          <div>
            <div>
              <p className="text-indigo-950">Name</p>
              <h1 className=" text-[#AF0A81] capitalize font-extrabold  text-xl">
                {user.name}
              </h1>
            </div>
            <div className="mt-3">
              <p className="text-indigo-950">Position</p>
              <p className="mt-1 text-indigo-950 capitalize font-extrabold  text-xl">
                {user.position}
              </p>
            </div>
            <div className="flex items-center gap-5 mt-10">
              <button
                className="bg-[#AF0A81] text-white px-5 py-2 rounded-md flex items-center gap-4"
                onClick={handleDownloadContact}>
                <span>
                  <ArrowDown />
                </span>
                <span>Contact</span>
              </button>
            </div>
            <div className=" mt-5 flex items-center gap-4">
              <img alt="" src={require("../../imgs/Vector (10).png")} />
              <img alt="" src={require("../../imgs/Vector (11).png")} />
              <img alt="" src={require("../../imgs/Vector (12).png")} />
              <img alt="" src={require("../../imgs/Vector (13).png")} />
            </div>
          </div>
          <QRCode
            size={130}
            value={`${window.location.origin}/download-contact/${params.userId}`}
            viewBox={`0 0 130 130`}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
