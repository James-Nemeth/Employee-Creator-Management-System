import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { getEmployeeById, updateEmployee } from "../services/employeeService";
import { Employee, EmployeeFormInputs } from "../types/employeeTypes";
import Form from "./common/Form";

const EditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<EmployeeFormInputs>>(
    {}
  );

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const employeeData = await getEmployeeById(parseInt(id));
          setInitialData({
            firstName: employeeData.firstName,
            middleName: employeeData.middleName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            mobileNumber: employeeData.mobileNumber,
            address: employeeData.address,
            startDate: employeeData.startDate,
            finishDate: employeeData.finishDate,
            contract: employeeData.contract,
            role: employeeData.role,
            hoursPerWeek: employeeData.hoursPerWeek,
          });
        } catch (error) {
          console.error("Failed to fetch employee details", error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
      if (id) {
        await updateEmployee(parseInt(id), data as Employee);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialData={initialData}
      submitButtonLabel="Update"
    />
  );
};

export default EditForm;
