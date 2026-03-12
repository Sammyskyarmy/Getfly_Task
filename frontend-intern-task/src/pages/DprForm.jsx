import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Calendar, Sun, Users } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { FormInput } from '../components/common/FormInput';
import { FormTextarea } from '../components/common/FormTextarea';
import { Button } from '../components/common/Button';
import { ImageUploader } from '../components/forms/ImageUploader';
import { Toast } from '../components/ui/Toast';
import { validateDPR } from '../utils/validation';
import projectData from '../data/projects.json';

export const DprForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    projectId: projectId || '',
    date: new Date().toISOString().split('T')[0],
    weather: '',
    description: '',
    workerCount: ''
  });
  const [images, setImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if the URL parameter project exists, otherwise clear or just leave as is
    if (projectId && projectData.some(p => p.id === projectId)) {
      setFormData(prev => ({ ...prev, projectId }));
      setProject(projectData.find(p => p.id === projectId));
    }
  }, [projectId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (id === 'projectId') {
         setProject(projectData.find(p => p.id === value));
    }
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleImageChange = (newImages) => {
    setImages(newImages);
    if (formErrors.images) {
      setFormErrors(prev => ({ ...prev, images: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateDPR(formData, images);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      // Store the form details in local storage array
      const currentSubmissions = JSON.parse(localStorage.getItem('dpr_submissions') || '[]');
      const newSubmission = {
        id: Date.now(),
        ...formData,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('dpr_submissions', JSON.stringify([...currentSubmissions, newSubmission]));

      setTimeout(() => {
        setIsSubmitting(false);
        setShowToast(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow max-w-[680px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-[13px] font-bold text-[#007b83] hover:text-[#006A72] transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          <h1 className="text-[30px] font-bold text-slate-800 tracking-tight mb-2">Daily Progress Report</h1>
          {project ? (
            <div className="text-slate-500">
              <p className="text-[17px] font-medium text-slate-700">{project.projectName}</p>
              <p className="text-[14px]">{project.location}</p>
            </div>
          ) : (
             <p className="text-[15px] text-slate-500">Fill out the details below to submit a new report.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[12px] border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-6 sm:p-10 space-y-8" noValidate>
          {/* We only show the project dropdown if they hit /dpr directly without projectId */}
          {!projectId && (
             <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="projectId" className="text-[13px] font-semibold text-slate-700">Select Project</label>
              <select
                id="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                className={`px-3.5 py-2.5 border rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-1 sm:text-sm transition-colors bg-white ${
                  formErrors.projectId ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-slate-200 focus:ring-[#007b83] focus:border-[#007b83]"
                }`}
              >
                <option value="" disabled>Choose a project...</option>
                {projectData.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.projectName} ({p.id})
                  </option>
                ))}
              </select>
              {formErrors.projectId && <p className="text-xs font-medium text-red-600 mt-0.5">{formErrors.projectId}</p>}
            </div>
          )}

          <div className="space-y-6">
            <FormInput
              id="date"
              type="date"
              label="Report Date"
              icon={Calendar}
              value={formData.date}
              onChange={handleInputChange}
              errorMessage={formErrors.date}
            />

            <div className="flex flex-col gap-1.5 w-full">
              <label htmlFor="weather" className="text-[13px] font-semibold text-slate-700">Weather Conditions</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Sun className="h-4 w-4 text-slate-400" />
                </div>
                <select
                  id="weather"
                  value={formData.weather}
                  onChange={handleInputChange}
                  className={`w-full pl-10 px-3.5 py-2.5 border rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-1 sm:text-sm transition-colors text-slate-800 ${
                    formErrors.weather ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-slate-200 focus:ring-[#007b83] focus:border-[#007b83]"
                  } ${formData.weather === '' ? "text-slate-400" : ""}`}
                >
                  <option value="" disabled className="text-slate-400">Select weather condition</option>
                  <option value="Sunny" className="text-slate-800">Sunny</option>
                  <option value="Cloudy" className="text-slate-800">Cloudy</option>
                  <option value="Rainy" className="text-slate-800">Rainy</option>
                  <option value="Stormy" className="text-slate-800">Stormy</option>
                  <option value="Snowy" className="text-slate-800">Snowy</option>
                </select>
              </div>
              {formErrors.weather && <p className="text-xs font-medium text-red-600 mt-0.5">{formErrors.weather}</p>}
            </div>

            <FormTextarea
              id="description"
              label="Work Description"
              placeholder="Describe the work completed today in detail... (minimum 20 characters)"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              errorMessage={formErrors.description}
            />

            <FormInput
              id="workerCount"
              type="number"
              label="Number of Workers"
              icon={Users}
              placeholder="e.g., 25"
              min="1"
              value={formData.workerCount}
              onChange={handleInputChange}
              errorMessage={formErrors.workerCount}
            />
          </div>

          <div className="pt-2">
            <ImageUploader 
              onChange={handleImageChange} 
              maxImages={3} 
              errorMessage={formErrors.images} 
            />
          </div>

          <div className="pt-6 sm:pt-8 flex gap-4">
               <Button 
                type="button" 
                variant="secondary" 
                fullWidth
                onClick={() => navigate('/')}
                className="w-1/2 py-3 rounded-[8px] font-bold"
               >
                 Cancel
               </Button>
               <Button 
                 type="submit" 
                 disabled={isSubmitting}
                 fullWidth
                 className="w-1/2 py-3 rounded-[8px] font-bold"
               >
                 {isSubmitting ? 'Submitting...' : <><CheckCircle2 className="w-[18px] h-[18px] mr-2" /> Submit Report</>}
               </Button>
          </div>
        </form>
      </main>

      {showToast && (
        <Toast 
          message="Daily Progress Report submitted successfully!" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};
