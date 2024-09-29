import React, { useEffect } from "react";
import { Button } from "../ui/button.jsx";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Field from "../Form/Field.jsx";
import FileField from "../Form/FileField.jsx";
import { addUser } from "../../api/userRequests.js";
import { FadeLoader } from "react-spinners";

const AddUserUi = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const companyName = localStorage.getItem("companyName");
  const [pending, setPending] = useState(false);

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
      companyName: companyName !== null && role === "Admin" ? companyName : "",
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
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      addUser(formData, token, formik.resetForm(), setPending);
    },
  });
  return (
    <div className="bg-white p-10 rounded-lg">
      <form onSubmit={formik.handleSubmit}>
        <h1 className="font-bold pb-3 text-xl">Personal information</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <Field
              label="First Name *"
              type="text"
              name="firstname"
              formik={formik}
              value={formik.values.firstname}
              error={formik.errors.firstname}
              touched={formik.touched.firstname}
              id="firstname"
            />

            <Field
              label="Last Name *"
              type="text"
              name="lastname"
              formik={formik}
              value={formik.values.lastname}
              error={formik.errors.lastname}
              touched={formik.touched.lastname}
              id="lastname"
            />

            <Field
              label="Password *"
              type="password"
              name="password"
              formik={formik}
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
              id="password"
            />

            <Field
              label="Phone *"
              type="tel"
              name="phone"
              formik={formik}
              value={formik.values.phone}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              id="phone"
            />

            <Field
              label="companyName *"
              type="text"
              name="companyName"
              formik={formik}
              value={formik.values.companyName}
              error={formik.errors.companyName}
              touched={formik.touched.companyName}
              id="cname"
              disabled={companyName !== null && role === "Admin" ? true : false}
            />
          </div>
          <div>
            <Field
              label="Position *"
              type="text"
              name="position"
              formik={formik}
              value={formik.values.position}
              error={formik.errors.position}
              touched={formik.touched.position}
              id="position"
            />

            <Field
              label="Email *"
              type="email"
              name="email"
              formik={formik}
              value={formik.values.email}
              error={formik.errors.email}
              touched={formik.touched.email}
              id="email"
            />

            <Field
              label="Website"
              type="text"
              name="website"
              formik={formik}
              value={formik.values.website}
              error={formik.errors.website}
              touched={formik.touched.website}
              id="website"
            />
          </div>
          <div>
            <FileField
              label="Profille Picture"
              id="avatar"
              formik={formik}
              name="avatar"
              type="file"
            />

            <FileField
              label="Cover"
              id="cover"
              formik={formik}
              name="cover"
              type="file"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5">
          <div>
            <h1 className="font-bold pb-3 text-xl">Social Media information</h1>
            <Field
              label="Facebook"
              type="text"
              name="facebook"
              formik={formik}
              value={formik.values.facebook}
              error={formik.errors.facebook}
              touched={formik.touched.facebook}
              id="facebook"
            />
            <Field
              label="Instagram"
              type="text"
              name="instagram"
              formik={formik}
              value={formik.values.instagram}
              error={formik.errors.instagram}
              touched={formik.touched.instagram}
              id="instagram"
            />
            <Field
              label="Twitter"
              type="text"
              name="xTwitter"
              formik={formik}
              value={formik.values.xTwitter}
              error={formik.errors.xTwitter}
              touched={formik.touched.xTwitter}
              id="twitter"
            />
            <Field
              label="LinkedIn"
              type="text"
              name="linkedIn"
              formik={formik}
              value={formik.values.linkedIn}
              error={formik.errors.linkedIn}
              touched={formik.touched.linkedIn}
              id="linkedIn"
            />
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
      {pending && (
        <div className="fixed h-screen top-0 left-0 bg-[#ffffff80] w-full">
          <div className=" absolute top-1/2 left-1/2">
            <FadeLoader
              color={"#00A4FF"}
              loading={pending}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserUi;
