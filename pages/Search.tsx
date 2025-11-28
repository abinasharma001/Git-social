import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Users } from 'lucide-react';
import { MOCK_USERS } from '../services/mockData';

const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredUsers = MOCK_USERS.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase()) || 
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.bio.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Discover Developers</h1>
          <p className="text-slate-500">Find contributors, potential hires, or friends.</p>
        </div>

        <div className="relative mb-8">
          <SearchIcon className="absolute left-4 top-3.5 text-slate-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username, name, or interests..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map(user => (
            <div 
              key={user.id}
              onClick={() => navigate(`/profile/${user.id}`)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <img src={user.avatarUrl} alt={user.username} className="w-16 h-16 rounded-full border border-slate-100 group-hover:scale-105 transition-transform" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</h3>
                        <p className="text-slate-500 text-sm font-mono">@{user.username}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">{user.bio}</p>
                  
                  <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {user.followers.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
             <div className="col-span-full text-center py-12 text-slate-400">
               <p>No developers found matching "{query}"</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
