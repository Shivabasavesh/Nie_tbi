import React from 'react';
import LoadingSpinner from '../system/LoadingSpinner';

const DataTable = ({ columns, data, isLoading, emptyMessage = 'No data available', actions }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner className="h-8 w-8 text-nie-orange" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg bg-white">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                >
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
              {actions && (
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
