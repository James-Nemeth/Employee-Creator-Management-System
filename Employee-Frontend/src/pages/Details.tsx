import { useNavigate } from "react-router-dom";
import EmployeeDetails from "../components/EmployeeDetails";

const Details: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <button
        className="text-primary font-bold mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button>
      <EmployeeDetails />
    </div>
  );
};

export default Details;
