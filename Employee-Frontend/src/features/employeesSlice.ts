import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  startDate: string;
  finishDate: string;
  contract: string;
  role: string;
  hoursPerWeek: number;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee(state, action: PayloadAction<number>) {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
