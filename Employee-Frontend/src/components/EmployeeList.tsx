import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setEmployees, deleteEmployee } from "../features/employeesSlice";
import {
  getEmployees,
  deleteEmployee as deleteEmployeeService,
} from "../services/employeeService";
import { capitalizeFirstLetter, calculateRemainingYears } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="container mx-auto my-8 px-4">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg rounded-lg border border-gray-300 overflow-hidden">
          <thead className="bg-accent text-white ">
            <tr>
              <th className="py-3 px-5 text-left text-lg font-semibold">
                Employee Details
              </th>
              <th className="py-3 px-5 text-right text-lg font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-5 text-gray-800">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-900">
                      {employee.firstName} {employee.middleName}{" "}
                      {employee.lastName}
                    </span>
                    <span className="text-md text-gray-600">
                      {capitalizeFirstLetter(employee.contract)}
                      {employee.contract === "CONTRACT" && employee.finishDate
                        ? ` - ${calculateRemainingYears(
                            employee.finishDate
                          )}yrs`
                        : ""}
                    </span>
                    <span className="text-md text-gray-500">
                      {employee.email}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-5 text-right">
                  <div className="flex flex-wrap justify-end gap-2 sm:flex-nowrap">
                    <button
                      className="button-accent text-white font-bold px-4 py-2 rounded-md transition-all w-24 cursor-pointer"
                      onClick={() => navigate(`/employee/${employee.id}`)}
                    >
                      Details
                    </button>
                    <button className="button-primary text-white font-bold px-4 py-2 rounded-md transition-all w-24 cursor-pointer">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md transition-all w-24 cursor-pointer"
                      onClick={() => handleDelete(employee.id!)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
