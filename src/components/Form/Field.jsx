import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Field = ({
  label,
  name,
  type,
  formik,
  value,
  id,
  touched,
  error,
  disabled,
  isEditPassword,
  isSetEditPasswordAble,
}) => {
  return (
    <div className="mb-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        onChange={formik.handleChange}
        value={value}
        onBlur={formik.handleBlur}
        type={type}
        id={id}
        name={name}
        disabled={disabled}
      />
      <p>
        {error && touched ? (
          <p className=" text-red-500 text-xs my-1">{error}</p>
        ) : null}
      </p>
      {isEditPassword && (
        <p
          onClick={() => {
            isSetEditPasswordAble((p) => !p);
          }}
          className="text-xs cursor-pointer text-[#00A4FF]  font-medium my-2">
          Change Password
        </p>
      )}
    </div>
  );
};

export default Field;
