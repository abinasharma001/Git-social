import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, User, Search, LogOut, Github, Download } from 'lucide-react';
import { CURRENT_USER } from '../services/mockData';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear tokens here
    navigate('/');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname.startsWith(to);
    return (
      <NavLink
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <Github size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">GitSocial</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem to="/dashboard" icon={User} label="My Profile" />
          <NavItem to="/search" icon={Search} label="Discover" />
          <NavItem to="/chat" icon={MessageSquare} label="Messages" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Browser Extension</h4>
            <p className="text-xs text-slate-600 mb-3">
              Get the "Message" button directly on GitHub.com.
            </p>
            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs py-2 rounded-lg transition-colors">
              <Download size={14} />
              Install
            </button>
          </div>

          <div className="flex items-center gap-3 px-2 mb-4">
            <img
              src={CURRENT_USER.avatarUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full border border-slate-200"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">{CURRENT_USER.username}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
           <div className="flex items-center gap-2">
              <div className="bg-slate-900 text-white p-1 rounded">
                <Github size={20} />
              </div>
              <span className="font-bold">GitSocial</span>
           </div>
           <button onClick={() => navigate('/chat')} className="p-2 text-slate-600">
             <MessageSquare size={24} />
           </button>
        </div>
        
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden h-16 bg-white border-t border-slate-200 flex justify-around items-center px-2 absolute bottom-0 w-full z-50">
          <NavLink to="/dashboard" className={({isActive}) => `p-2 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            <User size={24} />
          </NavLink>
          <NavLink to="/search" className={({isActive}) => `p-2 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            <Search size={24} />
          </NavLink>
          <NavLink to="/chat" className={({isActive}) => `p-2 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
            <MessageSquare size={24} />
          </NavLink>
      </div>
    </div>
  );
};

export default Layout;
