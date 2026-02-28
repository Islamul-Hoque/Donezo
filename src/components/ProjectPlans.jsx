import React from 'react';

const ProjectPlans = ({ products }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-50 h-70 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="heading text-gray-900">Project Plans</h3>
                <button className="border cursor-pointer border-[#008245] bg-white text-[#0a7535] px-2 py-1 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm text-[12px]"> +New </button>
            </div>

            <ul className="space-y-0.5 overflow-auto pr-1 custom-scrollbar">
                {products.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-none group">
                        <div className="flex flex-col">
                            <p className="text-[13px] font-medium text-gray-800 group-hover:text-[#1B5E3F] transition-colors">   {item.name} </p>
                            <p className="text-[10px] text-gray-400 font-medium">
                                <span className="capitalize">{item.category}</span> •
                                <span className="text-gray-600 font-semibold ml-1">${item.price}</span>
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-900 leading-none">{item.sales}</p>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Sales</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectPlans;