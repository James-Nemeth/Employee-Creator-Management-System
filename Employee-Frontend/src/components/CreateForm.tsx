import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { createEmployee } from "../services/employeeService";
import { Employee, EmployeeFormInputs } from "../types/employeeTypes";
import Form from "./common/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateForm: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
      await createEmployee(data as Employee);
      toast.success("Employee created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create employee. Please try again.");
    }
  };

  return <Form onSubmit={onSubmit} submitButtonLabel="Create" />;
};

export default CreateForm;
