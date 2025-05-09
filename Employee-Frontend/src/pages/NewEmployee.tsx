import { useNavigate } from "react-router-dom";
import CreateForm from "../components/CreateForm";

const NewEmployee: React.FC = () => {
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
        Create New Employee
      </h1>
      <CreateForm />
    </div>
  );
};

export default NewEmployee;
