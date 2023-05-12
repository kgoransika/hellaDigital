import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

function AdminNavbar() {
  const navigateBack = () => {
    window.history.back();
  };

  return (
    <div
      className="header mb-5 flex"
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
      }}
    >
      <h1 className="p-4">Hella Digital - Admin Panel</h1>
      <button
        className="btn btn-primary ms-auto me-5 mt-4 mb-4 py-2 px-4 rounded shadow border-0"
        onClick={navigateBack}
      >
        <span className="flex items-center">
          <ChevronLeftIcon className="h-6 w-6" />
          <span>Back</span>
        </span>
      </button>
    </div>
  );
}

export default AdminNavbar;
