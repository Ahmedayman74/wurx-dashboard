import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { ArrowDown, MapPin } from "lucide-react";
import ModalImage from "react-modal-image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const UserUi = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [cover, setCover] = useState();
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  useEffect(() => {
    axios
      .get(`https://tasktrial.vercel.app/getUser/${params.userId}`)
      .then(function (response) {
        setUser(response.data.user);
        setCover(response.data.companyCover);
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.userId]);

  const convertUserToVCard = (user) => {
    const firstName = user.firstname || "";
    const lastName = user.lastName || "";

    return `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName};;;
ORG:${user.position || ""}
EMAIL:${user.email || ""}
TEL:${user.phone || ""}
URL:${user.website || ""}
NOTE:Postal Code: ${user.companyName || ""}
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
      user.firstname ? user.firstname.replace(/ /g, "_") : "contact"
    }.vcf`;
    triggerDownload(vCard, fileName);
  };

  useEffect(() => {
    if (
      !downloadTriggered &&
      window.location.pathname.includes("/download-contact") &&
      user.firstname
    ) {
      setDownloadTriggered(true);
      const vCard = convertUserToVCard(user);
      const fileName = `${
        user.firstname ? user.firstname.replace(/ /g, "_") : "contact"
      }.vcf`;
      triggerDownload(vCard, fileName);
    }
  }, [user, downloadTriggered]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#eee] h-screen">
      <div className="relative md:max-w-lg bg-white">
        <ModalImage
          className="w-full h-[220px] object-cover"
          small={cover}
          large={cover}
          alt="Bussines Card"
        />
        <div className="pb-10 container px-10">
          <div className="flex  justify-between">
            <img
              className="w-32 h-32 rounded-xl -mt-16 border-white border-[5px]"
              alt=""
              src={user.avatar}
            />
          </div>
          <div className="flex justify-between gap-10 mt-5">
            <div>
              <div>
                <p className="text-indigo-950 font-extrabold">Name</p>
                <h1 className=" text-indigo-950 capitalize text-lg flex items-center gap-1">
                  <span>{user.firstname}</span>
                  <span>{user.lastname}</span>
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
                <p className="text-indigo-950 font-extrabold">Company Name</p>
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
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-5 my-5">
            <div className="flex items-center justify-center gap-2 w-full sm:w-fit">
              <button
                className="bg-[#AF0A81] w-full text-white px-5 py-2 rounded-sm flex justify-center items-center gap-4"
                onClick={handleDownloadContact}>
                <span>
                  <ArrowDown />
                </span>
                <span>Add Contact</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 w-full sm:w-fit">
              <a
                target="blank"
                href={user.address}
                className="bg-indigo-950 w-full text-white px-5 py-2 rounded-sm flex justify-center items-center gap-4">
                <span>
                  <MapPin />
                </span>
                <span>Open Address</span>
              </a>
            </div>
          </div>
          <div className=" mt-5 flex items-center justify-start gap-3">
            <a target="blank" href={user.facebook}>
              <FaFacebookF size={22} />
            </a>
            <a target="blank" href={user.xTwitter}>
              <FaXTwitter size={22} />
            </a>
            <a target="blank" href={user.instagram}>
              <FaInstagram size={22} />
            </a>
            <a target="blank" href={user.linkedIn}>
              <FaLinkedinIn size={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUi;
