import React, { useState } from 'react'; 
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {FiGrid, FiCheckSquare, FiCalendar, FiBarChart2, FiUsers,  FiSettings, FiHelpCircle, FiLogOut, FiSearch, FiMail, FiBell, FiMenu, FiX } from 'react-icons/fi';
import User from '../../assets/user.png'
import Donezo from '../../assets/donezo.png'
import MiniPic from '../../assets/miniPic.png'
import DownloadAppBg from '../../assets/downloadAppBg.png'

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex max-w-7xl mx-auto h-screen bg-white md:p-4 p-2 font-sans overflow-hidden relative">
            {isSidebarOpen && ( <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} ></div> )}

            {/* Sidebar */}
            <aside className={` fixed inset-y-0 left-0 z-50  w-[270px] bg-[#F3F4F6] transition-transform duration-300 transform md:relative md:translate-x-0 md:rounded-2xl flex flex-col py-6 px-4  overflow-y-auto   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}>
                {/* Close Button */}
                <button className="md:hidden absolute right-4 top-4 text-gray-500" onClick={() => setIsSidebarOpen(false)}> <FiX size={24} /> </button>

                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-10 ml-2 shrink-0">
                    <img src={Donezo} alt="logo" className="w-8" />
                    <span className="text-xl font-bold text-[#111827]">Donezo</span>
                </div>

                <nav className="flex-1 flex flex-col shrink-0">
                    {/* Menu Group */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-4">Menu</p>
                        <ul className="space-y-1">
                            <li>
                                <NavLink to="/" onClick={() => setIsSidebarOpen(false)} className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all relative ${
                                        isActive ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                                    }`
                                }>
                                    {({ isActive }) => (
                                        <>
                                            {isActive && <div className="absolute left-[-24px] w-1.5 h-8 bg-[#1B5E3F] rounded-r-full"></div>}
                                            <FiGrid className={`text-xl ${isActive ? 'text-[#1B5E3F]' : ''}`} />  <span>Dashboard</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <NavLink to="/" className="flex items-center justify-between px-4 py-3 text-gray-400 cursor-pointer">
                                <div className="flex items-center gap-4"><FiCheckSquare className="text-xl" /><span>Tasks</span></div>
                                <span className="bg-[#0e3a26d8] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">12+</span>
                            </NavLink>
                            <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiCalendar className="text-xl" /><span>Calendar</span></li>
                            <li className="flex gap-4 items-center px-4 py-3 text-gray-400 cursor-pointer"><FiBarChart2 className="text-xl" /><span>Analytics</span></li>
                            <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiUsers className="text-xl" /><span>Team</span></li>
                        </ul>
                    </div>

                    {/* General Group */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-4">General</p>
                        <ul className="space-y-1">
                            <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiSettings className="text-xl" /><span>Settings</span></li>
                            <li className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer"><FiHelpCircle className="text-xl" /><span>Help</span></li>
                            <li onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 text-gray-400 cursor-pointer hover:text-red-500">
                                <FiLogOut className="text-xl" /><span>Logout</span>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile App Download img */}
                    <div className="mt-auto border border-gray-100 rounded-[32px] p-6 relative overflow-hidden flex flex-col min-h-[200px] bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${DownloadAppBg})` }}>
                        <div className="absolute inset-0 bg-black/20 z-0"></div>
                        <div className="relative z-10">
                            <div className="w-13 h-13 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <img src={MiniPic} alt="mini-logo" />
                            </div>
                            <h4 className="text-white text-lg leading-tight font-medium">Download our</h4>
                            <h4 className="text-white text-lg font-bold">Mobile App</h4>
                            <p className="text-gray-300 text-[11px] mt-1">Get easy in another way</p>
                        </div>
                        <button className="relative cursor-pointer z-10 mt-4 w-full bg-[#1B5E3F]/80 backdrop-blur-md text-white py-2.5 rounded-2xl text-sm font-medium hover:bg-[#1B5E3F] transition-all">    Download  </button>
                    </div>
                </nav>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col md:pr-0 px-4 overflow-hidden">
                <header className="flex bg-[#F3F4F6] justify-between rounded-2xl items-center py-4 px-4 mb-2 shrink-0">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle Button */}
                        <button className="md:hidden text-gray-600" onClick={() => setIsSidebarOpen(true)}>   <FiMenu size={24} /> </button>

                        <div className="relative group hidden sm:block">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">  <FiSearch className="text-lg" /> </div>
                            <input  type="text"  placeholder="Search task" className="bg-white border-none outline-none focus:ring-2 focus:ring-gray-200 rounded-2xl py-3 pl-12 pr-16 lg:w-[350px] md:w-[200px] text-sm transition-all"/>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 border border-gray-200 rounded-md px-2 py-1 text-[12px] text-gray-900 font-medium hidden lg:block">   ⌘ F  </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2.5 bg-white rounded-full text-gray-500 cursor-pointer border border-transparent hover:border-gray-200 transition-all"><FiMail /></div>
                            <div className="p-2.5 bg-white rounded-full text-gray-500 cursor-pointer border border-transparent hover:border-gray-200 transition-all"><FiBell /></div>
                        </div>

                        {/* Profile  */}
                        <div className="flex items-center gap-1">
                            <img  src={User} alt="user"  className="w-10 md:w-13 rounded-full"  />
                            <div className="hidden sm:flex flex-col">
                                <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || "Totok Michael"}</p>
                                <p className="text-[11px] text-gray-400 mt-1">{user?.email }</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto pt-2">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;