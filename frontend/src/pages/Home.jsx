import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import EmployeesTable from "../components/home/EmployeesTable";
import { Heading } from "../components/Heading";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/employees")
      .then((response) => {
        setEmployees(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <Heading></Heading>
      </div>
      {loading ? <Spinner /> : <EmployeesTable employees={employees} />}
    </div>
  );
};

export default Home;
