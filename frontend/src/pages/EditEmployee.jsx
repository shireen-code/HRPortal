import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditEmployee = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [contractType, setContract] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/employees/${id}`)
      .then((response) => {
        setName(response.data.name);
        setContract(response.data.contractType);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  }, [id]);

  const handleEditEmployee = () => {
    const data = {
      name,
      designation,
      contractType,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Details Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Employee</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          />
        </div>
        <div className="my-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Designation
          </label>{" "}
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          />
        </div>
        <div className="my-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Designation
          </label>{" "}
          <input
            type="text"
            value={designation}
            onChange={(e) => setContract(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleEditEmployee}
          >
            Update Employee
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">
          <Link to="/">Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
