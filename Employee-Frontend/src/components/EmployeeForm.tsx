import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/employeeService";
import { Employee } from "../types/employeeTypes";

const employeeSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().nonempty("Mobile number is required"),
  address: z.string().nonempty("Address is required"),
  startDate: z.string().nonempty("Start date is required"),
  finishDate: z.string().optional(),
  contract: z
    .string()
    .refine((value) => value !== "", { message: "A Contract type is required" })
    .refine((value) => ["PERMANENT", "CONTRACT"].includes(value), {
      message: "Invalid contract type",
    }),
  role: z
    .string()
    .refine((value) => value !== "", { message: "A Role type is required" })
    .refine((value) => ["FULLTIME", "PARTTIME", "CASUAL"].includes(value), {
      message: "Invalid role type",
    }),
  hoursPerWeek: z
    .number({
      invalid_type_error: "Hours per week is required",
    })
    .min(1, "Hours per week must be greater than 0"),
});

type EmployeeFormInputs = z.infer<typeof employeeSchema>;

const EmployeeForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
      await createEmployee(data as Employee);
      navigate("/");
    } catch (error) {
      console.error("Failed to create employee", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-group">
        <label className="form-label">First Name</label>
        <input type="text" {...register("firstName")} className="input-field" />
        {errors.firstName && (
          <p className="input-error">{errors.firstName.message}</p>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Middle Name (optional)</label>
        <input
          type="text"
          {...register("middleName")}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Last Name</label>
        <input type="text" {...register("lastName")} className="input-field" />
        {errors.lastName && (
          <p className="input-error">{errors.lastName.message}</p>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" {...register("email")} className="input-field" />
        {errors.email && <p className="input-error">{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          {...register("mobileNumber")}
          className="input-field"
        />
        {errors.mobileNumber && (
          <p className="input-error">{errors.mobileNumber.message}</p>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <input type="text" {...register("address")} className="input-field" />
        {errors.address && (
          <p className="input-error">{errors.address.message}</p>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Start Date</label>
        <input type="date" {...register("startDate")} className="input-field" />
        {errors.startDate && (
          <p className="input-error">{errors.startDate.message}</p>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Finish Date</label>
        <input
          type="date"
          {...register("finishDate")}
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Contract Type</label>
        <select {...register("contract")} className="input-field">
          <option value="" disabled selected>
            Select a contract
          </option>
          <option value="PERMANENT">Permanent</option>
          <option value="CONTRACT">Contract</option>
        </select>
        {errors.contract && (
          <p className="input-error">{errors.contract.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Role Type</label>
        <select {...register("role")} className="input-field">
          <option value="" disabled selected>
            Select a role
          </option>
          <option value="FULLTIME">Full-time</option>
          <option value="PARTTIME">Part-time</option>
          <option value="CASUAL">Casual</option>
        </select>
        {errors.role && <p className="input-error">{errors.role.message}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Hours Per Week</label>
        <input
          type="number"
          {...register("hoursPerWeek", { valueAsNumber: true })}
          className="input-field"
        />
        {errors.hoursPerWeek && (
          <p className="input-error">{errors.hoursPerWeek.message}</p>
        )}
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 w-32 h-12 text-lg text-white font-bold px-4 py-2 rounded cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
