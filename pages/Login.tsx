import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, MessageSquare, Globe, Code } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate OAuth delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <div className="bg-slate-900 p-3 rounded-2xl shadow-xl transform -rotate-6">
              <Github className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <div>
            <h2 className="mt-6 text-4xl font-extrabold text-slate-900 tracking-tight">
              Social layer for GitHub
            </h2>
            <p className="mt-2 text-lg text-slate-600">
              Connect, follow, and chat with developers directly linked to your GitHub identity.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-lg transition-all transform hover:scale-[1.02]"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </button>
            <p className="text-xs text-slate-500">
              By signing in, you agree to our Terms of Service.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-semibold text-slate-900">Real-time Chat</h3>
            <p className="text-sm text-slate-500 mt-2">Direct message any developer using their GitHub username.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe size={24} />
            </div>
            <h3 className="font-semibold text-slate-900">Browser Extension</h3>
            <p className="text-sm text-slate-500 mt-2">Inject "Message" buttons directly onto GitHub profile pages.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code size={24} />
            </div>
            <h3 className="font-semibold text-slate-900">Code Centric</h3>
            <p className="text-sm text-slate-500 mt-2">View repositories, stars, and contribution stats in one place.</p>
          </div>
        </div>
      </div>
      
      <div className="py-6 text-center text-slate-400 text-sm">
        © 2024 GitSocial. Open Source Proof of Concept.
      </div>
    </div>
  );
};

export default Login;
