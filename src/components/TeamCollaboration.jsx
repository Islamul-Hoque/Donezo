import React from 'react';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import TeamMember from '../assets/teamMember.png'

const statusStyles = {
    active: "bg-green-50 text-green-600 border-green-100",
    inactive: "bg-red-50 text-red-600 border-red-100",
};

const TeamCollaboration = ({ team }) => {
    return (
        <div className="bg-white h-70 overflow-auto rounded-2xl shadow-sm p-3 border border-gray-50">
            <div className="flex justify-between items-center mb-5">
                <h3 className="heading text-gray-900">Team Collaboration</h3>
                <button className="flex items-center px-3 py-1.5 lg:px-2  border border-[#1B5E3F] text-[#1B5E3F] rounded-full hover:bg-green-50 transition-all text-[0.7rem] font-medium">  <Plus size={14} strokeWidth={2.5} /> Add Member  </button>
            </div>

            <div className="space-y-4">
                {team.map((member, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <img src={member?.image || TeamMember} className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover" alt={member.name} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900 leading-tight">{member.name}</span>
                                <p className="text-[0.7rem] text-gray-400 font-medium"> Join Date: <span className="text-gray-900 font-semibold">  {member.joinDate ? format(new Date(member.joinDate), 'dd MMM, yyyy') : 'N/A'} </span>   </p>
                            </div>
                        </div>

                        <div className={`px-3 py-1.5 rounded-xl border text-[0.5rem] uppercase tracking-wider font-bold 
                            ${member.status === 'active' ? statusStyles.active : statusStyles.inactive}`}>  {member.status || "N/A"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamCollaboration;