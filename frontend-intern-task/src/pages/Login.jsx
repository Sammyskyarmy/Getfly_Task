import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateLogin } from '../utils/validation';
import { FormInput } from '../components/common/FormInput';
import { Button } from '../components/common/Button';
import { HardHat } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await login(email, password);
        navigate('/');
      } catch (err) {
        setLoginError(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Left side, dark panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0e4856] relative overflow-hidden items-center text-white p-16">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
        <div className="relative z-10 max-w-lg pb-10">
          <HardHat className="h-12 w-12 mb-6 text-white stroke-[1.5]" />
          <h1 className="text-5xl font-bold tracking-tight mb-4">FieldPro</h1>
          <h2 className="text-xl text-teal-100 font-medium mb-6">Construction Management Made Simple</h2>
          <p className="text-[15px] text-teal-200/80 leading-relaxed md:text-base">
            Track projects, manage reports, and streamline field operations.
          </p>
        </div>
      </div>

      {/* Right side, login panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <HardHat className="h-8 w-8 text-[#007b83]" />
            <span className="text-2xl font-bold text-slate-800">FieldPro</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-[15px] text-slate-500 mb-8">Sign in to access your construction projects</p>
          
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <FormInput
                id="email"
                type="email"
                label="Email Address"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors.email}
                autoComplete="email"
              />
              
              <FormInput
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={errors.password}
                autoComplete="current-password"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                {loginError}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              disabled={isSubmitting}
              className="mt-6"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-8 p-5 bg-[#f8fafc] border border-slate-100 rounded-lg">
            <p className="text-sm font-semibold text-slate-700 mb-1.5">Demo Credentials:</p>
            <p className="text-[13px] text-slate-500">Email: test@test.com</p>
            <p className="text-[13px] text-slate-500">Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};
