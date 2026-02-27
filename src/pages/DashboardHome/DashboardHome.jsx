import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowUpRight, FiPlus, FiPlay } from 'react-icons/fi';
import 'react-circular-progressbar/dist/styles.css';
import { Video } from 'lucide-react';
import { Pause, Square } from 'lucide-react';
import { Plus } from 'lucide-react';


const statusStyles = {
  Completed: "bg-green-50 text-green-600 border-green-100",
  "In Progress": "bg-orange-50 text-orange-600 border-orange-100",
  Pending: "bg-red-50 text-red-600 border-red-100",
};


const DashboardHome = () => {
  const [overview, setOverview] = useState(null)
  const [analytics, setAnalytics] = useState([])
  const [team, setTeam] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ovRes, analyticsRes, teamRes, productRes] = await Promise.all([
          axios.get('https://task-api-eight-flax.vercel.app/api/overview'),
          axios.get('https://task-api-eight-flax.vercel.app/api/analytics'),
          axios.get('https://task-api-eight-flax.vercel.app/api/users'),
          axios.get('https://task-api-eight-flax.vercel.app/api/products')
        ]);
        setOverview(ovRes.data);
        setAnalytics(analyticsRes.data);
        setTeam(teamRes.data);
        setProducts(productRes.data)
      } catch (err) {
        console.error("Data Fetching Error:", err)
      }
    };
    fetchData();
  }, []);

  if (!overview) return <div className="p-10 text-center text-[#1B5E3F] font-bold">Loading...</div>;


  const maxViews = analytics.length > 0 ? Math.max(...analytics.map(o => o.views)) : 100;

  return (
    <div className="space-y- rounded-2xl mt-2 bg-[#F3F4F6]  pb-10">
      {/* Header Section */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
        </div>
        <div className="flex gap-3">
      <button className="flex items-center btn cursor-pointer gap-2 bg-linear-to-r from-[#197148] to-[#317139] text-white px-7 py-3 rounded-full font-medium hover:opacity-90 transition-all shadow-sm">
        <FiPlus className="text-lg" /> 
        <span className="text-[15px]">Add Project</span>
      </button>
      <button className="border btn cursor-pointer border-[#008245] bg-white text-[#0a7535] px-7 py-3 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm text-[15px]">
        Import Data
      </button>
    </div>
      </div>

      {/* Top Stats Cards */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-4  gap-4">
        <div className=" rounded-2xl p-4 shadow-sm bg-gradient-to-br from-[#12432C] via-[#317139] to-[#207D52] flex flex-col justify-between h-[180px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="flex justify-between items-center gap-4 relative z-10">
            <span className="text-white cursor-pointer  font-medium">Total Projects</span>
            <div className="p-2 bg-white cursor-pointer rounded-full text-black">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-white text-5xl font-bold relative z-10">{overview.totalUsers}</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col  justify-between h-[180px]">
          <div className="flex justify-between  items-center gap-4">
            <span className="text-[1rem] font-medium">Ended Projects</span>
            <div className="p-2 bg-gray-50 cursor-pointer rounded-full border ">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-gray-800 text-4xl font-bold">{overview.activeUsers}</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-[180px]">
          <div className="flex justify-between gap-4  items-center">
            <span className=" font-medium">Running Projects</span>
            <div className="p-2 bg-gray-50 cursor-pointer rounded-full border ">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-gray-800 text-4xl font-bold">{overview.revenue}</span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-[180px]">
          <div className="flex justify-between items-center gap-4 ">
            <span className=" font-medium">Pending Projects</span>
            <div className="p-2 bg-gray-50 cursor-pointer rounded-full border ">
              <FiArrowUpRight className="text-xl" />
            </div>
          </div>
          <span className="text-gray-800 text-4xl font-bold">{overview.growth}</span>
        </div>
      </div>

      {/* Middle Section  */}
      <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-3">

        {/* 1. Project Analytics  */}
        <div className="bg-white col-span-2 rounded-2xl shadow-sm p-5 border border-gray-50 flex flex-col h-[320px]">
          <h2 className="text-lg font-bold mb-6 text-gray-900">Project Analytics</h2>

          <div className="flex items-end justify-between gap-3 h-full px-2">
            {analytics.map((item, index) => {
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
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-50 flex flex-col justify-between h-[320px]">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-8">Reminders</h3>
            <div className="space-y-2">

              <p className="text-[1rem] font-bold text-[#1B5E3F] leading-tight">
                Meeting with Arc  Company
              </p>
              <p className="text-[0.8rem] text-gray-700 font-medium leading-tight ">
                Time : 02.00 pm – 04.00 pm
              </p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#1B5E3F] to-[#2d7a53de] cursor-pointer text-white px-1 text-[0.8rem] py-2 rounded-full font-semibold shadow-lg shadow-green-900/20 hover:from-[#14472f] hover:to-[#1B5E3F] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">

            <Video size={18} strokeWidth={2.5} />
            Start Meeting
          </button>
        </div>


        {/* 3. Project Mini List */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-50 h-[320px] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Project</h3>
            <button className="border cursor-pointer border-[#008245] bg-white text-[#0a7535] px-2 py-1 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm text-[15px]">+ New</button>
 
          </div>
          <ul className="space-y-4 overflow-auto">
            {products.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-none">
                <div>
                  <p className="text-[14px] font-bold text-gray-800">{item.name}</p>
                  <p className="text-[11px] text-gray-400 capitalize">{item.category} • ${item.price}</p>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${item.category === 'subscription' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
              </li>
            ))}
          </ul>
        </div>



      </div>



      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 px-4 gap-4">
        {/* Team Collaboration */}
        <div className='col-span-3'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>


            <div className="bg-white h-[320px] overflow-auto rounded-2xl shadow-sm p-3 border border-gray-50">

              <div className="flex justify-between items-center mb-8">
                <h3 className=" font-bold text-gray-900">Team Collaboration</h3>


                <button className="flex items-center px-1 lg:px-2 lg:py-2  border border-[#1B5E3F] text-[#1B5E3F] 
                rounded-full hover:bg-green-50 transition-all text-[0.8rem] font-medium">
                  <Plus size={18} strokeWidth={2.5} />
                  Add Member
                </button>
              </div>


              <div className="space-y-6">
                {team.map((member, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">

                      <div className="relative">
                        <img src={member?.avatar || 'https://i.ibb.co.com/b5YmGpJh/Is.png'} className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover" alt={member.name} />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 leading-tight">  {member.name}  </span>
                        <p className="text-sm text-gray-400 font-medium">   Working on <span className="text-gray-900 font-semibold">{member.currentTask}</span>  </p>
                      </div>
                    </div>

                    <div className={`px-4 py-1.5 rounded-xl border text-xs font-bold ${statusStyles[member.status] || statusStyles["In Progress"]}`}>   {member.status || "In Progress"}  </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Progress */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between h-[320px] border border-gray-50">

              <h3 className="text-xl font-bold text-gray-900">Project Progress</h3>

              <div className="relative flex flex-col items-center justify-center pt-8">

                <svg width="240" height="130" viewBox="0 0 200 110">
                  <defs>

                    <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1B5E3F" />
                      <stop offset="100%" stopColor="#2D7A54" />
                    </linearGradient>
                  </defs>


                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="26"
                    strokeLinecap="butt"
                    strokeDasharray="4, 4"
                  />


                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#064e3b"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset="-130"
                  />


                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#1B5E3F"
                    strokeWidth="28"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    strokeDashoffset="128"
                  />
                </svg>


                <div className="absolute top-[55%] flex flex-col items-center">
                  <span className="text-[54px] font-extrabold text-gray-900 leading-none">41%</span>
                  <span className="text-xs text-gray-400 font-bold tracking-wider mt-1 uppercase">Project Ended</span>
                </div>
              </div>


              <div className="flex justify-between items-center mt-6 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1B5E3F]"></div>
                  <span className="text-[13px] font-semibold text-gray-500">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#064e3b]"></div>
                  <span className="text-[13px] font-semibold text-gray-500">In Progress</span>
                </div>
                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-gray-200 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,#94a3b8_1px,#94a3b8_2px)]"></div>
                  </div>
                  <span className="text-[13px] font-semibold text-gray-500">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Time Tracker */}
        <div className="rounded-3xl h-[320px] relative overflow-hidden shadow-lg group">

          <img
            src="/asideImg2.png"
            alt="Time Tracker Background"
            className="absolute inset-0 w-full h-full object-cover"
          />


          <div className="relative z-10 p-5 h-full flex flex-col items-center justify-between text-white">
            <h3 className="text-xl font-medium opacity-90 w-full text-left"> Time Tracker  </h3>
            <h2 className="text-[1.5rem] font-bold tracking-tight leading-none italic">  01:24:08  </h2>
            <div className="flex gap-5">
              <button className="w-14 h-14 cursor-pointer bg-white text-[#1B5E3F] rounded-full flex items-center justify-center hover:bg-gray-100 transition-all shadow-xl active:scale-90">
                <Pause size={24} fill="currentColor" />
              </button>
              <button className="w-14 h-14 bg-[#E23E3E] cursor-pointer text-white rounded-full flex items-center justify-center hover:bg-[#c93535] transition-all shadow-xl active:scale-90">
                <Square size={20} fill="currentColor" />
              </button>
            </div>
          </div>

        </div>


      </div>
    </div>
  );
};

export default DashboardHome;