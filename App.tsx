import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Search from './pages/Search';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected Routes Wrapper */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="dashboard" element={<Profile />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="search" element={<Search />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat/:userId" element={<Chat />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
