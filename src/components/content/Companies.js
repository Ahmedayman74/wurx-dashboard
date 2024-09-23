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
import logoimg from "../../imgs/logo (1).png";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Companies = () => {
  // const token = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role")
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
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
  }, [isRefresh, token]);

  console.log(companies);

  const handleDeleteCompany = (id , name) => {
    confirmAlert({
      title: `Confirm to Delete ${name}`,
      message: `Are you sure you want delete ${name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`https://tasktrial.vercel.app/deleteCompany/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setIsRefresh((prev) => !prev); // Toggle refresh to trigger re-fetching companies
                console.log(`Deleted company with ID ${id}`);
              })
              .catch((error) => {
                console.error(error);
              });
            toast.success(`${name} Deleted successfully!`);
            // navigate('/login');
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleSearch = (value) => {
    setSearchFilter(value);
  };

  const companiesData = searchFilter
    ? companies
        .filter((x) => x.name.includes(searchFilter))
        .map(({ _id, name, logo, adminDetails }) => {
          return (
            <TableRow>
              <TableCell className="font-medium">{name}</TableCell>
              {adminDetails.map(({ employeeLimit, email }) => {
                return (
                  <>
                    <TableCell>{employeeLimit}</TableCell>
                    <TableCell>{email}</TableCell>
                  </>
                );
              })}

              <img
                className="w-10 h-10 object-contain rounded-full"
                src={logo}
                alt="logo"></img>
              <TableCell>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteCompany(_id , name)}
                    className="rounded-lg text-red-600  px-5 py-2">
                    Delete
                  </button>
                  <Link
                    to={`/companies/edit/${_id}`}
                    className="rounded-lg text-green-600  px-5 py-2">
                    Edit
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          );
        })
    : companies.map(({ _id, name, logo, adminDetails }) => {
        return (
          <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            {adminDetails.map(({ employeeLimit, email }) => {
              return (
                <>
                  <TableCell>{employeeLimit}</TableCell>
                  <TableCell>{email}</TableCell>
                </>
              );
            })}

            <img
              className="w-10 h-10 object-contain rounded-full"
              src={logo}
              alt="logo"></img>
            <TableCell>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleDeleteCompany(_id , name)}
                  className="rounded-lg text-red-600  px-5 py-2">
                  Delete
                </button>
                <Link
                  to={`/companies/edit/${_id}`}
                  className="rounded-lg text-green-600  px-5 py-2">
                  Edit
                </Link>
              </div>
            </TableCell>
          </TableRow>
        );
      });
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader
          color={"#00A4FF"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap items-center w-full gap-5 p-5 bg-white rounded-lg">
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          type="search"
          placeholder="Search For Companies"
        />
        <Link
          to={"/company"}
          className="bg-[#2e1065] hover:bg-[#00A4FF] duration-500 py-2 h-9 px-10 rounded-md text-white w-full md:w-1/2 text-center">
          Add New Company
        </Link>
      </div>
      <div className="bg-white rounded-lg my-10 p-5">
        <Table>
          <TableCaption
            className={`${companies.length === 0 ? `inline-block` : "hidden"}`}>
            A list of your users.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employee Limit</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{companiesData}</TableBody>
        </Table>
      </div>
    </>
  );
};

export default Companies;
