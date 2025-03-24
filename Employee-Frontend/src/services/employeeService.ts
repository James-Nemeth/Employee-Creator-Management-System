import axios from "axios";
import { Employee } from "../types/employeeTypes";

const API_URL = "http://localhost:8080/employee";

export const getEmployees = async (filters?: {
  contract?: string;
  role?: string;
  previous?: boolean;
}) => {
  let url = API_URL;
  if (filters) {
    const params = new URLSearchParams();
    if (filters.contract) params.append("contract", filters.contract);
    if (filters.role) params.append("role", filters.role);
    if (filters.previous) params.append("previous", String(filters.previous));
    url += `?${params.toString()}`;
  }
  const response = await axios.get<Employee[]>(url);
  return response.data;
};

export const getEmployeeById = async (id: number) => {
  const response = await axios.get<Employee>(`${API_URL}/${id}`);
  return response.data;
};

export const createEmployee = async (employee: Employee) => {
  const response = await axios.post<Employee>(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Employee) => {
  const response = await axios.put<Employee>(`${API_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
