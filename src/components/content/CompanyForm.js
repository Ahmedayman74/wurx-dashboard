import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const CompanyForm = () => {
  const auth = useSelector((state) => state.auth);
  const Schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeLimit: "",
      password: "",
      companyName: "",
      email: "",
    },
    validationSchema: Schema,
    onSubmit: ({ password, companyName, email, employeeLimit }) => {
      console.log(employeeLimit , password , companyName , email)
      axios
        .post(
          "https://tasktrial.onrender.com/createCompanyAdmin",
          {
            email,
            password,
            companyName,
            employeeLimit
          },
          {
            headers: {
              "Content-Type": `application/json`,
              "Authorization": auth.token
            },
          }
        )
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
    <div className=" right">
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
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
              <p>
                {formik.errors.email && formik.touched.email ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.email}
                  </p>
                ) : null}
              </p>
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
              <p>
                {formik.errors.password && formik.touched.password ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.password}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="employeelimit">Employee Limit *</Label>
              <Input
                type="number"
                id="employeelimit"
                name="employeeLimit"
                onChange={formik.handleChange}
                value={formik.values.employeeLimit}
                onBlur={formik.handleBlur}
              />
              <p>
                {formik.errors.employeeLimit && formik.touched.employeeLimit ? (
                  <p className=" text-red-500 text-xs my-1">
                    {formik.errors.employeeLimit}
                  </p>
                ) : null}
              </p>
            </div>
            <div className="mb-2">
              <Label htmlFor="cname">Company Name</Label>
              <Input
                type="text"
                id="cname"
                name="companyName"
                onChange={formik.handleChange}
                value={formik.values.companyName}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
        <Button className="mt-4" type="submit">
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

export default CompanyForm;
