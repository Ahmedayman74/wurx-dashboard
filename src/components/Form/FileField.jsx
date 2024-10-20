import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const FileField = ({ label, id, formik, name, type }) => {
  return (
    <div className="mb-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        name={name}
        onChange={(e) => {
          formik.setFieldValue(name, e.currentTarget.files[0]); // Update "cover" instead of "avatar"
        }}
        value={null}
        onBlur={formik.handleBlur}
      />
    </div>
  );
};

export default FileField;
