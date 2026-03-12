import React, { useState, useEffect } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { ProjectCard } from '../components/projects/ProjectCard';
import projectData from '../data/projects.json';

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // In a real app, this would be an API call
    setProjects(projectData);
  }, []);

  const filteredProjects = filterStatus === 'All' 
    ? projects 
    : projects.filter(p => p.status === filterStatus);

  const statuses = ['All', 'Active', 'Pending', 'Completed'];

  const getCount = (status) => {
    return status === 'All' 
      ? projects.length 
      : projects.filter(p => p.status === status).length;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5 pl-1">
              <ClipboardCheck className="w-[28px] h-[28px] text-[#007b83] stroke-[2]" />
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Projects</h1>
            </div>
            <p className="text-[16px] font-medium text-slate-500 mt-2 pl-1">Manage and track all construction projects</p>
          </div>
          
          <div className="inline-flex gap-1.5 bg-[#f8fafc] p-1.5 rounded-lg border border-slate-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)] ml-1">
            {statuses.map(status => {
              const count = getCount(status);
              const isActive = filterStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 text-[13px] font-bold rounded-md transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-white text-[#007b83] shadow-sm ring-1 ring-slate-200/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {status} <span className={`text-[11px] font-bold ${isActive ? 'text-[#007b83]/60' : 'text-slate-400'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm border-dashed mx-1">
            <h3 className="mt-2 text-[15px] font-bold text-slate-900">No projects found</h3>
            <p className="mt-1 text-[13px] font-medium text-slate-500">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 mx-1">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
