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
import { Input } from "../../components/ui/input.jsx";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { FadeLoader } from "react-spinners";
import { deleteCompany, getCompanies } from "../../api/companyRequests.js";

const CompaniesUi = () => {
  const token = localStorage.getItem("token");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [pending, setPending] = useState(false);
  const [isFilter, isFilterSet] = useState(false);
  useEffect(() => {
    getCompanies(token, setCompanies, setLoading);
  }, [isRefresh, token]);

  const handleDeleteCompany = (id, name) => {
    confirmAlert({
      title: `Confirm to Delete ${name}`,
      message: `Are you sure you want delete ${name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteCompany(token, id, setIsRefresh, name, setPending);
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
    isFilterSet(true);
    if (value !== "") {
      axios
        .get(
          `https://tasktrial.vercel.app/filterCompanies?name=${value.toLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setCompanies(response?.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      getCompanies(token, setCompanies, setLoading);
      isFilterSet(false)
    }
  };

  const companiesData = companies.map(
    ({ _id, name, logo, adminDetails }, index) => {
      return (
        <TableRow key={index}>
          <TableCell className="font-medium">{name}</TableCell>
          {adminDetails?.map(({ employeeLimit, email }) => {
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
                onClick={() => handleDeleteCompany(_id, name)}
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
    }
  );

  const filterCompaniesData = companies.map(
    ({ _id, name, logo, admin_email, employee_limit }, index) => {
      return (
        <TableRow key={index}>
          <TableCell className="font-medium">{name}</TableCell>
          <TableCell>{employee_limit}</TableCell>
          <TableCell>{admin_email}</TableCell>
          <img
            className="w-10 h-10 object-contain rounded-full"
            src={logo}
            alt="logo"></img>
          <TableCell>
            <div className="flex items-center justify-center">
              <button
                onClick={() => handleDeleteCompany(_id, name)}
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
    }
  );
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
          <TableBody>
            {isFilter ? filterCompaniesData : companiesData}
          </TableBody>
        </Table>
      </div>
      <ToastContainer />
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
    </>
  );
};

export default CompaniesUi;
