// import React, { useState, useEffect } from 'react';
// import { FiArrowUpRight } from 'react-icons/fi';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

// const DashboardHome = () => {
//   // state for the four summary cards -- initial values zero so UI doesn't break
//   const [stats, setStats] = useState([
//     {
//       title: 'Total Projects',
//       value: 0,
//       bg: 'bg-gradient-to-r from-green-400 to-green-600',
//       text: 'text-white',
//       colSpan: 'lg:col-span-2',
//       subtitle: 'Updated from server',
//     },
//     { title: 'Ended Projects', value: 0, bg: 'bg-white', text: 'text-gray-800' },
//     { title: 'Running Projects', value: 0, bg: 'bg-white', text: 'text-gray-800' },
//     { title: 'Pending Project', value: 0, bg: 'bg-white', text: 'text-gray-800' },
//   ]);

//   useEffect(() => {
//     // load overview data from API and update the stats cards
//     import('axios').then(({ default: axios }) => {
//       axios
//         .get('https://dashboard-sable-six.vercel.app/overview')
//         .then((res) => {
//           const data = res.data;
//           setStats([
//             {
//               title: 'Total Projects',
//               value: data.totalProjects || 0,
//               bg: 'bg-gradient-to-r from-green-400 to-green-600',
//               text: 'text-white',
//               colSpan: 'lg:col-span-2',
//               subtitle: 'Updated from server',
//             },
//             { title: 'Ended Projects', value: data.ended || 0, bg: 'bg-white', text: 'text-gray-800' },
//             { title: 'Running Projects', value: data.running || 0, bg: 'bg-white', text: 'text-gray-800' },
//             { title: 'Pending Project', value: data.pending || 0, bg: 'bg-white', text: 'text-gray-800' },
//           ]);
//         })
//         .catch((err) => {
//           console.error('Failed to load overview stats', err);
//         });
//     });
//   }, []);

//   return (
//     <div className="space-y-6">
//       {/* header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//         <div>
//           <h1 className="text-3xl font-semibold">Dashboard</h1>
//           <p className="text-gray-500">Plan, prioritize, and accomplish your tasks with ease.</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex space-x-2">
//           <button className="btn btn-success">+ Add Project</button>
//           <button className="btn btn-outline">Import Data</button>
//         </div>
//       </div>

//       {/* top stats cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((s, idx) => (
//           <div
//             key={idx}
//             className={`${s.colSpan || ''} rounded-lg p-6 shadow ${s.bg} h-32 flex flex-col justify-between`}
//           >
//             <div className="flex justify-between items-start">
//               <span className={`${s.text} text-sm`}>{s.title}</span>
//               <FiArrowUpRight className={`${s.text} text-xl`} />
//             </div>
//             <div>
//               <span className={`${s.text} text-2xl font-bold`}>{s.value}</span>
//               {s.subtitle && (
//                 <p className="text-xs mt-1 opacity-75">{s.subtitle}</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* second section - analytics and reminders/projects */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* analytics card taking 2 columns on large */}
//         <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Project Analytics</h2>
//           {/* simple bar chart imitation */}
//           <div className="flex items-end space-x-2 h-32">
//             {[1,2,3,4,5,6,7].map((n) => (
//               <div key={n} className="bg-green-500" style={{width: '14%', height: `${20 + n*10}%`}}></div>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4">
//           {/* reminders */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <h3 className="font-semibold mb-2">Reminders</h3>
//             <p className="text-sm">Meeting with Arc Company</p>
//             <p className="text-xs text-gray-500">Time : 02.00 pm – 04.00 pm</p>
//             <button className="mt-2 btn btn-sm btn-primary">Start Meeting</button>
//           </div>

//           {/* project list */}
//           <div className="bg-white rounded-lg shadow p-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-semibold">Project</h3>
//               <button className="btn btn-sm btn-outline">+ New</button>
//             </div>
//             <ul className="space-y-1 text-sm">
//               <li>Develop API Endpoints <span className="text-gray-400">Nov 26, 2024</span></li>
//               <li>Onboarding Flow <span className="text-gray-400">Nov 28, 2024</span></li>
//               <li>Build Dashboard <span className="text-gray-400">Nov 30, 2024</span></li>
//               <li>Optimize Page Load <span className="text-gray-400">Dec 5, 2024</span></li>
//               <li>Cross-Browser Testing <span className="text-gray-400">Dec 6, 2024</span></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* third section - team, progress, timer */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* team collaboration */}
//         <div className="bg-white rounded-lg shadow p-4">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold">Team Collaboration</h3>
//             <button className="btn btn-xs btn-outline">+ Add Member</button>
//           </div>
//           <ul className="space-y-2">
//             <li className="flex items-center space-x-2">
//               <img src="https://i.pravatar.cc/24?u=alex" className="w-6 h-6 rounded-full" />
//               <span className="text-sm">Alexandra Deff <span className="text-gray-400">Working on Github Project Repository</span></span>
//             </li>
//             <li className="flex items-center space-x-2">
//               <img src="https://i.pravatar.cc/24?u=edwin" className="w-6 h-6 rounded-full" />
//               <span className="text-sm">Edwin Adenike <span className="text-gray-400">Working on Integrate User Authentication System</span></span>
//             </li>
//             <li className="flex items-center space-x-2">
//               <img src="https://i.pravatar.cc/24?u=isaac" className="w-6 h-6 rounded-full" />
//               <span className="text-sm">Isaac Oluwatimirelrun <span className="text-gray-400">Working on Develop Search and Filter Functionality</span></span>
//             </li>
//             <li className="flex items-center space-x-2">
//               <img src="https://i.pravatar.cc/24?u=david" className="w-6 h-6 rounded-full" />
//               <span className="text-sm">David Oshodi <span className="text-gray-400">Working on Responsive Layout for Homepage</span></span>
//             </li>
//           </ul>
//         </div>

//         {/* project progress */}
//         <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow p-4 flex flex-col items-center justify-center text-white">
//           <h3 className="mb-2 font-semibold">Project Progress</h3>
//           <div className="w-32 h-32">
//             <CircularProgressbar
//               value={41}
//               text={`41%`}
//               styles={buildStyles({
//                 textSize: '16px',
//                 pathColor: '#10B981',
//                 trailColor: '#D1FAE5',
//               })}
//             />
//           </div>
//           <div className="mt-2 text-xs text-gray-500 flex space-x-2">
//             <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Completed</span>
//             <span className="flex items-center"><span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>In Progress</span>
//             <span className="flex items-center"><span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span>Pending</span>
//           </div>
//         </div>

//         {/* time tracker */}
//         <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow p-4 flex flex-col items-center justify-center text-white">
//           <h3 className="font-semibold mb-2">Time Tracker</h3>
//           <div className="text-2xl font-mono">01:24:08</div>
//           <div className="mt-2 space-x-2">
//             <button className="btn btn-circle btn-sm btn-ghost">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.586-2.714M9.5 9.5v5l4.5-2.5-4.5-2.5z" /></svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;