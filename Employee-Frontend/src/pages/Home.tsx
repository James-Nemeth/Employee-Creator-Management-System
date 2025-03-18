import { useNavigate } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen shadow-md rounded">
      <h1 className="text-3xl font-bold mb-8 py-10 text-primary text-center underline">
        Employee Creator Management System
      </h1>
      <button
        className="bg-green-500 text-white font-bold px-4 py-2 rounded cursor-pointer hover:bg-green-600 mb-4"
        onClick={() => navigate("/new-employee")}
      >
        + Create New Employee
      </button>
      <EmployeeList />
    </div>
  );
};

export default Home;
