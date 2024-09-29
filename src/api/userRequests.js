import axios from "axios";
import { Bounce, toast } from "react-toastify";

const apiUrl = "https://tasktrial.vercel.app";

export const getUsers = async (setUsers, token, setLoading) => {
  axios
    .get(`${apiUrl}/allUsers`, {
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
      setLoading(false);
    });
};

export const getUser = async (id, setUser) => {
  axios
    .get(`${apiUrl}/getUser/${id}`)
    .then((response) => {
      setUser(response.data);
    })
    .then((error) => {
      toast.error(error?.response?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
};

export const addUser = async (formData, token, resetForm, setPending) => {
  setPending(true);
  axios
    .post(`${apiUrl}/setUser`, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: token,
      },
    })
    .then(function (response) {
      setPending(false);
      return toast.success("User Successfully Added", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    })
    .catch(function (error) {
      setPending(false);
      return toast.error(error.response?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
};

export const editUser = async (editObj, token, id, setPending) => {
  setPending(true);
  axios
    .put(`${apiUrl}/updateUser/${id}`, editObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      setPending(false);

      return toast.success("User Successfully Updated", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    })
    .catch(function (error) {
      setPending(false);
      return toast.error(error.response?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
};

export const deleteUser = async (id, setRefresh, firstname, setPending) => {
  setPending(true);
  axios
    .delete(`https://tasktrial.vercel.app/deleteUser/${id}`)
    .then((response) => {
      setPending(false);
      setRefresh((p) => !p);
    })
    .catch((error) => {
      setPending(false);
      console.error(error);
    });
  toast.success(`${firstname} Deleted successfully!`);
};

export const getUsersForFilter = async (
  setUsers,
  token,
  setLoading,
  setFilterPending
) => {
  axios
    .get(`${apiUrl}/allUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      setUsers(response.data);
      setLoading(false);
      setFilterPending(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
      setFilterPending(false);
    });
};
