import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Button } from "../../components/ui/button.jsx";
import { Label } from "../../components/ui/label.jsx";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { FadeLoader } from "react-spinners";
import Field from "../Form/Field";
import { editUser, getUser } from "../../api/userRequests";

const EditUserUi = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isEditPasswordAble, isSetEditPasswordAble] = useState(true);
  const [pending, setPending] = useState(false);
  const params = useParams();

  useEffect(() => {
    getUser(params.id, setUser);
  }, [params.id]);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname || "", // Set initial value from user object or empty string if not loaded yet
      lastname: user?.lastname || "",
      password: "",
      phone: user?.phone || "",
      position: user?.position || "",
      email: user?.email || "",
    },
    onSubmit: (values) => {
      const editObj = {};
      if (values.firstname) editObj.firstname = values.firstname;
      if (values.lastname) editObj.lastname = values.lastname;
      if (values.password) editObj.password = values.password;
      if (values.phone) editObj.phone = values.phone;
      if (values.position) editObj.position = values.position;
      if (values.email) editObj.email = values.email;
      editUser(editObj, token, params.id, setPending);
    },
  });

  // Return a loading state if user data is still being fetched
  if (!user) {
    return (
      <div className="fixed h-screen top-0 left-0 bg-[#ffffff80] w-full">
        <div className=" absolute top-1/2 left-1/2">
          <FadeLoader
            color={"#00A4FF"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

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
              disabled={isEditPasswordAble}
              isEditPassword={true}
              isSetEditPasswordAble={isSetEditPasswordAble}
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

export default EditUserUi;
