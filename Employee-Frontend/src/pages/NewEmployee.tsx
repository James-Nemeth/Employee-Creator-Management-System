import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";

const NewEmployee: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen shadow-md rounded">
      <button
        className="text-primary font-bold mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-8 text-accent text-center">
        Create New Employee
      </h1>
      <EmployeeForm />
    </div>
  );
};

export default NewEmployee;
