import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "./customer.api";
import { EmptyState, ErrorState, LoadingState } from "../../sharedComponents/states";
import { DataTable, ColumnDef } from "../../sharedComponents/DataTable";
import { CustomerResponse } from "./customer.types";

const CUSTOMERS_QUERY_KEY = ["customers"] as const;

const customerColumns: ColumnDef<CustomerResponse>[] = [
    {
      key: "name",
      header: "Name",
      render: (c: CustomerResponse) => (
        <span className="font-medium text-slate-800">
          {c.firstName} {c.lastName}
        </span>
      ),
    },
    {
      key: "dateOfBirth",
      header: "Date of Birth",
      className: "text-slate-500",
      render: (c: CustomerResponse) => formatDate(c.dateOfBirth),
    },
    {
      key: "id",
      header: "ID",
      className: "hidden sm:table-cell font-mono text-xs text-slate-400",
      headerClassName: "hidden sm:table-cell",
      render: (c: CustomerResponse) => c.id,
    },
  ];

function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("T")[0].split("-");
  return `${d}/${m}/${y}`;
}

export function CustomerList() {
  const { data: customers, isLoading, isError } = useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: getCustomers,
  });

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
          <DataTable data={customers} columns={customerColumns} rowKey={(row) => row.id.toString()} />
        )}
      </div>
    </section>
  );
}