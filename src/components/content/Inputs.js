import React, { useState } from "react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";

const Inputs = ({}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cname, setCname] = useState("");
  const [customImg, setImg] = useState("");
  return (
    <div>
      <div className="mb-2">
        <Label htmlFor="name">Name</Label>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          id="name"
        />
      </div>
      <div className="mb-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="number"
          id="phone"
        />
      </div>
      <div className="mb-2">
        <Label htmlFor="cname">Company name</Label>
        <Input
          onChange={(e) => {
            setCname(e.target.value);
          }}
          type="text"
          id="cname"
        />
      </div>
      <div className="mb-2">
        <Label htmlFor="img">Image</Label>
        <Input
          onChange={(e) => {
            setImg(e.target.value);
          }}
          type="file"
          id="img"
        />
      </div>
    </div>
  );
};

export default Inputs;
