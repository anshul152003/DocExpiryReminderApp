import React from 'react';
import { getDaysLeft } from '../utils/dateUtils';

const DocsTable = ({ documents }) => {
  return (
    <section className="my-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          📋 All Documents
        </h2>
        <p className="text-sm text-gray-600">Here’s a complete list of all your uploaded documents.</p>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-50 text-blue-800 uppercase text-sm font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Expiry Date</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {documents.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-5 text-center text-gray-500">
                  No documents available. Upload something to get started!
                </td>
              </tr>
            ) : (
              documents.map((doc) => {
                const daysLeft = getDaysLeft(doc.expiryDate);
                const isExpired = daysLeft < 0;

                let statusText = '';
                let statusColor = '';

                if (isExpired) {
                  statusText = 'Expired';
                  statusColor = 'text-red-600';
                } else if (daysLeft === 0) {
                  statusText = 'Expires Today';
                  statusColor = 'text-yellow-600';
                } else if (daysLeft === 1) {
                  statusText = 'Expires Tomorrow';
                  statusColor = 'text-orange-600';
                } else if (daysLeft <= 7) {
                  statusText = `Expiring in ${daysLeft} days`;
                  statusColor = 'text-yellow-700';
                } else {
                  statusText = 'Active';
                  statusColor = 'text-green-600';
                }

                return (
                  <tr
                    key={doc._id}
                    className="hover:bg-gray-50 border-t border-gray-100"
                  >
                    <td className="px-6 py-4">{doc.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(doc.expiryDate).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-4 font-semibold ${statusColor}`}>
                      {statusText}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DocsTable;
