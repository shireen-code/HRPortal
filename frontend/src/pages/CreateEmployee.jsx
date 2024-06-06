import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [id, setID] = useState("");
  const [startDate, setStartDate] = useState("");
  const [contractType, setContract] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [dependents, setDependents] = useState([
    { name: "", relationship: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveEmployee = () => {
    const data = {
      name,
      id,
      startDate,
      contractType,
      designation,
      email,
      dependents,
    };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailPattern.test(email)) {
      enqueueSnackbar("Invalid email format", { variant: "error" });
      return false;
    }
    // Validate dependents
    for (let dependent of dependents) {
      if (!dependent.name || !dependent.relationship) {
        enqueueSnackbar("Please fill out all dependent fields", {
          variant: "error",
        });
        return;
      }
    }

    setLoading(true);
    axios
      .post("http://localhost:5555/employees", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Employee Created successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  const handleDependentChange = (index, field, value) => {
    const updatedDependents = [...dependents];
    updatedDependents[index][field] = value;
    setDependents(updatedDependents);
  };

  const addDependent = () => {
    setDependents([...dependents, { name: "", relationship: "" }]);
  };

  const removeDependent = (index) => {
    const updatedDependents = [...dependents];
    updatedDependents.splice(index, 1);
    setDependents(updatedDependents);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Create Employee</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col rounded-xl w-[600px] p-4 mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Employee Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            />
          </div>
          <div className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Employee ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setID(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            />
          </div>
          <div className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            />
          </div>
          <div className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Contract Type
            </label>
            <input
              type="text"
              value={contractType}
              onChange={(e) => setContract(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            />
          </div>
          <div className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Designation
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            />
          </div>
          <div className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            />
          </div>
        </div>
        {dependents.map((dependent, index) => (
          <div key={index} className="my-4">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Dependent {index + 1}
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={dependent.name}
                onChange={(e) =>
                  handleDependentChange(index, "name", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600 mr-2"
                placeholder="Name"
              />
              <input
                type="text"
                value={dependent.relationship}
                onChange={(e) =>
                  handleDependentChange(index, "relationship", e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600 mr-2"
                placeholder="Relationship"
              />
              <button
                onClick={() => removeDependent(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button onClick={addDependent} className="my-2 text-green-500">
          Add Dependent
        </button>
        <button
          className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSaveEmployee}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;
