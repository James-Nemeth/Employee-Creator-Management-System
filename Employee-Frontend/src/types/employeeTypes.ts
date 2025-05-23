export interface Employee {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  startDate: string;
  finishDate: string | null;
  contract: string;
  role: string;
  hoursPerWeek: number;
  avatarUrl: string;
}

export type EmployeeFormInputs = Omit<Employee, "id"> & {
  middleName?: string | null;
  finishDate?: string | null;
};
