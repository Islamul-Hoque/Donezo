import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpRight, FiPlus, FiPlay } from 'react-icons/fi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';

const DashboardHome = () => {
    const [overview, setOverview] = useState({ totalProjects: 0, ended: 0, running: 0, pending: 0 });
    const [analytics, setAnalytics] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching all data from the API endpoints
                const [ovRes, analyticsRes, teamRes] = await Promise.all([
                    axios.get('https://task-api-eight-flax.vercel.app/api/overview'),
                    axios.get('https://task-api-eight-flax.vercel.app/api/analytics'),
                    axios.get('https://task-api-eight-flax.vercel.app/api/users')
                ]);

                setOverview(ovRes.data);
                setAnalytics(analyticsRes.data);
                setTeam(teamRes.data.slice(0, 4)); // Taking first 4 members
            } catch (err) {
                console.error("API Fetch Error:", err);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { title: 'Total Projects', value: overview.totalProjects, bg: 'bg-[#1B5E3F]', text: 'text-white', colSpan: 'lg:col-span-2' },
        { title: 'Ended Projects', value: overview.ended, bg: 'bg-white', text: 'text-gray-800' },
        { title: 'Running Projects', value: overview.running, bg: 'bg-white', text: 'text-gray-800' },
        { title: 'Pending Projects', value: overview.pending, bg: 'bg-white', text: 'text-gray-800' },
    ];

    return (
        <div className="space-y-6 pb-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-1 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#1B5E3F] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#14472f] transition-all">
                        <FiPlus /> Add Project
                    </button>
                    <button className="border border-gray-200 bg-white text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all">
                        Import Data
                    </button>
                </div>
            </div>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((s, idx) => (
                    <div key={idx} className={`${s.colSpan || 'col-span-1'} rounded-[24px] p-6 shadow-sm border border-gray-50 ${s.bg} flex flex-col justify-between h-[160px] transition-transform hover:scale-[1.01]`}>
                        <div className="flex justify-between items-start">
                            <span className={`${s.text} text-sm font-medium opacity-90`}>{s.title}</span>
                            <div className={`p-2 rounded-full ${s.bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/10'}`}>
                                <FiArrowUpRight className={`${s.text} text-lg`} />
                            </div>
                        </div>
                        <span className={`${s.text} text-4xl font-bold tracking-tight`}>{s.value}</span>
                    </div>
                ))}
            </div>

            {/* Analytics & Tasks Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Real Bar Chart Analytics */}
                <div className="lg:col-span-2 bg-white rounded-[32px] shadow-sm p-8 border border-gray-50">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Project Analytics</h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics}>
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="views" radius={[6, 6, 6, 6]} barSize={35}>
                                    {analytics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1B5E3F' : '#D1FAE5'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Reminders */}
                    <div className="bg-white rounded-[28px] shadow-sm p-6 border border-gray-50">
                        <h3 className="font-bold text-gray-800 mb-4">Reminders</h3>
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold text-sm">Meeting with Arc Company</p>
                            <p className="text-xs text-gray-400">Time : 02.00 pm – 04.00 pm</p>
                            <button className="mt-4 w-full bg-[#1B5E3F] text-white py-2.5 rounded-xl text-sm font-medium">Start Meeting</button>
                        </div>
                    </div>

                    {/* Project Mini List */}
                    <div className="bg-white rounded-[28px] shadow-sm p-6 border border-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800">Project</h3>
                            <button className="text-[#1B5E3F] text-xs font-bold hover:underline">+ New</button>
                        </div>
                        <ul className="space-y-4">
                            {["Develop API Endpoints", "Onboarding Flow", "Build Dashboard"].map((item, i) => (
                                <li key={i} className="flex flex-col border-b border-gray-50 pb-2 last:border-none">
                                    <span className="text-sm font-medium text-gray-700">{item}</span>
                                    <span className="text-[10px] text-gray-400 mt-0.5">Nov 26, 2024</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Team, Progress, Timer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Dynamic Team Section */}
                <div className="bg-white rounded-[32px] shadow-sm p-6 border border-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Team Collaboration</h3>
                        <button className="text-gray-400 hover:text-gray-600"><FiPlus /></button>
                    </div>
                    <div className="space-y-5">
                        {team.map((member, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <img src={member.avatar || `https://i.pravatar.cc/150?u=${member.id}`} className="w-10 h-10 rounded-full object-cover" alt="" />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-800 leading-tight">{member.name}</span>
                                    <span className="text-[10px] text-gray-400 line-clamp-1">{member.role || "Working on Github Project"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Circular Progress */}
                <div className="bg-[#1B5E3F] rounded-[32px] shadow-sm p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                    <h3 className="mb-6 font-bold text-lg">Project Progress</h3>
                    <div className="w-36 h-36">
                        <CircularProgressbar
                            value={41}
                            text={`41%`}
                            strokeWidth={10}
                            styles={buildStyles({
                                textSize: '20px',
                                textColor: '#fff',
                                pathColor: '#fff',
                                trailColor: 'rgba(255,255,255,0.2)',
                            })}
                        />
                    </div>
                    <div className="mt-6 flex gap-4">
                        <div className="flex items-center gap-1.5 text-[10px]">
                            <div className="w-2 h-2 bg-white rounded-full"></div> Completed
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] opacity-60">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div> Pending
                        </div>
                    </div>
                </div>

                {/* Time Tracker */}
                <div className="bg-[#1B5E3F] rounded-[32px] shadow-sm p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-10 -mb-10"></div>
                    <h3 className="font-bold text-lg mb-6">Time Tracker</h3>
                    <div className="text-5xl font-bold tracking-tighter mb-6">01:24:08</div>
                    <button className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                        <FiPlay className="text-2xl fill-current" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;