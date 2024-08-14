import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import {
  ArrowDown,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  Twitter,
} from "lucide-react";
import ModalImage from "react-modal-image";

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
  URL:${user.website || ""}
  ADR:${user.companyName || ""}
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
    <div className="flex flex-col items-center justify-center bg-[#eee]">
      <div className="relative container px-10 md:max-w-lg bg-white">
        <ModalImage
          className="w-full py-5 "
          small={require("../../imgs/WhatsApp Image 2024-08-14 at 16.43.53_42e78109 1.png")}
          large={require("../../imgs/WhatsApp Image 2024-08-14 at 16.43.53_42e78109 1.png")}
          alt="Bussines Card"
        />
        <div className="pb-10">
          <div className="flex items-center justify-between">
            <img className="w-32 h-32 rounded-xl" alt="" src={user.avatar} />
            <img
              className="w-32 h-32 "
              alt=""
              src={require("../../imgs/image 4 (3).png")}
            />
          </div>
          <div className="flex justify-between gap-10 mt-10">
            <div>
              <div>
                <p className="text-indigo-950 font-extrabold">Name</p>
                <h1 className=" text-indigo-950 capitalize   text-lg">
                  {user.name}
                </h1>
              </div>
              <div className="mt-3">
                <p className="text-indigo-950 font-extrabold">Position</p>
                <p className="mt-1 text-indigo-950 capitalize  text-lg">
                  {user.position}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-indigo-950 font-extrabold">Phone</p>
                <p className="mt-1 text-indigo-950 capitalize  text-lg">
                  {user.phone}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-indigo-950 font-extrabold">Postal Code</p>
                <p className="mt-1 text-indigo-950 capitalize  text-lg">
                  {user.companyName}
                </p>
              </div>

              <div className="mt-3">
                <p className="text-indigo-950 font-extrabold">Website</p>
                <p className="mt-1 text-indigo-950 capitalize  text-lg">
                  <a target="blank" href={`https://${user.website}`}>
                    {user.website}
                  </a>
                </p>
              </div>
            </div>
            <QRCode
              size={130}
              value={`${window.location.origin}/download-contact/${params.userId}`}
              viewBox={`0 0 130 130`}
            />
          </div>
          <div className="flex items-center justify-center gap-5 mt-10">
            <button
              className="bg-[#AF0A81] w-full text-white px-5 py-2 rounded-sm flex justify-center items-center gap-4"
              onClick={handleDownloadContact}>
              <span>
                <ArrowDown />
              </span>
              <span>Download Contact</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-5 py-5">
            <a
              target="blank"
              href={
                "https://www.google.com/maps/@31.2118627,29.9393604,15z?entry=ttu"
              }
              className="bg-indigo-950 w-full text-white px-5 py-2 rounded-sm flex justify-center items-center gap-4">
              <span>
                <MapPin />
              </span>
              <span>Open Maps</span>
            </a>
          </div>
          <div className=" mt-5 flex items-center justify-center gap-4">
            <a target="blank" href={user.facebook}>
              <img alt="" src={require("../../imgs/Vector (10).png")} />
            </a>
            <a target="blank" href={user.xTwitter}>
              <img
                className="w-7 h-7"
                alt=""
                src={require("../../imgs/image 5 (3).png")}
              />
            </a>
            <a target="blank" href={user.instagram}>
              <img
                className="w-7 h-7"
                alt=""
                src={require("../../imgs/Vector (15).png")}
              />
            </a>
            <a target="blank" href={user.linkedIn}>
              <img
                className="w-7 h-7"
                alt=""
                src={require("../../imgs/Vector (16).png")}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
