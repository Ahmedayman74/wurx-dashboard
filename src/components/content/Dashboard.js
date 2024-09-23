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
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Dashboard = () => {
  // const token = useSelector((state) => state.auth.token);
  // const role = useSelector((state) => state.auth.role);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [error, setError] = useState("");

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
        setLoadingTable(false);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoadingTable(false);
        setLoading(false);
      });
  }, [users, token]);

  const handleDeleteUser = (id, firstname, lastname) => {
    confirmAlert({
      title: `Confirm to Delete ${firstname}`,
      message: `Are you sure you want delete ${firstname}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`https://tasktrial.vercel.app/deleteUser/${id}`)
              .then((response) => {
                console.log(`Deleted post with ID ${id}`);
                setRefresh(true);
              })
              .catch((error) => {
                console.error(error);
              });
            toast.success(`${firstname} Deleted successfully!`);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleCompanyChange = (value) => {
    setLoadingTable(true);
    setError("");
    axios
      .get(`https://tasktrial.vercel.app/companyUsers?companyName=${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data);
        setSelectValue(value);
        setLoadingTable(false);
        setError("");
      })
      .catch(function (error) {
        console.log(error);
        setLoadingTable(false);
        setUsers([]);
        setError("No users found");
      });
  };

  const handleSearch = (value) => {
    console.log(value);
    if (value !== "") {
      axios
        .get(`https://tasktrial.vercel.app/filterUsers?userName=${value}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setUsers(response.data);
          setLoadingTable(false);
          setError("");
        })
        .catch(function (error) {
          console.log(error);
          setLoadingTable(false);
          setUsers([]);
          setError("No users found");
        });
    }
  };

  console.log(users);
  const percentage = Math.floor((users.length / 12) * 100);

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
              src={avatar ? `${avatar}` : require("../../imgs/logo-wurx-cart (1).png")}
              alt="avatar"></img>
          </TableCell>
          <TableCell>
            <button
              onClick={() => handleDeleteUser(_id, firstname, lastname)}
              className="rounded-lg text-red-600  px-5 py-2">
              Delete
            </button>

            <Link
              // onClick={() => handleDeleteUser(_id)}
              to={`/users/edit/${_id}`}
              className="rounded-lg text-green-600  px-5 py-2">
              Edit
            </Link>
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

  console.log(loadingTable);

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
          <Input
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            type="search"
            placeholder="Search For Users"
          />
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
            aria-disabled="true"
            className={`${
              role === "superAdmin" ? `block` : `block`
            } bg-[#2e1065] hover:bg-[#00A4FF] duration-500 py-2 h-9 px-10 rounded-md text-white`}>
            Add New User
          </Link>
        </div>
      </div>
      {role === "Admin" && (
        <div className="bg-white rounded-lg p-5 mt-10">
          <h1 className="text-[#2e1065] font-bold">Users Qoute</h1>
          <div className="bg-[#2e1065] w-full h-[14px] rounded-lg my-6">
            {percentage && (
              <span
                className={`bg-[#CB5BC3] block w-[${percentage}%]  h-full rounded-lg`}></span>
            )}
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
            {error}
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
          {!loadingTable ? (
            <TableBody>{usersData}</TableBody>
          ) : (
            <div className="flex items-center justify-center w-full h-[20vh]">
              <FadeLoader
                color={"#00A4FF"}
                loading={loadingTable}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
