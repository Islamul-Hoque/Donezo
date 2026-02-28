import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

import ProjectProgress from '../../components/ProjectProgress';
import StatCards from '../../components/StatCards';
import ProjectAnalytics from '../../components/ProjectAnalytics';
import ProjectPlans from '../../components/ProjectPlans';
import TeamCollaboration from '../../components/TeamCollaboration';
import Reminders from '../../components/Reminders';
import TimeTracker from '../../components/TimeTracker';

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
        setOverview(ovRes.data)
        setAnalytics(analyticsRes.data)
        setTeam(teamRes.data);
        setProducts(productRes.data)
      } catch (err) {
        console.error("Data Fetching Error:", err)
      }
    };
    fetchData();
  }, []);

  

  return (
    <div className="space-y- rounded-2xl mt-2 bg-[#F3F4F6]  ">
      {/* Header */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
        </div>
        <div className="flex items-center justify-between gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center btn cursor-pointer gap-1 bg-linear-to-r from-[#197148] to-[#317139] text-white px-7 py-3 rounded-full font-medium hover:opacity-90 transition-all shadow-sm">   <FiPlus className="text-lg" /><span className="text-[15px]">Add Project</span> </button>
          <button className="flex-1 md:flex-none border btn cursor-pointer border-[#008245] bg-white text-[#0a7535] px-7 py-3 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm text-[15px]"> Import Data </button>
        </div>
      </div>

      {/* Top section */}
      <div className="rounded-2xl mt-2 bg-[#F3F4F6] "> <StatCards overview={overview} /></div>
      {/* Main Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-4 p-4 gap-4'>
        {/* Left side (3 Columns) */}
        <div className='lg:col-span-3 flex flex-col gap-4'>
          {/* Analytics (2/3) & Reminders (1/3) */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='md:col-span-2'>  <ProjectAnalytics analytics={analytics} /> </div>
            <div className='md:col-span-1'> <Reminders />  </div>
          </div>

          {/* Team (1/2) & Progress (1/2) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div><TeamCollaboration team={team} /></div>
            <div > <ProjectProgress /> </div>
          </div>
        </div>

        {/* Right side (1 Column) */}
        <div className='lg:col-span-1 flex flex-col gap-4'>
          <div><ProjectPlans products={products} /></div>
          <div><TimeTracker /></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;