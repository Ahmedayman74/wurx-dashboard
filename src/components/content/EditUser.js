import React, { useEffect, useState } from "react";
import { Input } from "../ui/input.jsx";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Button } from "../ui/button.jsx";
import { Label } from "../ui/label.jsx";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { FadeLoader } from "react-spinners";

const EditUser = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null); // Initialize as null

  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://tasktrial.vercel.app/getUser/${params.id}`)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.id]);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname || "", // Set initial value from user object or empty string if not loaded yet
      lastname: user?.lastname || "",
      password: user?.password || "",
      phone: user?.phone || "",
      position: user?.position || "",
      email: user?.email || "",
    },
    onSubmit: (values) => {
      const editObj = { ...values };
      axios
        .put(`https://tasktrial.vercel.app/updateUser/${params.id}`, editObj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          formik.resetForm();
          toast.success("User Successfully Updated", {
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

  // Return a loading state if user data is still being fetched
  if (!user) {
    return (
      <FadeLoader
        color={"#00A4FF"}
        className="h-screen flex items-center justify-center"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

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
              {formik.errors.firstname && formik.touched.firstname ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.firstname}
                </p>
              ) : null}
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
              {formik.errors.lastname && formik.touched.lastname ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.lastname}
                </p>
              ) : null}
            </div>

            <div className="mb-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                id="password"
                name="password"
              />
              {formik.errors.password && formik.touched.password ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="mb-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.phone}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <div className="mb-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                type="text"
                id="position"
                name="position"
                onChange={formik.handleChange}
                value={formik.values.position}
                onBlur={formik.handleBlur}
              />
              {formik.errors.position && formik.touched.position ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.position}
                </p>
              ) : null}
            </div>

            <div className="mb-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.email}
                </p>
              ) : null}
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

export default EditUser;
