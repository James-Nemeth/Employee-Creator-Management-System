import { describe, it, expect, afterEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import { Employee } from "../types/employeeTypes";

const mock = new MockAdapter(axios);

describe("employeeService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch employees", async () => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobileNumber: "1234567890",
        address: "123 Main St",
        startDate: "2025-02-26",
        finishDate: "2025-04-26",
        contract: "PERMANENT",
        role: "FULLTIME",
        hoursPerWeek: 40,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        mobileNumber: "0987654321",
        address: "456 Main St",
        startDate: "2025-01-26",
        finishDate: "2025-03-01",
        contract: "CONTRACT",
        role: "PARTTIME",
        hoursPerWeek: 20,
      },
    ];
    mock.onGet("http://localhost:8080/employee").reply(200, mockEmployees);

    const employees = await getEmployees();

    expect(employees).toEqual(mockEmployees);
  });

  it("should fetch employees with filters", async () => {
    const mockEmployees: Employee[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobileNumber: "1234567890",
        address: "123 Main St",
        startDate: "2025-02-26",
        finishDate: null,
        contract: "PERMANENT",
        role: "FULLTIME",
        hoursPerWeek: 40,
      },
    ];
    mock
      .onGet("http://localhost:8080/employee?contract=PERMANENT")
      .reply(200, mockEmployees);

    const employees = await getEmployees({ contract: "PERMANENT" });

    expect(employees).toEqual(mockEmployees);
  });

  it("should fetch employee by ID", async () => {
    const mockEmployee: Employee = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobileNumber: "1234567890",
      address: "123 Main St",
      startDate: "2025-02-26",
      finishDate: null,
      contract: "PERMANENT",
      role: "FULLTIME",
      hoursPerWeek: 40,
    };
    mock.onGet("http://localhost:8080/employee/1").reply(200, mockEmployee);

    const employee = await getEmployeeById(1);

    expect(employee).toEqual(mockEmployee);
  });

  it("should create an employee", async () => {
    const newEmployee: Omit<Employee, "id"> = {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      mobileNumber: "9876543210",
      address: "789 Main St",
      startDate: "2025-04-01",
      finishDate: null,
      contract: "PERMANENT",
      role: "FULLTIME",
      hoursPerWeek: 40,
    };
    const mockEmployee: Employee = { ...newEmployee, id: 3 };
    mock
      .onPost("http://localhost:8080/employee", newEmployee)
      .reply(201, mockEmployee);

    const employee = await createEmployee(newEmployee as Employee);

    expect(employee).toEqual(mockEmployee);
  });

  it("should update an employee", async () => {
    const updatedEmployee: Employee = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobileNumber: "1234567890",
      address: "123 Main St",
      startDate: "2025-02-26",
      finishDate: null,
      contract: "PERMANENT",
      role: "FULLTIME",
      hoursPerWeek: 40,
    };
    mock
      .onPut("http://localhost:8080/employee/1", updatedEmployee)
      .reply(200, updatedEmployee);

    const employee = await updateEmployee(1, updatedEmployee);

    expect(employee).toEqual(updatedEmployee);
  });

  it("should delete an employee", async () => {
    mock.onDelete("http://localhost:8080/employee/1").reply(200);

    const response = await deleteEmployee(1);

    expect(response).toBe("");
  });
});
