import React from 'react';
import { format } from 'date-fns';

const ProjectAnalytics = ({ analytics }) => {

    const maxViews = Math.max(...analytics.map(o => o.views)) || 100;

    const barStyles = [
        { bg: 'bg-gray-100', extra: 'striped-bar border border-gray-200' },
        { bg: 'bg-[#2D7A54]', extra: '' },
        { bg: 'bg-[#5EC494]', extra: '' },
        { bg: 'bg-[#12432C]', extra: '' }
    ];

    return (
        <div className="bg-white  rounded-2xl shadow-sm p-5 border border-gray-50 flex flex-col h-70">
            <h2 className="heading mb-6 text-gray-900">Project Analytics</h2>

            <div className="flex items-end justify-between gap-x-4 h-full">
                {analytics.map((item, index) => {
                    const heightFactor = (item.views / maxViews) * 100;
                    const currentStyle = barStyles[index % 4];

                    return (
                        <div key={index} className="flex flex-col items-center flex-1 group h-full justify-end relative">
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#12432C] text-white px-3 py-1.5 rounded-lg z-20 pointer-events-none text-[10px] font-bold whitespace-nowrap shadow-xl">
                                {item.views} Views
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#12432C] rotate-45"></div>
                            </div>
                            <div className={`w-full rounded-full transition-all duration-500 cursor-pointer relative overflow-hidden ${currentStyle.bg} ${currentStyle.extra} group-hover:brightness-90 group-hover:scale-x-105`}  style={{ height: `${heightFactor}%`, minHeight: '15%' }} ></div>
                            <span className="text-[8px] text-gray-400 mt-3 font-bold whitespace-nowrap"> {item.date ? format(new Date(item.date), 'dd MMM yyyy') : 'N/A'} </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectAnalytics;