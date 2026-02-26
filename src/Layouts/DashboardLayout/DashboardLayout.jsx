// import React from 'react';
// import { NavLink, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import {
//     FiHome,
//     FiList,
//     FiCalendar,
//     FiBarChart2,
//     FiUsers,
//     FiSettings,
//     FiHelpCircle,
//     FiLogOut,
//     FiSearch,
//     FiMail,
//     FiBell
// } from 'react-icons/fi';

// const DashboardLayout = () => {
//     const { logout, user } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <div className="flex h-screen bg-white p-4 font-sans">
//             {/* Sidebar */}
//             <aside className="w-[280px] bg-[#F4F7F6] rounded-2xl flex flex-col py-8 px-6 border-r border-gray-100">
//                 {/* Logo Section */}
//                 <div className="flex items-center gap-3 mb-12 ml-2">
//                     <img src="/donezo.png" alt="logo" className="w-10" />
//                     <span className="text-2xl font-bold text-[#111827]">Donezo</span>
//                 </div>

//                 <nav className="flex-1 space-y-8">
//                     {/* Menu Group */}
//                     <div>
//                         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px] mb-6 ml-2">Menu</p>
//                         <ul className="">
//                             <li>
//                                 <NavLink to="/" className={({ isActive }) =>
//                                     `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all relative ${isActive ? 'text-[#1B5E3F] font-semibold bg-transparent' : 'text-gray-400 hover:text-gray-600'
//                                     }`
//                                 }>
//                                     {({ isActive }) => (
//                                         <>
//                                             {isActive && <div className="absolute left-[-24px] w-2 h-8 bg-[#1B5E3F] rounded-r-full"></div>}
//                                             <FiHome className={`text-xl ${isActive ? 'text-[#1B5E3F]' : ''}`} />
//                                             <span>Dashboard</span>
//                                         </>
//                                     )}
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/tasks" className="flex items-center justify-between px-4 py-3 text-gray-400 hover:text-gray-600">
//                                     <div className="flex items-center gap-4">
//                                         <FiList className="text-xl" />
//                                         <span>Tasks</span>
//                                     </div>
//                                     <span className="bg-[#0E3A26] text-white text-[10px] px-2 py-0.5 rounded-md font-bold tracking-tighter">12+</span>
//                                 </NavLink>
//                             </li>
//                             <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiCalendar className="text-xl" /><span>Calendar</span></li>
//                             <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiBarChart2 className="text-xl" /><span>Analytics</span></li>
//                             <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiUsers className="text-xl" /><span>Team</span></li>
//                         </ul>
//                     </div>

//                     {/* General Group */}
//                     <div>
//                         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px] mb-6 ml-2">General</p>
//                         <ul className="">
//                             <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiSettings className="text-xl" /><span>Settings</span></li>
//                             <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiHelpCircle className="text-xl" /><span>Help</span></li>
//                             <li onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer hover:text-red-500">
//                                 <FiLogOut className="text-xl" /><span>Logout</span>
//                             </li>
//                         </ul>
//                     </div>
//                 </nav>

//                 {/* Mobile App Card */}
//                <div className="mt-auto bg-[#041E13] rounded-[32px] p-6 pt-8 relative overflow-hidden h-[200px] flex flex-col justify-between">
//                     <div className="relative z-10">
//                         <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mb-4">
//                             <img src="/mini-logo.png" alt="mini-logo" className="w-4 h-4" /> 
//                         </div>
//                         <h4 className="text-white text-lg font-medium leading-tight">Download <span className="text-gray-300">our</span></h4>
//                         <h4 className="text-white text-lg font-medium mb-1">Mobile App</h4>
//                         <p className="text-gray-400 text-[11px]">Get easy in another way</p>
//                     </div>
                    
//                     {/* Placeholder for your Custom Button component */}
//                     <div className="relative z-10 mt-4">
//                         {/* Your Custom Download Button goes here */}
//                     </div>

//                     {/* Background abstract patterns */}
//                     <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
//                         <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-green-400 rounded-full"></div>
//                     </div>
//                 </div>
//             </aside>

//             {/* Main Area */}
//             <main className="flex-1 flex flex-col px-4 overflow-hidden">
//                 {/* Header */}
//                 <header className="flex justify-between items-center bg-[#F4F7F6] rounded-2xl px-8 py-4 mb-6 shadow-sm">
//                     <label className="input rounded-full">
//                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                             <g
//                                 strokeLinejoin="round"
//                                 strokeLinecap="round"
//                                 strokeWidth="2.5"
//                                 fill="none"
//                                 stroke="currentColor"
//                             >
//                                 <circle cx="11" cy="11" r="8"></circle>
//                                 <path d="m21 21-4.3-4.3"></path>
//                             </g>
//                         </svg>
//                         <input type="search" className="grow" placeholder="Search" />
//                         <kbd className="kbd kbd-sm">⌘K</kbd>

//                     </label>

//                     <div className="flex items-center gap-4">
//                         <div className="p-3 bg-gray-50 rounded-full text-gray-500 cursor-pointer"><FiMail /></div>
//                         <div className="p-3 bg-gray-50 rounded-full text-gray-500 cursor-pointer"><FiBell /></div>

//                         <div className="flex items-center gap-3 ml-4">
//                             <div className="text-right">
//                                 <p className="text-sm font-bold text-gray-800 leading-none mb-1">Totok Michael</p>
//                                 <p className="text-[11px] text-gray-400 tracking-tight">tmichael20@mail.com</p>
//                             </div>
//                             <img
//                                 src="https://i.pravatar.cc/150?u=michael"
//                                 alt="user"
//                                 className="w-12 h-12 rounded-full border-4 border-pink-100"
//                             />
//                         </div>
//                     </div>
//                 </header>

//                 {/* Content Area */}
//                 <div className="flex-1 overflow-auto bg-[#F4F7F6] rounded-2xl p-8 shadow-sm">
//                     <Outlet />
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default DashboardLayout;