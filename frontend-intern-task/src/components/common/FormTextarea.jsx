import React from 'react';
import { cn } from './Button';

export const FormTextarea = ({
  label,
  id,
  errorMessage,
  className,
  rows = 4,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label htmlFor={id} className="text-[13px] font-semibold text-slate-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={cn(
          "px-3.5 py-2.5 border rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-1 sm:text-sm resize-y transition-colors",
          errorMessage 
            ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
            : "border-slate-200 focus:ring-[#007b83] focus:border-[#007b83]",
          "text-slate-800 placeholder:text-slate-400"
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-xs font-medium text-red-600 mt-0.5">{errorMessage}</p>
      )}
    </div>
  );
};
