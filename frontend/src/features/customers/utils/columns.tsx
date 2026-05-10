import { ColumnDef } from "../../../shared/components/DataTable";
import { formatDate } from "../../../utils/date";
import { CustomerResponse } from "../types";

export const CustomerColumns: ColumnDef<CustomerResponse>[] = [
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