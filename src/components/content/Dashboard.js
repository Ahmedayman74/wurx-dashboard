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

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://tasktrial.vercel.app/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [users]);

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

  const usersData = users.map(
    ({ _id, fisrtname, lastname, phone, email, position, avatar }) => {
      return (
        <TableRow>
          <Link to={`users/${_id}`}>
            <TableCell className="font-medium">
              {fisrtname + lastname}
            </TableCell>
          </Link>
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
              className=" bg-red-700 rounded-lg text-white px-5 py-2">
              Delete
            </button>
          </TableCell>
        </TableRow>
      );
    }
  );
  return (
    <Table>
      <TableCaption>A list of your users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Avatar</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{usersData}</TableBody>
    </Table>
  );
};

export default Dashboard;
