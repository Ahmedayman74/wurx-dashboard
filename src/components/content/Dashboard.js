import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select.jsx";
import { SelectValue } from "@radix-ui/react-select";
import { ClipLoader, FadeLoader } from "react-spinners";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    axios
      .get("https://tasktrial.vercel.app/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token, refresh]);

  useEffect(() => {
    axios
      .get("https://tasktrial.vercel.app/allCompanies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    axios
      .delete(`https://tasktrial.vercel.app/deleteUser/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
        setRefresh(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCompanyChange = (value) => {
    setLoading(true);
    axios
      .get(`https://tasktrial.vercel.app/companyUsers?companyName=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data);
        setSelectValue(value);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(users);

  const percentage = (users.length / 12) * 100;

  const usersData = users.map(
    ({ _id, firstname, lastname, phone, email, position, avatar }) => {
      return (
        <TableRow>
          <TableCell className="font-medium">{firstname + lastname}</TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{position}</TableCell>
          <TableCell>
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={`${avatar} `}
              alt="avatar"></img>
          </TableCell>
          <TableCell>
            <button
              onClick={() => handleDeleteUser(_id)}
              className="rounded-lg text-red-600  px-5 py-2">
              Delete
            </button>

            <button
              onClick={() => handleDeleteUser(_id)}
              className="rounded-lg text-green-600  px-5 py-2">
              Edit
            </button>
            <Link
              className="rounded-lg text-blue-600  px-5 py-2"
              to={`users/${_id}`}>
              Preview
            </Link>
          </TableCell>
        </TableRow>
      );
    }
  );
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader
          color={"#CB5BC3"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  let placeholder = "";

  if (role === "SuperAdmin" && selectValue === null) {
    placeholder = "Select a Company";
  } else if (role === "Admin" && users.length > 0) {
    placeholder = users[0].companyName || "No User Available";
  } else {
    placeholder = selectValue || "Select a Company";
  }
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap items-center w-full gap-5 p-5 bg-white rounded-lg">
        <div className="md:w-3/5 w-full">
          <Input type="search" placeholder="Search For Users" />
        </div>
        <div className="w-full md:w-2/5 flex flex-wrap lg:flex-nowrap items-center gap-5 ">
          <Select
            disabled={role === "Admin" ? true : false}
            onValueChange={(value) => handleCompanyChange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies.map((company, index) => {
                  return (
                    <SelectItem key={index} value={company.name}>
                      {company.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Link
            to={"/user"}
            className="bg-[#CB5BC3] py-2 h-9 px-10 rounded-md text-white">
            Add New User
          </Link>
        </div>
      </div>
      {role === "Admin" && (
        <div className="bg-white rounded-lg p-5 mt-10">
          <h1 className="text-[#2e1065] font-bold">Users Qoute</h1>
          <div className="bg-[#2e1065] w-full h-[14px] rounded-lg my-6">
            <span
              className={`bg-[#CB5BC3] block w-[${Math.floor(
                percentage
              )}%]  h-full rounded-lg`}></span>
          </div>
          <h1 className="text-[##2e1065]">
            <span className="font-bold text-[#CB5BC3]">{users.length}</span>/ 12
          </h1>
        </div>
      )}
      <div className="bg-white rounded-lg my-10 p-5">
        <Table>
          <TableCaption
            className={`${users.length === 0 ? `inline-block` : "hidden"}`}>
            A list of your users.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Avatar</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{usersData}</TableBody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
