import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../rtk/slices/auth-slice";
import { useNavigate } from "react-router-dom";

const LoginUi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ email, password }) => {
      const resultAction = await dispatch(
        login({
          email: email,
          password: password,
        })
      );

      if (login.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen px-10 bg-[#eee]">
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-white py-20 px-10 rounded-md  ">
        <img
          className="w-40 mb-6"
          src={require("../../imgs/logo-wuccccrx-cart.png")}
          alt="Logo"
        />
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="grid w-full items-center gap-1.5 mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <p>
              {formik.errors.email && formik.touched.email ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.email}
                </p>
              ) : null}
            </p>
          </div>
          <div className="grid w-full items-center gap-1.5 mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p>
              {formik.errors.password && formik.touched.password ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#2e1065] hover:bg-[#00A4FF] duration-500 rounded-full">
            Login
          </button>
        </form>
      </div>
      <div className=" text-center py-3  text-sm  md:z-[1] lg:z-[102] absolute bottom-0">
        all rights reserved to
        <a
          className="text-[#00A4FF] inline-block px-1 font-bold"
          target="_blank"
          href="https://wurxeg.com/">
          wurx.com
        </a>
        version : 1.0
      </div>
    </div>
  );
};

export default LoginUi;
