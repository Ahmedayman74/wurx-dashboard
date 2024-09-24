import React, { useEffect } from "react";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import Inputs from "./Inputs.js";
import { Button } from "../ui/button.jsx";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils.js";
import { Calendar } from "../ui/calendar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.jsx";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Form = () => {
  // const auth = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://tasktrial.vercel.app/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [users, token]);

  console.log();
  let formData = new FormData();
  const Schema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    phone: Yup.string()
      .matches(
        /^(0)\d{10}$/,
        "Phone number must start with 0 and have 11 digits"
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
    companyName: Yup.string().required("Company Name is required"),
    position: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Position is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    instagram: Yup.string()
      .url("Invalid Instagram URL")
      .test("is-instagram-url", "Invalid Instagram URL", (value) =>
        value ? value.includes("instagram.com") : true
      ),
    facebook: Yup.string()
      .url("Invalid Facebook URL")
      .test("is-facebook-url", "Invalid Facebook URL", (value) =>
        value ? value.includes("facebook.com") : true
      ),
    xTwitter: Yup.string()
      .url("Invalid X URL")
      .test("is-x-url", "Invalid X URL", (value) =>
        value ? value.includes("x.com") : true
      ),
    linkedIn: Yup.string()
      .url("Invalid LinkedIn URL")
      .test("is-linkedin-url", "Invalid LinkedIn URL", (value) =>
        value ? value.includes("linkedin.com") : true
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      phone: "",
      companyName: role === "Admin" ? users[0]?.companyName : "",
      position: "",
      email: "",
      website: "",
      facebook: "",
      xTwitter: "",
      linkedIn: "",
      instagram: "",
      cover: "",
    },
    validationSchema: Schema,
    onSubmit: ({
      firstname,
      lastname,
      password,
      phone,
      companyName,
      avatar,
      position,
      email,
      website,
      cover,
      facebook,
      xTwitter,
      linkedIn,
      instagram,
      date,
      languages,
    }) => {
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("companyName", companyName);
      formData.append("avatar", avatar);
      formData.append("cover", cover);
      formData.append("position", position);
      formData.append("email", email);
      formData.append("website", website);
      formData.append("start", date);
      formData.append("facebook", facebook);
      formData.append("xTwitter", xTwitter);
      formData.append("instagram", instagram);
      formData.append("linkedIn", linkedIn);
      formData.append("languages", languages);
      axios
        .post("https://tasktrial.vercel.app/setUser", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: token,
          },
        })
        .then(function (response) {
          console.log(response);
          formik.resetForm();
          toast.success("User Successfully Added", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    },
  });
  return (
    <div className="bg-white p-10 rounded-lg">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="font-bold pb-3 text-xl">Personal information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="mb-2">
              <Label htmlFor="firstname">First Name *</Label>
              <Input
                onChange={formik.handleChange}
                value={formik.values.firstname}
                onBlur={formik.handleBlur}
                type="text"
                id="firstname"
                name="firstname"
              />
              <p>
                {formik.errors.firstname && formik.touched.firstname ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.firstname}
                  </p>
                ) : null}
              </p>
            </div>

            <div className="mb-2">
              <Label htmlFor="lastname">Last Name *</Label>
              <Input
                onChange={formik.handleChange}
                value={formik.values.lastname}
                onBlur={formik.handleBlur}
                type="text"
                id="lastname"
                name="lastname"
              />
              <p>
                {formik.errors.lastname && formik.touched.lastname ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.lastname}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  type="password"
                  id="password"
                  name="password"
                />
                <p>
                  {formik.errors.password && formik.touched.password ? (
                    <p className=" text-red-500 text-xs my-1">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </p>
              </div>
              {/* <Button type="button" onClick={() => {
                console.log("random password")
              }}>genrate password</Button> */}
            </div>
            <div className="mb-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                // onChange={(e) => {
                //   setPhone(e.target.value);
                // }}
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.phone && formik.touched.phone ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.phone}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="cname">companyName *</Label>
              <Input
                type="text"
                id="cname"
                name="companyName"
                onChange={formik.handleChange}
                value={formik.values.companyName}
                onBlur={formik.handleBlur}
                disabled={role === "Admin" && users.length !== 0 ? true : false}
              />
              <p>
                {formik.errors.companyName && formik.touched.companyName ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.companyName}
                  </p>
                ) : null}
              </p>
            </div>
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="name">Position *</Label>
              <Input
                // onChange={(e) => {
                //   setPosition(e.target.value);
                // }}
                type="text"
                id="name"
                name="position"
                onChange={formik.handleChange}
                value={formik.values.position}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.position && formik.touched.position ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.position}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                // onChange={(e) => {
                //   setEmail(e.target.value);
                // }}
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.email && formik.touched.email ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.email}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="website">Website</Label>
              <Input
                // onChange={(e) => {
                //   setWebsite(e.target.value);
                // }}
                type="text"
                id="website"
                name="website"
                onChange={formik.handleChange}
                value={formik.values.website}
              />
              <p>
                {formik.errors.website && formik.touched.website ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.website}
                  </p>
                ) : null}
              </p>
            </div>
          </div>
          <div>
            <div className="mb-2">
              <Label htmlFor="img">Profille Picture</Label>
              <Input
                type="file"
                id="img"
                name="avatar"
                onChange={(e) => {
                  formik.setFieldValue("avatar", e.currentTarget.files[0]); // Update "cover" instead of "avatar"
                }}
                value={null}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="img">Cover</Label>
              <Input
                type="file"
                id="img"
                name="cover"
                onChange={(e) => {
                  formik.setFieldValue("cover", e.currentTarget.files[0]); // Update "cover" instead of "avatar"
                }}
                value={null} // Set value to null for file inputs
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5">
          <div>
            <h1 className="font-bold pb-3 text-xl">Social Media information</h1>
            <div className="mb-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                type="text"
                id="facebook"
                name="facebook"
                onChange={formik.handleChange}
                value={formik.values.facebook}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.facebook && formik.touched.facebook ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.facebook}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                type="text"
                id="instagram"
                name="instagram"
                onChange={formik.handleChange}
                value={formik.values.instagram}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.instagram && formik.touched.instagram ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.instagram}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                type="text"
                id="twitter"
                name="xTwitter"
                onChange={formik.handleChange}
                value={formik.values.xTwitter}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.xTwitter && formik.touched.xTwitter ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.xTwitter}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="linkedIn">linkedIn</Label>
              <Input
                type="text"
                id="linkedIn"
                name="linkedIn"
                onChange={formik.handleChange}
                value={formik.values.linkedIn}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.linkedIn && formik.touched.linkedIn ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.linkedIn}
                  </p>
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-4 bg-[#2e1065] hover:bg-[#00A4FF] duration-500"
          type="submit">
          Publish
        </Button>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Form;
