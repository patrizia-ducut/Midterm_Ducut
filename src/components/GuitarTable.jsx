import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const BODY_TYPES = ["All", "Electric", "Acoustic", "Bass", "Classical"];

export default function GuitarTable({ guitars, selectedId, onSelectRow }) {
  const [bodyTypeFilter, setBodyTypeFilter] = useState("All");

  const filteredData = useMemo(() => {
    if (bodyTypeFilter === "All") return guitars;
    return guitars.filter((g) => g.bodyType === bodyTypeFilter);
  }, [guitars, bodyTypeFilter]);

  const columns = useMemo(
    () => [
      { header: "Model", accessorKey: "guitarModel" },
      { header: "Body Type", accessorKey: "bodyType" },
      { header: "Brand", accessorKey: "brandName" },
      { header: "Stock", accessorKey: "stockQuantity" },
      { header: "Manufacturer", accessorKey: "manufacturerName" },
      { header: "Role", accessorKey: "userRole" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 4 } },
  });

  return (
    <div className="border border-brass/40 bg-white/60 p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Registry</h2>

        <label className="flex items-center gap-2 text-sm">
          Filter by body type
          <select
            value={bodyTypeFilter}
            onChange={(e) => setBodyTypeFilter(e.target.value)}
            className="border border-walnut/20 bg-white px-2 py-1 text-sm outline-none focus:border-saddle"
          >
            {BODY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-brass/40 text-left">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2 pr-4 font-medium text-walnut/70">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-6 text-center text-walnut/50">
                  No guitars match this filter yet.
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => {
              const isSelected = row.original.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow(row.original.id)}
                  className={`cursor-pointer border-b border-walnut/10 transition ${
                    isSelected ? "bg-brass/20" : "hover:bg-brass/10"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-2 pr-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border border-walnut/30 px-3 py-1 disabled:opacity-30"
        >
          Previous
        </button>
        <span className="text-walnut/70">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border border-walnut/30 px-3 py-1 disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}