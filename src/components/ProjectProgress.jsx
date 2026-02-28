import React from 'react';
const indicators = [
    { label: 'Completed', color: 'bg-[#1B5E3F]', type: 'solid' },
    { label: 'In Progress', color: 'bg-[#064E3B]', type: 'solid' },
    { label: 'Pending', color: 'bg-transparent', type: 'striped' }
];

const ProjectProgress = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col justify-between h-70 border border-gray-50">
            <h3 className="heading text-gray-900">Project Progress</h3>
            <div className="relative flex flex-col items-center justify-center mt-4">
                <svg width="220" height="120" viewBox="0 0 200 110">
                    <defs> <pattern id="dense-striped-pattern" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)"> <line x1="0" y1="0" x2="0" y2="5" stroke="#cbd5e1" strokeWidth="2.5" /> </pattern> </defs>
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#dense-striped-pattern)" strokeWidth="28" strokeLinecap="round" />
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#064E3B" strokeWidth="28" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="75" />
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1B5E3F" strokeWidth="28" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="150" />
                </svg>
                <div className="absolute top-[50%] flex flex-col items-center">
                    <span className="text-[52px] font-bold text-gray-900 leading-none">41%</span>
                    <span className="text-[12px] text-gray-400 font-semibold mt-1">Project Ended</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                {indicators.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                        {item.type === 'striped' ? (
                            <div className="w-3 h-3 rounded-full border border-gray-300 overflow-hidden relative">
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_1px,#94a3b8_1px,#94a3b8_2px)]"></div>
                            </div>
                        ) : (<div className={`w-3 h-3 rounded-full ${item.color}`}></div>)} <span className="text-[12px] md:text-sm font-medium text-gray-600"> {item.label}  </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectProgress;