import React from 'react';

const InfoCard = ({
  title,
  subtitle,
  value,
  footer,
  icon,
  bgColor,
  borderColor,
  hoverColor,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`bg-${bgColor}-50 rounded-2xl p-4 shadow-sm border border-${borderColor}-100 hover:bg-${hoverColor}-100 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-${bgColor}-500 focus:ring-offset-2`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 bg-${bgColor}-500 rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <div className="mb-2">
      <p className="text-sm text-gray-600">{subtitle}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
    <p className="text-xs text-gray-500">{footer}</p>
  </button>
);

const Sgroup = () => {
  const cardData = [
    {
      id: 'fee',
      title: 'Fee Payments',
      subtitle: 'Dues',
      value: 'INR 1,18,800.00',
      footer: 'As on Sep 19, 15:13 PM',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      bgColor: 'red',
      borderColor: 'red',
      hoverColor: 'red',
      onClick: () => console.log('Fee box clicked'),
    },
    {
      id: 'attendance',
      title: 'Attendance',
      subtitle: 'Attendance',
      value: '60.37 %',
      footer: 'As on Sep 19, 15:12 PM',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      bgColor: 'green',
      borderColor: 'green',
      hoverColor: 'green',
      onClick: () => console.log('Attendance box clicked'),
    },
    {
      id: 'events',
      title: 'Campus Events',
      subtitle: 'Upcoming Events',
      value: '5 Events',
      footer: 'This Week',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'purple',
      borderColor: 'purple',
      hoverColor: 'purple',
      onClick: () => console.log('Campus Events box clicked'),
    },
    {
      id: 'sports',
      title: 'Sports',
      subtitle: 'Active Sports',
      value: '3 Sports',
      footer: 'Currently Enrolled',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: 'blue',
      borderColor: 'blue',
      hoverColor: 'blue',
      onClick: () => console.log('Sports box clicked'),
    },
  ];

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {cardData.slice(0, 2).map((card) => (
          <InfoCard key={card.id} {...card} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {cardData.slice(2, 4).map((card) => (
          <InfoCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Sgroup;