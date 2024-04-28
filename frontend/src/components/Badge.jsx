import React from 'react';

const Badge = ({ status }) => {
  let colorClass = '';
  switch (status) {
    case 'new':
      colorClass = 'bg-green-500';
      break;
    case 'open':
      colorClass = 'bg-blue-500';
      break;
    case 'closed':
      colorClass = 'bg-red-500';
      break;
    default:
      colorClass = 'bg-gray-500';
  }

  return (
    <span className={`inline-block text-sm px-2 py-1 rounded-full text-white ${colorClass}`}>
      {status?.toUpperCase()}
    </span>
  );
};

export default Badge;
