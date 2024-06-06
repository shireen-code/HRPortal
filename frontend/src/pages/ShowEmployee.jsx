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
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-gray-900 my-4 font-bold text-xl">Employee Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col shadow appearance-none border rounded  w-fit p-4">
          <div className="my-4">
            <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Employee ID
            </span>
            <span className="ml-4 text-gray-700 leading-tight">
              {employee.id}
            </span>
          </div>
          <div className="my-4">
            <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Employee Name
            </span>
            <span className="ml-4 text-gray-700 leading-tight">
              {employee.name}
            </span>
          </div>
          <div className="my-4">
            <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Start Date
            </span>
            <span className="ml-4 text-gray-700 leading-tight">
              {employee.startDate}
            </span>
          </div>
          <div className="my-4">
            <span className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Contract Type
            </span>
            <span className="ml-4 text-gray-700 leading-tight">
              {employee.contractType}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowEmployee;
