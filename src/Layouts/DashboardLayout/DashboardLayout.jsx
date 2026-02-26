import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    FiGrid, // Dashboard এর জন্য সঠিক আইকন
    FiCheckSquare, // Tasks এর জন্য
    FiCalendar,
    FiBarChart2,
    FiUsers,
    FiSettings,
    FiHelpCircle,
    FiLogOut,
    FiSearch,
    FiMail,
    FiBell
} from 'react-icons/fi';
import asideImg from '../../../public/asideImg.png';

const DashboardLayout = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-white p-4 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[280px] bg-[#F3F4F6] rounded-[32px] flex flex-col py-8 px-6 h-full overflow-y-auto">
                {/* Logo Section */}
                <div className="flex items-center gap-3 mb-10 ml-2 shrink-0">
                    <img src="/donezo.png" alt="logo" className="w-8" />
                    <span className="text-xl font-bold text-[#111827]">Donezo</span>
                </div>

                <nav className="flex-1 flex flex-col shrink-0">
                    {/* Menu Group */}
                    <div className="mb-8">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-4">Menu</p>
                        <ul className="space-y-1">
                            <li>
                                <NavLink to="/" className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all relative ${
                                        isActive ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                                    }`
                                }>
                                    {({ isActive }) => (
                                        <>
                                            {isActive && <div className="absolute left-[-24px] w-1.5 h-8 bg-[#1B5E3F] rounded-r-full"></div>}
                                            <FiGrid className={`text-xl ${isActive ? 'text-[#1B5E3F]' : ''}`} />
                                            <span>Dashboard</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>

                            <li className="flex items-center justify-between px-4 py-3 text-gray-400 cursor-pointer">
                                <div className="flex items-center gap-4"><FiCheckSquare className="text-xl" /><span>Tasks</span></div>
                                <span className="bg-[#0E3A26] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">12+</span>
                            </li>
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

                    {/* Mobile App Card */}
                    <div className="mt-auto border border-gray-100 rounded-[32px] p-6 relative overflow-hidden flex flex-col min-h-[200px] bg-cover bg-center shrink-0"
                         style={{ backgroundImage: `url(${asideImg})` }}>
                        <div className="absolute inset-0 bg-black/20 z-0"></div>
                        <div className="relative z-10">
                            <div className="w-13 h-13 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <img src="/miniPic.png" alt="mini-logo" className="" />
                            </div>
                            <h4 className="text-white text-lg leading-tight font-medium">Download our</h4>
                            <h4 className="text-white text-lg font-bold">Mobile App</h4>
                            <p className="text-gray-300 text-[11px] mt-1">Get easy in another way</p>
                        </div>
                        <button className="relative z-10 mt-4 w-full bg-[#1B5E3F]/80 backdrop-blur-md text-white py-2.5 rounded-2xl text-sm font-medium hover:bg-[#1B5E3F] transition-all">
                            Download
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Area */}
            <main className="flex-1  flex flex-col px-4 overflow-hidden">
                {/* Header */}
                <header className="flex bg-[#F3F4F6] justify-between rounded-2xl items-center py-4 px-4 mb-2 shrink-0">
                    {/* Search Field Fix */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiSearch className="text-lg" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search task" 
                            className="bg-white border-none outline-none focus:ring-2 focus:ring-gray-200 rounded-2xl py-3 pl-12 pr-16 w-[350px] text-sm transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 border border-gray-200 rounded-md px-2 py-1 text-[12px] text-gray-900 font-medium">
                           ⌘ F
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2.5 bg-white rounded-full text-gray-500 cursor-pointer border border-transparent hover:border-gray-200 transition-all"><FiMail /></div>
                            <div className="p-2.5 bg-white rounded-full text-gray-500 cursor-pointer border-transparent hover:border-gray-200 transition-all"><FiBell /></div>
                        </div>

                        {/* Profile Section Fix: Image first, then info */}
                        <div className="flex items-center gap-3">
                            <img 
                                src="https://i.pravatar.cc/150?u=michael" 
                                alt="user" 
                                className="w-11 h-11 rounded-full border-2 border-white shadow-sm"
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-gray-800 leading-none">{user?.name || "Totok Michael"}</p>
                                <p className="text-[11px] text-gray-400 mt-1">{user?.email || "tmichael20@mail.com"}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;