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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector(
    (state: RootState) => state.employees.employees || []
  );
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let filters = {};
        if (filter === "FULLTIME") filters = { role: "FULLTIME" };
        else if (filter === "CONTRACT") filters = { contract: "CONTRACT" };
        else if (filter === "PREVIOUS") filters = { previous: true };

        const employees = await getEmployees(filters);
        dispatch(setEmployees(employees));
      } catch (error) {
        setError("Failed to fetch employees");
        toast.error("Failed to fetch employees.");
        console.error(error);
      }
    };
    fetchEmployees();
  }, [dispatch, filter]);

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployeeService(id);
      dispatch(deleteEmployee(id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee.");
      console.error("Failed to delete employee", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container mx-auto my-6 px-4">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-6 flex items-center justify-center sm:justify-start">
        <label htmlFor="filter" className="form-label mr-2 ml-1 text-lg">
          Filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="input-field p-2 border border-gray-300 rounded focus:border-accent focus:outline-none"
        >
          <option value="ALL">All Employees</option>
          <option value="FULLTIME">Full-time Employees</option>
          <option value="CONTRACT">Contract Employees</option>
          <option value="PREVIOUS">Previous Employees</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg rounded-lg border border-gray-300 overflow-hidden">
          <thead className="bg-accent text-white">
            <tr>
              <th className="py-3 px-5 text-left text-lg font-semibold">
                Employee Details
              </th>
              <th className="py-3 px-5 text-right text-lg font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
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
                    <button
                      className="button-primary text-white font-bold px-4 py-2 rounded-md transition-all w-24 cursor-pointer"
                      onClick={() => navigate(`/edit-employee/${employee.id}`)}
                    >
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
