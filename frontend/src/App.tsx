import { useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

function App() {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    // Placeholder for wiring the create customer call.
    console.log("Form values", values);
    reset();
  };

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Customer Management</h1>
      <p className="mb-6 text-sm text-slate-600">
        Frontend setup complete with Vite, React 19, TypeScript, Axios, React Hook Form,
        Tailwind, and React Query provider wiring.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 rounded-lg bg-white p-4 shadow-sm"
      >
        <input
          {...register("firstName", { required: true })}
          placeholder="First name"
          className="rounded border border-slate-300 px-3 py-2"
        />
        <input
          {...register("lastName", { required: true })}
          placeholder="Last name"
          className="rounded border border-slate-300 px-3 py-2"
        />
        <input
          {...register("dateOfBirth", { required: true })}
          type="date"
          className="rounded border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        >
          Save
        </button>
      </form>
    </main>
  );
}

export default App;
