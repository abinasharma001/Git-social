import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Link as LinkIcon, Users, Star, GitFork, 
  MessageCircle, Twitter, Building, BookOpen
} from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CURRENT_USER, MOCK_USERS, MOCK_REPOS } from '../services/mockData';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Logic to find user: if userId is undefined, show current user. Else find in mock.
  const user = userId 
    ? MOCK_USERS.find(u => u.username === userId || u.id === userId) || CURRENT_USER
    : CURRENT_USER;

  const isCurrentUser = user.id === CURRENT_USER.id;
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock stats data for the chart
  const data = [
    { name: 'Mon', commits: 4 },
    { name: 'Tue', commits: 12 },
    { name: 'Wed', commits: 8 },
    { name: 'Thu', commits: 15 },
    { name: 'Fri', commits: 10 },
    { name: 'Sat', commits: 2 },
    { name: 'Sun', commits: 0 },
  ];

  const handleMessage = () => {
    navigate(`/chat/${user.id}`);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900"></div>
          <div className="px-6 md:px-8 pb-6 relative">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center -mt-12 mb-6">
              <div className="relative">
                <img 
                  src={user.avatarUrl} 
                  alt={user.username}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md bg-white" 
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                {!isCurrentUser && (
                  <>
                    <button 
                      onClick={handleMessage}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <MessageCircle size={18} />
                      Message
                    </button>
                    <button 
                      onClick={handleFollow}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors ${
                        isFollowing 
                          ? 'bg-slate-100 text-slate-900 border border-slate-200'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </>
                )}
                {isCurrentUser && (
                   <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                     Edit Profile
                   </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-slate-500 font-mono text-sm">@{user.username}</p>
              </div>
              
              <p className="text-slate-700 max-w-2xl leading-relaxed">
                {user.bio}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                {user.company && (
                  <div className="flex items-center gap-1.5">
                    <Building size={16} />
                    <span>{user.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
                {user.twitter && (
                  <div className="flex items-center gap-1.5">
                    <Twitter size={16} />
                    <a href={`#`} className="hover:text-blue-600 transition-colors">@{user.twitter}</a>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users size={16} />
                  <span className="font-semibold text-slate-900">{user.followers}</span> followers
                  <span className="mx-1">·</span>
                  <span className="font-semibold text-slate-900">{user.following}</span> following
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content: Repos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen size={20} className="text-slate-400" />
                  Repositories
                </h3>
                <span className="text-sm text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-full">{MOCK_REPOS.length}</span>
              </div>

              <div className="space-y-4">
                {MOCK_REPOS.map(repo => (
                  <div key={repo.id} className="group block p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-semibold text-blue-600 group-hover:underline">
                          {repo.name}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                          {repo.description}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full border border-slate-200 text-slate-500">
                        Public
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        {repo.language}
                      </div>
                      <div className="flex items-center gap-1 hover:text-blue-600">
                        <Star size={14} />
                        {repo.stars}
                      </div>
                      <div className="flex items-center gap-1 hover:text-blue-600">
                        <GitFork size={14} />
                        {repo.forks}
                      </div>
                      <span>Updated {repo.updatedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Activity Chart */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Weekly Activity</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 12, fill: '#64748b'}} 
                      dy={10}
                    />
                    <Tooltip 
                      cursor={{fill: '#f1f5f9'}}
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="commits" radius={[4, 4, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.commits > 10 ? '#2563eb' : '#93c5fd'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-center text-slate-400 mt-2">Commits in the last 7 days</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Top Languages</h3>
               <div className="space-y-3">
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">TypeScript</span>
                     <span className="text-slate-500">65%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Rust</span>
                     <span className="text-slate-500">25%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div className="bg-orange-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-1">
                     <span className="font-medium text-slate-700">Python</span>
                     <span className="text-slate-500">10%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
