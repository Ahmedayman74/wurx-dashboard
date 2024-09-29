import React, { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify"; // Ensure correct imports
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import Field from "../Form/Field";
import FileField from "../Form/FileField";
import { addCompany } from "../../api/companyRequests";
import { FadeLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddCompanyUi = () => {
  const token = localStorage.getItem("token");
  const [pending, setPending] = useState(false);

  const Schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    employeeLimit: Yup.number().required("Employee limit is required"),
    companyName: Yup.string().required("Company name is required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeLimit: "",
      password: "",
      companyName: "",
      email: "",
      logo: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      addCompany(token, formData, formik.resetForm(), setPending);
    },
  });

  return (
    <div className="bg-white rounded-lg p-10 relative">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
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
              label="Employee Limit *"
              type="number"
              name="employeeLimit"
              formik={formik}
              value={formik.values.employeeLimit}
              error={formik.errors.employeeLimit}
              touched={formik.touched.employeeLimit}
              id="employeelimit"
            />
            <Field
              label="Company Name *"
              type="text"
              name="companyName"
              formik={formik}
              value={formik.values.companyName}
              error={formik.errors.companyName}
              touched={formik.touched.companyName}
              id="cname"
            />
            <FileField
              label="Logo"
              id="logo"
              formik={formik}
              name="logo"
              type="file"
            />
          </div>
        </div>
        <div className="flex items-center gap-10">
          <Button
            className="mt-4 bg-[#2e1065] hover:bg-[#00A4FF] duration-500"
            type="submit">
            Publish
          </Button>
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
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCompanyUi;
