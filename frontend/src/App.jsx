import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEmployee from "./pages/CreateEmployee";
import ShowEmployee from "./pages/ShowEmployee";
import EditEmployee from "./pages/EditEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees/create" element={<CreateEmployee />} />
      <Route path="/employee/details/:id" element={<ShowEmployee />} />
      <Route path="/employee/edit/:id" element={<EditEmployee />} />
      <Route path="/employee/delete/:id" element={<DeleteEmployee />} />
    </Routes>
  );
};

export default App;
