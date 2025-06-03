"use client";
import React, { useState } from "react";

export default function TableData({ data }) {
  const rowsPerPageOptions = [10, 20, 50]
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!data) return <div></div>;


  const dates = data.daily.time;
  const totalRows = dates.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

// pagination logic
  const paginatedData = dates.slice(start, end).map((date, index) => ({
    date: new Date(date).toLocaleDateString(),
    min: data.daily.temperature_2m_min[start + index],
    mean: data.daily.temperature_2m_mean[start + index],
    max: data.daily.temperature_2m_max[start + index],
    appMin: data.daily.apparent_temperature_min[start + index],
    appMean: data.daily.apparent_temperature_mean[start + index],
    appMax: data.daily.apparent_temperature_max[start + index],
  }));

  return (
    <div className="w-full mt-10">
      <h2 className="text-lg font-semibold mb-2">Weather Table</h2>

      <div className="mb-4 gap-2 flex md:flex-row flex-col md:justify-between md:items-center">
        <div>
          <label className="mr-2 text-sm font-medium">Rows per page:</label>
          <select
            className="border rounded p-1 bg-blue-600 text-white"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset to first page
            }}
          >
            {rowsPerPageOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-2 py-1 mr-2 bg-blue-600 hover:bg-blue-500 rounded text-white cursor-pointer"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-2 py-1 ml-2 bg-blue-600 hover:bg-blue-500 rounded text-white cursor-pointer"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Min Temp (°C)</th>
              <th className="p-2 border">Mean Temp (°C)</th>
              <th className="p-2 border">Max Temp (°C)</th>
              <th className="p-2 border">Min Temp (°C)</th>
              <th className="p-2 border">Mean Temp (°C)</th>
              <th className="p-2 border">Max Temp (°C)</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border text-center bg-blue-800 text-white">{row.date}</td>
                <td className="p-2 border text-center bg-blue-200">{row.min}</td>
                <td className="p-2 border text-center bg-blue-200">{row.mean}</td>
                <td className="p-2 border text-center bg-blue-200">{row.max}</td>
                <td className="p-2 border text-center bg-blue-200">{row.appMin}</td>
                <td className="p-2 border text-center bg-blue-200">{row.appMean}</td>
                <td className="p-2 border text-center bg-blue-200">{row.appMax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
