import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi'; 

const StatCards = ({ overview }) => {
    if (!overview) return null;

    const stats = [
        { label: "Total Projects", value: overview.totalUsers, isDark: true },
        { label: "Ended Projects", value: overview.activeUsers, isDark: false },
        { label: "Running Projects", value: overview.revenue, isDark: false },
        { label: "Pending Projects", value: overview.growth, isDark: false },
    ];

    return (
        <div className="px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className={`rounded-2xl p-4 shadow-sm border flex flex-col justify-between h-[180px] relative overflow-hidden ${
                    stat.isDark
                        ? "bg-linear-to-br from-[#12432C] via-[#317139] to-[#207D52] border-none"
                        : "bg-white border-gray-100"
                }`}>
                    {stat.isDark && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    )}
                    <div className="flex justify-between items-center gap-4 relative z-10">
                        <span className={`font-semibold text-[1.4rem] md:text-[1.1rem] ${stat.isDark ? "text-white" : "text-gray-800 "}`}>{stat.label}</span>
                        <div className={`p-2 cursor-pointer rounded-full transition-colors ${
                            stat.isDark
                                ? "bg-white text-black hover:bg-gray-100"
                                : "bg-gray-50 border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}>
                            <FiArrowUpRight className="text-xl" />
                        </div>
                    </div>
                    <span className={`text-3xl  md:text-4xl font-bold relative z-10 ${stat.isDark ? "text-white" : "text-gray-800"}`}> {Math.floor(stat.value || 0)}  </span>
                </div>
            ))}
        </div>
    );
};

export default StatCards;