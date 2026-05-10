import { CustomersModule } from "./features/customers";

function App() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Customer Management</h1>
      </header>
      <CustomersModule />
    </main>
  );
}

export default App;
