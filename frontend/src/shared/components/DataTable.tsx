export interface ColumnDef<T> {
    key: string;
    header: string;
    className?: string;
    headerClassName?: string;
    render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    rowKey: (row: T) => string;
}

const thBase =
    "pb-3 text-left text-xs font-medium uppercase tracking-wide text-slate-400";

const tdBase = "py-3 pr-6";

export function DataTable<T>({ data, columns, rowKey }: DataTableProps<T>) {
    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-slate-100">
                    {columns.map((col) => (
                        <th key={col.key} className={`${thBase} ${col.headerClassName ?? ""}`}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {data.map((row) => (
                    <tr key={rowKey(row)} className="transition-colors hover:bg-slate-50">
                        {columns.map((col) => (
                            <td key={col.key} className={`${tdBase} ${col.className ?? ""}`}>
                                {col.render(row)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}