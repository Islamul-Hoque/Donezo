import React from 'react';
import { Pause, Square } from 'lucide-react';
import TimeTrackerBg from '../assets/TimeTracker.png'
const TimeTracker = () => {
    return (
        <div className="rounded-3xl w-full h-70 relative overflow-hidden shadow-lg group">
            <img src={TimeTrackerBg} className="absolute inset-0 w-full h-full object-cover" alt="Time Tracker" />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 p-5 h-full flex flex-col items-center justify-between text-white">
                <h3 className="heading w-full text-left">Time Tracker</h3>
                <h2 className="text-[2.2rem] font-bold italic">01:24:08</h2>
                <div className="flex gap-5">
                    <button className="w-14 h-14 bg-white text-[#1B5E3F] rounded-full flex items-center justify-center"><Pause size={24} fill="currentColor" /></button>
                    <button className="w-14 h-14 bg-[#E23E3E] text-white rounded-full flex items-center justify-center"><Square size={20} fill="currentColor" /></button>
                </div>
            </div>
        </div>
    );
};

export default TimeTracker;