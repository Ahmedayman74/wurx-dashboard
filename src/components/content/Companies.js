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

const Companies = () => {
  const token = useSelector((state) => state.auth.token);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
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

  console.log(companies);

  const handleDeleteUser = (id) => {
    axios
      .delete(`https://tasktrial.vercel.app/deleteUser/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = (value) => {
    setSearchFilter(value);
  };

  const companiesData = searchFilter
    ? companies
        .filter((x) => x.name.includes(searchFilter))
        .map(({ _id, name, logo }) => {
          return (
            <TableRow>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>13</TableCell>
              <TableCell>yath@gmail.com</TableCell>
              <img
                className="w-10 h-10 object-contain rounded-full"
                src={`https://tasktrial.vercel.app/getImage/${logo}`}
                alt="logo"></img>
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
              </TableCell>
            </TableRow>
          );
        })
    : companies.map(({ _id, name, logo }) => {
        return (
          <TableRow>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>13</TableCell>
            <TableCell>yath@gmail.com</TableCell>
            <img
              className="w-10 h-10 object-contain rounded-full"
              src={`https://tasktrial.vercel.app/getLogo/${logo}`}
              alt="logo"></img>
            <TableCell>
              <div className="flex items-center justify-center">
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
              </div>
            </TableCell>
          </TableRow>
        );
      });
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
          className="bg-[#CB5BC3] py-2 h-9 px-10 rounded-md text-white w-full md:w-1/2 text-center">
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
