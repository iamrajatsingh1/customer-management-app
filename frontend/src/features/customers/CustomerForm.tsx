import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { createCustomer } from "./customer.api";
import type { ApiErrorResponse, CreateCustomerInput, CustomerResponse } from "./customer.types";

const inputClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200";

const errorClassName = "mt-1 text-xs text-red-600";

export function CustomerForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    },
  });

  const createCustomerMutation = useMutation({
    mutationFn: (values: CreateCustomerInput) => createCustomer(values),
    onSuccess: (created: CustomerResponse) => {
      reset();
      setSuccessMessage(`Customer created successfully (ID: ${created.id})`);
    },
  });

  const onSubmit = (values: CreateCustomerInput) => {
    setSuccessMessage(null);
    createCustomerMutation.mutate(values);
  };

  const apiError = createCustomerMutation.error as AxiosError<ApiErrorResponse> | null;
  const validationErrors = apiError?.response?.data?.validationErrors ?? [];

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Create Customer</h2>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the details below to add a new customer.
      </p>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-slate-700">
            First name
          </label>
          <input
            id="firstName"
            className={inputClassName}
            placeholder="Rajat"
            {...register("firstName", {
              required: "First name is required",
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
          />
          {errors.firstName ? <p className={errorClassName}>{errors.firstName.message}</p> : null}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-slate-700">
            Last name
          </label>
          <input
            id="lastName"
            className={inputClassName}
            placeholder="Singh"
            {...register("lastName", {
              required: "Last name is required",
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
          />
          {errors.lastName ? <p className={errorClassName}>{errors.lastName.message}</p> : null}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="mb-1 block text-sm font-medium text-slate-700">
            Date of birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className={inputClassName}
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
          />
          {errors.dateOfBirth ? (
            <p className={errorClassName}>{errors.dateOfBirth.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={createCustomerMutation.isPending}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {createCustomerMutation.isPending ? "Creating..." : "Create customer"}
        </button>
      </form>

      {successMessage ? (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {successMessage}
        </div>
      ) : null}

      {apiError ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-800">
          <p className="font-medium">{apiError.response?.data?.message ?? "Failed to create customer"}</p>
          {validationErrors.length > 0 ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
              {validationErrors.map((error) => (
                <li key={`${error.field}-${error.message}`}>
                  {error.field}: {error.message}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
