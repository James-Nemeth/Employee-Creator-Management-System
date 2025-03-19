import { useEffect } from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EmployeeFormInputs } from "../../types/employeeTypes";

const employeeSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    middleName: z.string().optional().nullable(),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    mobileNumber: z.string().nonempty("Mobile number is required"),
    address: z.string().nonempty("Address is required"),
    startDate: z.string().nonempty("Start date is required"),
    finishDate: z.string().optional().nullable(),
    contract: z
      .string()
      .refine((value) => value !== "", {
        message: "A Contract type is required",
      })
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
  })
  .superRefine((data, context) => {
    if (data.contract === "CONTRACT" && !data.finishDate) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Finish date is required for contract employees",
        path: ["finishDate"],
      });
    }
  });

interface FormProps {
  onSubmit: SubmitHandler<EmployeeFormInputs>;
  initialData?: Partial<EmployeeFormInputs>;
  submitButtonLabel: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  initialData,
  submitButtonLabel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    resolver: zodResolver(employeeSchema) as Resolver<EmployeeFormInputs>,
    defaultValues: initialData as EmployeeFormInputs,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData as EmployeeFormInputs);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="input-field"
          />
          {errors.firstName && (
            <p className="input-error">{errors.firstName.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="middleName" className="form-label">
            Middle Name (optional)
          </label>
          <input
            id="middleName"
            type="text"
            {...register("middleName")}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="input-field"
          />
          {errors.lastName && (
            <p className="input-error">{errors.lastName.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="input-field"
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="text"
            {...register("mobileNumber")}
            className="input-field"
          />
          {errors.mobileNumber && (
            <p className="input-error">{errors.mobileNumber.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            type="text"
            {...register("address")}
            className="input-field"
          />
          {errors.address && (
            <p className="input-error">{errors.address.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            {...register("startDate")}
            className="input-field"
          />
          {errors.startDate && (
            <p className="input-error">{errors.startDate.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="finishDate" className="form-label">
            Finish Date
          </label>
          <input
            id="finishDate"
            type="date"
            {...register("finishDate")}
            className="input-field"
          />
          {errors.finishDate && (
            <p className="input-error">{errors.finishDate.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="contract" className="form-label">
            Contract Type
          </label>
          <select
            id="contract"
            {...register("contract")}
            className="input-field"
          >
            <option value="">Select a contract</option>
            <option value="PERMANENT">Permanent</option>
            <option value="CONTRACT">Contract</option>
          </select>
          {errors.contract && (
            <p className="input-error">{errors.contract.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="role" className="form-label">
            Role Type
          </label>
          <select id="role" {...register("role")} className="input-field">
            <option value="">Select a role</option>
            <option value="FULLTIME">Full-time</option>
            <option value="PARTTIME">Part-time</option>
            <option value="CASUAL">Casual</option>
          </select>
          {errors.role && <p className="input-error">{errors.role.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="hoursPerWeek" className="form-label">
            Hours Per Week
          </label>
          <input
            id="hoursPerWeek"
            type="number"
            {...register("hoursPerWeek", { valueAsNumber: true })}
            className="input-field"
          />
          {errors.hoursPerWeek && (
            <p className="input-error">{errors.hoursPerWeek.message}</p>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 w-32 h-12 text-lg text-white font-bold px-4 py-2 rounded cursor-pointer"
        >
          {submitButtonLabel}
        </button>
      </div>
    </form>
  );
};

export default Form;
