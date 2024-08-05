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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://tasktrial.vercel.app/allUsers")
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const usersData = users.map(
    ({ _id, name, phone, email, position, avatar }) => {
      return (
        <TableRow>
          <Link to={`users/${_id}`}>
            <TableCell className="font-medium">{name}</TableCell>
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
        </TableRow>
      </TableHeader>
      <TableBody>{usersData}</TableBody>
    </Table>
  );
};

export default Dashboard;
