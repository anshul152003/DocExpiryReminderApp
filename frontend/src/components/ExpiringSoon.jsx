import React from 'react';
import { getDaysLeft } from '../utils/dateUtils';

const ExpiringSoon = ({ documents }) => {
  return (
    <section className="my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-yellow-700 flex items-center gap-2">
          🔔 Expiring Soon
        </h2>
        <p className="text-sm text-gray-600">
          These documents are due within 7 days — don't let them expire!
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-sm">
          ✅ No documents expiring soon. You're all set!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const daysLeft = getDaysLeft(doc.expiryDate);

            return (
              <div
                key={doc._id}
                className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-yellow-800">
                    {doc.title}
                  </h3>
                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                    {doc.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700">
                  📆 Expiry Date:{' '}
                  <span className="text-red-600 font-medium">
                    {new Date(doc.expiryDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-yellow-900 mt-1">
                  ⏳ {daysLeft === 0
                    ? 'Expires Today'
                    : daysLeft === 1
                    ? 'Expires Tomorrow'
                    : `Expires in ${daysLeft} days`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ExpiringSoon;