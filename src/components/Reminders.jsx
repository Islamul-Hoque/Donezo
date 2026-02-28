import React from 'react';
import { Video } from 'lucide-react';

const Reminders = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-50 flex flex-col justify-between h-70">
            <div>
                <h3 className="heading text-gray-900 mb-8">Reminders</h3>
                <div className="space-y-2">
                    <p className="text-[1.3rem] md:text-[1.2rem] font-bold text-[#1B5E3F] leading-tight">  Meeting with Arc  Company  </p>
                    <p className="text-[1rem] md:text-[0.9rem] text-gray-700 font-medium leading-tight ">   Time : 02.00 pm – 04.00 pm </p>
                </div>
            </div>
            <button className="w-full bg-linear-to-r from-[#1B5E3F] to-[#2d7a53de] cursor-pointer text-white px-1 text-[0.8rem] py-3 rounded-full font-semibold shadow-lg shadow-green-900/20 hover:from-[#14472f] hover:to-[#1B5E3F] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
                <Video size={18} strokeWidth={2.5} />  Start Meeting
            </button>
        </div>
    );
};

export default Reminders;