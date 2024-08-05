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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Schema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Username is required"),

    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: async ({ username, password }) => {
      const resultAction = await dispatch(
        login({
          adminname: username,
          password: password,
        })
      );

      if (login.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-md  ">
        <img
          className="w-40 mb-6"
          src={require("../../imgs/logo (1).png")}
          alt="Logo"
        />
        <form className="w-full" onSubmit={formik.handleSubmit}>
          <div className="grid w-full items-center gap-1.5 mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <p>
              {formik.errors.username && formik.touched.username ? (
                <p className=" text-red-500 text-xs my-1">
                  {formik.errors.username}
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
            className="w-full py-2 mt-4 text-white bg-[#330066] rounded-full duration-500 hover:bg-[#E374DA]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
