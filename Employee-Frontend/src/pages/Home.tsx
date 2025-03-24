import { useNavigate } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 pt-10 pb-2 text-primary text-center border-b-2">
        Employee Creator Management System
      </h1>
      <div className="flex justify-center sm:justify-start mr-5">
        <button
          className="bg-green-500 text-white font-bold px-4 py-2 rounded cursor-pointer hover:bg-green-600 mb-1 ml-5"
          onClick={() => navigate("/new-employee")}
        >
          + Create New Employee
        </button>
      </div>
      <EmployeeList />
    </div>
  );
};

export default Home;
