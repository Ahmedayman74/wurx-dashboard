import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const getCompanies = async (token, setCompanies, setLoading) => {
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
};

export const getCompany = async (id, setCompany, token) => {
  axios
    .get(`https://tasktrial.vercel.app/getCompany/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setCompany(response.data);
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

export const deleteCompany = async (
  token,
  id,
  setIsRefresh,
  name,
  setPending
) => {
  setPending(true);
  axios
    .delete(`https://tasktrial.vercel.app/deleteCompany/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setIsRefresh((prev) => !prev);
      setPending(false);
    })
    .catch((error) => {
      console.error(error);
      setPending(false);
    });
  toast.success(`${name} Deleted successfully!`, {
    position: "bottom-right",
    hideProgressBar: false,
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const addCompany = async (token, formData, resetForm, setPending) => {
  setPending(true);
  axios
    .post("https://tasktrial.onrender.com/createCompanyAdmin", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: token,
      },
    })
    .then(function (response) {
      setPending(false);
      toast.success(`${response.data.company.name} Successfully Added`, {
        position: "bottom-right",
        hideProgressBar: false,
        autoClose: 5000,
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
      toast.error(error.response?.data?.message, {
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

export const editCompany= async (editObj, token, id, setPending) => {
  setPending(true);
  axios
    .patch(`https://tasktrial.vercel.app/updateCompany/${id}`, editObj, {
      headers: {
        Authorization: token,
      },
    })
    .then(function (response) {
      setPending(false);
      toast.success(`${response.data.company.name} Successfully Added`, {
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

      toast.error(error.response.data.message, {
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
