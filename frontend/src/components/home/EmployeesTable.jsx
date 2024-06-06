import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const EmployeesTable = ({ employees }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label className="sr-only">Search</label>
        <div className="relative mt-1">
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.85-3.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      {filteredEmployees.length > 0 ? (
        <table className='w-full border-collapse border border-gray-200'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Name</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>ID</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Net Salary</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Contract</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee._id} className='border-b border-gray-200'>
                <td className='px-5 py-3 text-sm'>
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-gray-900">{employee.name}</p>
                      <p className="text-gray-600">{employee.id}</p>
                    </div>
                  </div>
                </td>
                <td className='px-5 py-3 text-sm'>{employee.netSalary} USD</td>
                <td className='px-5 py-3 text-sm'>{employee.contractType}</td>
                <td className='px-5 py-3 text-sm'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/employee/details/${employee._id}`} title="Details">
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/employee/edit/${employee._id}`} title="Edit">
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/employee/delete/${employee._id}`} title="Delete">
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeesTable;
