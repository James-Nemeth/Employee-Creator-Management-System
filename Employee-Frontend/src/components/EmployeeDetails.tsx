import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/employeeService";
import { Employee } from "../types/employeeTypes";
import { capitalizeFirstLetter } from "../utils/utils";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const employeeData = await getEmployeeById(parseInt(id));
          setEmployee(employeeData);
        } catch (error) {
          console.error("Failed to fetch employee details", error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-accent text-center mb-6 border-b-2 pb-2">
        {employee.firstName} {employee.lastName} Details
      </h1>

      <div className="bg-secondary p-12 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">First Name:</strong>{" "}
            {employee.firstName}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Middle Name:</strong>{" "}
            {employee.middleName || "N/A"}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Last Name:</strong>{" "}
            {employee.lastName}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Email:</strong>{" "}
            {employee.email}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Mobile Number:</strong>{" "}
            {employee.mobileNumber}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Address:</strong>{" "}
            {employee.address}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Start Date:</strong>{" "}
            {employee.startDate}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Finish Date:</strong>{" "}
            {employee.finishDate || "N/A"}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Contract Type:</strong>{" "}
            {capitalizeFirstLetter(employee.contract)}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Role Type:</strong>{" "}
            {capitalizeFirstLetter(employee.role)}
          </p>
          <p className="text-xl font-medium">
            <strong className="text-primary text-xl">Hours Per Week:</strong>{" "}
            {employee.hoursPerWeek}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
