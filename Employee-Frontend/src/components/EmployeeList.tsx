import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setEmployees, deleteEmployee } from "../features/employeesSlice";
import {
  getEmployees,
  deleteEmployee as deleteEmployeeService,
} from "../services/employeeService";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employees = await getEmployees();
        dispatch(setEmployees(employees));
      } catch (error) {
        setError("Failed to fetch employees");
        console.error(error);
      }
    };
    fetchEmployees();
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployeeService(id);
      dispatch(deleteEmployee(id));
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full shadow-lg rounded ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-accent text-left text-accent text-lg font-bold bg-gray-50">
              Employee Details
            </th>
            <th className="py-2 px-4 border-b border-accent text-right text-accent text-lg font-bold bg-gray-50">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-accent">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-black">
                    {employee.firstName} {employee.middleName}{" "}
                    {employee.lastName}
                  </span>
                  <span className="text-md text-gray-600">
                    {capitalizeFirstLetter(employee.contract)}
                  </span>
                  <span className="text-md text-gray-600">
                    {employee.email}
                  </span>
                </div>
              </td>
              <td className="py-2 px-4 border-b text-accent text-right">
                <button className="button-primary text-white font-bold px-4 py-2 rounded cursor-pointer">
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white font-bold px-4 py-2 rounded ml-2 cursor-pointer hover:bg-red-600"
                  onClick={() => handleDelete(employee.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
