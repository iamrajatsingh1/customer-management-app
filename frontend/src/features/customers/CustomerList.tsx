import { useCustomers } from "./hooks/useCustomers";
import { EmptyState, ErrorState, LoadingState } from "../../shared/components/states";
import { DataTable } from "../../shared/components/DataTable";
import { CustomerColumns } from "./utils/columns";

export function CustomerList() {
  const { data: customers, isLoading, isError } = useCustomers();

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Customers</h2>
      <p className="mt-1 text-sm text-slate-500">All registered customers.</p>

      <div className="mt-6 overflow-x-auto">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState />
        ) : !Array.isArray(customers) || !customers.length ? (
          <EmptyState />
        ) : (
          <DataTable data={customers} columns={CustomerColumns} rowKey={(row) => row.id.toString()} />
        )}
      </div>
    </section>
  );
}