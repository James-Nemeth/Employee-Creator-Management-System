import { useNavigate } from "react-router-dom";
import EditForm from "../components/EditForm";

const EditEmployee: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <button
        className="text-primary font-bold mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold mb-8 pb-2 text-accent text-center border-b-2">
        Edit Employee
      </h1>
      <EditForm />
    </div>
  );
};

export default EditEmployee;
