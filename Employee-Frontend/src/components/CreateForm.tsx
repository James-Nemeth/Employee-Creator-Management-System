import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { createEmployee } from "../services/employeeService";
import { Employee, EmployeeFormInputs } from "../types/employeeTypes";
import Form from "./common/Form";

const CreateForm: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
      await createEmployee(data as Employee);
      navigate("/");
    } catch (error) {
      console.error("Failed to create employee", error);
    }
  };

  return <Form onSubmit={onSubmit} submitButtonLabel="Create" />;
};

export default CreateForm;
