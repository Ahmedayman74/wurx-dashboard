import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditCompanies = () => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      employeeLimit: "",
      password: "",
      companyName: "",
      email: "",
    },
    onSubmit: ({ password, companyName, email, employeeLimit }) => {
      const editObj = new Object();

      if (companyName !== "") {
        editObj.companyName = companyName;
      }
      if (employeeLimit !== "") {
        editObj.employeeLimit = employeeLimit;
      }
      if (password !== "") {
        editObj.password = password;
      }
      if (email !== "") {
        editObj.email = email;
      }
      axios
        .patch(
          `https://tasktrial.vercel.app/updateCompany/${params.id}`,
          editObj ,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(function (response) {
          formik.resetForm();
          toast.success(`${response.data.company.name} Successfully Added`, {
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
    <div className="bg-white rounded-lg p-10">
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

            {/* <div className="mb-2">
              <Label htmlFor="img">Logo</Label>
              <Input
                type="file"
                id="img"
                name=""
                onChange={(e) => {
                  formik.setFieldValue("logo", e.currentTarget.files[0]); // Update "cover" instead of "avatar"
                }}
                value={null}
                onBlur={formik.handleBlur}
              />
            </div> */}
          </div>
        </div>
        <Button className="mt-4 bg-[#2e1065] hover:bg-[#00A4FF] duration-500" type="submit">
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

export default EditCompanies;
