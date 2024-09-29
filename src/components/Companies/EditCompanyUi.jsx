import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { editCompany, getCompany } from "../../api/companyRequests";
import { FadeLoader } from "react-spinners";
import Field from "../Form/Field";

const EditCompaniesUi = () => {
  const token = localStorage.getItem("token");
  const [company, setCompany] = useState();
  const [pending, setPending] = useState(false);
  const [isEditPasswordAble, isSetEditPasswordAble] = useState(true);
  const params = useParams();

  useEffect(() => {
    getCompany(params.id, setCompany, token);
  }, [params, token]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeLimit: company?.employeeLimit || "",
      password: "",
      companyName: company?.name || "",
      email: company?.email || "",
    },
    onSubmit: (values) => {
      const editObj = {};
      if (values.companyName) editObj.companyName = values.companyName;
      if (values.employeeLimit) editObj.employeeLimit = values.employeeLimit;
      if (values.password) editObj.password = values.password;
      if (values.email) editObj.email = values.email;
      editCompany(editObj, token, params.id, setPending);
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
                disabled={true}
              />
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

export default EditCompaniesUi;
