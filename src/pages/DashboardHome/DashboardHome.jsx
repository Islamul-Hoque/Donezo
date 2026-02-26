import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpRight, FiPlus, FiPlay } from 'react-icons/fi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Video } from 'lucide-react';

const DashboardHome = () => {
  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ovRes, analyticsRes, teamRes] = await Promise.all([
          axios.get('https://task-api-eight-flax.vercel.app/api/overview'),
          axios.get('https://task-api-eight-flax.vercel.app/api/analytics'),
          axios.get('https://task-api-eight-flax.vercel.app/api/users')
        ]);
        setOverview(ovRes.data);
        setAnalytics(analyticsRes.data);
        setTeam(teamRes.data);
      } catch (err) {
        console.error("Data Fetching Error:", err);
      }
    };
    fetchData();
  }, []);

  if (!overview) return <div className="p-10 text-center text-[#1B5E3F] font-bold">Loading...</div>;

  // সর্বোচ্চ ভ্যালু বের করা যাতে চার্ট ডাইনামিক হয়
  const maxViews = analytics.length > 0 ? Math.max(...analytics.map(o => o.views)) : 100;

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#1B5E3F] text-white px-5 py-2.5 rounded-2xl font-medium hover:bg-[#14472f] transition-all">
            <FiPlus /> Add Project
          </button>
          <button className="border border-gray-200 bg-white text-gray-700 px-5 py-2.5 rounded-2xl font-medium hover:bg-gray-50 transition-all">
            Import Data
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 rounded-[32px] p-8 shadow-sm bg-[#1B5E3F] flex flex-col justify-between h-[180px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="text-white/80 text-sm font-medium">Total Projects</span>
            <div className="p-2 bg-white/10 rounded-full text-white">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-white text-5xl font-bold relative z-10">{overview.totalProjects}</span>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-start">
            <span className="text-gray-400 text-sm font-medium">Ended Projects</span>
            <div className="p-2 bg-gray-50 rounded-full text-gray-400">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-gray-800 text-4xl font-bold">{overview.ended}</span>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-start">
            <span className="text-gray-400 text-sm font-medium">Running Projects</span>
            <div className="p-2 bg-gray-50 rounded-full text-gray-400">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-gray-800 text-4xl font-bold">{overview.running}</span>
        </div>

        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-start">
            <span className="text-gray-400 text-sm font-medium">Pending Projects</span>
            <div className="p-2 bg-gray-50 rounded-full text-gray-400">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-gray-800 text-4xl font-bold">{overview.pending}</span>
        </div>
      </div>

      {/* Middle Section - 3 Equal Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Project Analytics (Custom Chart Fix) */}
        <div className="bg-white rounded-[32px] shadow-sm p-6 border border-gray-50 flex flex-col h-[320px]">
          <h2 className="text-lg font-bold mb-6 text-gray-900">Project Analytics</h2>

          <div className="flex items-end justify-between gap-3 h-full px-2">
            {analytics.map((item, index) => {
              // এপিআই ডাটা ছোট হওয়ায় (item.views / maxViews) ব্যবহার করেছি
              const heightFactor = (item.views / maxViews) * 100;

              return (
                <div key={index} className="flex flex-col items-center flex-1 group h-full justify-end">
                  {/* Bar */}
                  <div
                    className={`w-full rounded-full transition-all duration-700 cursor-pointer ${index % 2 === 0 ? 'bg-[#1B5E3F]' : 'bg-[#D1FAE5]'
                      }`}
                    style={{ height: `${heightFactor}%`, minHeight: '10%' }}
                    title={`Views: ${item.views}`}
                  ></div>

                  {/* Date Label */}
                  <span className="text-[10px] text-gray-400 mt-3 font-medium">
                    {item.date.split('-')[2]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Reminders */}



        <div className="bg-white rounded-[32px] shadow-sm p-8 border border-gray-50 flex flex-col justify-between h-[320px]">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-8">Reminders</h3>
            <div className="space-y-2">

              <p className="text-[1.7rem] font-bold text-[#1B5E3F] leading-tight">
                Meeting with Arc  Company
              </p>
              <p className="text-[1.3rem] text-gray-700 font-medium leading-tight ">
                Time : 02.00 pm – 04.00 pm
              </p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#1B5E3F] to-[#2d7a53de] text-white py-4 rounded-full text-base font-semibold shadow-lg shadow-green-900/20 hover:from-[#14472f] hover:to-[#1B5E3F] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">

            <Video size={20} strokeWidth={2.5} />
            Start Meeting
          </button>
        </div>


        {/* 3. Project Mini List */}
        <div className="bg-white rounded-[32px] shadow-sm p-7 border border-gray-50 h-[320px] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Project</h3>
            <button className="text-[#1B5E3F] text-xs font-bold bg-[#D1FAE5] px-3 py-1 rounded-lg">+ New</button>
          </div>
          <ul className="space-y-4">
            {["Develop API Endpoints", "Onboarding Flow", "Build Dashboard"].map((item, i) => (
              <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-none">
                <div>
                  <p className="text-[13px] font-bold text-gray-700">{item}</p>
                  <p className="text-[10px] text-gray-400">Nov 26, 2024</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Collaboration */}
        <div className="bg-white rounded-[32px] shadow-sm p-7 border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Team Collaboration</h3>
            <button className="text-gray-400 hover:text-[#1B5E3F]"><FiPlus /></button>
          </div>
          <div className="space-y-4">
            {team.slice(0, 4).map((member, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={member.avatar} className="w-10 h-10 rounded-full border border-gray-100 object-cover" alt="" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-800 leading-none">{member.name}</span>
                  <span className="text-[10px] text-gray-400 mt-1">Working on Task #{member.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-[#1B5E3F] rounded-[40px] shadow-sm p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <h3 className="mb-6 font-bold text-lg">Project Progress</h3>
          <div className="w-32 h-32">
            <CircularProgressbar
              value={41}
              text={`41%`}
              strokeWidth={12}
              styles={buildStyles({
                textSize: '22px',
                textColor: '#fff',
                pathColor: '#fff',
                trailColor: 'rgba(255,255,255,0.15)',
              })}
            />
          </div>
          <div className="mt-6 flex gap-4 text-[10px]">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full"></div> Completed</span>
            <span className="flex items-center gap-1 opacity-50"><div className="w-2 h-2 bg-white rounded-full"></div> Pending</span>
          </div>
        </div>

        {/* Time Tracker */}
        <div className="bg-[#1B5E3F] rounded-[40px] shadow-sm p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <h3 className="font-bold text-lg mb-6">Time Tracker</h3>
          <div className="text-4xl font-bold mb-8 italic">01:24:08</div>
          <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
            <FiPlay className="text-2xl fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;