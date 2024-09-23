import React from "react";
import Logo from "../sidebar/Logo";
import logoimg from "../../imgs/logo (1).png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../rtk/slices/auth-slice";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = () => {
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
    <div className="flex items-center justify-center h-screen px-10 bg-[#eee]">
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
    </div>
  );
};

export default Login;
