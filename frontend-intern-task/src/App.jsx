import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/routing/ProtectedRoute';

import { Login } from './pages/Login';
import { ProjectList } from './pages/ProjectList';
import { DprForm } from './pages/DprForm';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
    <a href="/" className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors">
      Go back home
    </a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ProjectList />} />
            <Route path="/dpr" element={<DprForm />} />
            <Route path="/dpr/:projectId" element={<DprForm />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
