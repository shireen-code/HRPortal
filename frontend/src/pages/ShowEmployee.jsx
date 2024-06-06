import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-gray-900 my-4 font-bold text-2xl">Employee Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="shadow-lg rounded-lg p-6 bg-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 font-semibold">Employee ID</span>
              <span className="text-gray-800 mt-1">{employee.id}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 font-semibold">Employee Name</span>
              <span className="text-gray-800 mt-1">{employee.name}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 font-semibold">Start Date</span>
              <span className="text-gray-800 mt-1">{formatDate(employee.startDate)}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 font-semibold">Contract Type</span>
              <span className="text-gray-800 mt-1">{employee.contractType}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 font-semibold">Designation</span>
              <span className="text-gray-800 mt-1">{employee.designation}</span>
            </div>
            <div className="flex flex-col mb-4">
              <span className="text-gray-600 font-semibold">Email</span>
              <span className="text-gray-800 mt-1">{employee.email}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEmployee;
