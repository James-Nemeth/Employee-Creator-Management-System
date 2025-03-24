import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../services/employeeService";
import { Employee } from "../types/employeeTypes";
import { capitalizeFirstLetter } from "../utils/utils";

const DetailItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <p className="text-lg font-medium flex justify-between border-b pb-2">
    <strong className="text-primary">{label}:</strong>
    <span className="text-gray-800">{value}</span>
  </p>
);

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
    <div className="max-w-4xl mx-auto p-2">
      <h1 className="text-4xl font-bold text-accent text-center mb-2 border-b-2 pb-1">
        {employee.firstName} {employee.lastName} Details
      </h1>

      <div className="bg-secondary p-8 rounded-lg shadow-lg">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-accent border-b-2 pb-2 mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              <DetailItem label="First Name" value={employee.firstName} />
              <DetailItem
                label="Middle Name"
                value={employee.middleName || "N/A"}
              />
              <DetailItem label="Last Name" value={employee.lastName} />
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-accent border-b-2 pb-2 mb-4">
              Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              <DetailItem label="Email" value={employee.email} />
              <DetailItem label="Mobile Number" value={employee.mobileNumber} />
              <DetailItem label="Address" value={employee.address} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-accent border-b-2 pb-2 mb-4">
              Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              <DetailItem label="Start Date" value={employee.startDate} />
              <DetailItem
                label="Finish Date"
                value={employee.finishDate || "N/A"}
              />
              <DetailItem
                label="Contract Type"
                value={capitalizeFirstLetter(employee.contract)}
              />
              <DetailItem
                label="Role Type"
                value={capitalizeFirstLetter(employee.role)}
              />
              <DetailItem
                label="Hours Per Week"
                value={employee.hoursPerWeek.toString()}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
