import React, { useState } from 'react';
import ApplicationsTab from './tabs/ApplicationsTab';
import MessagesTab from './tabs/MessagesTab';
import StartupsTab from './tabs/StartupsTab';
import NewsTab from './tabs/NewsTab';
import DonationsTab from './tabs/DonationsTab';

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('applications');

  const messages = useQuery(api.messages.list) || [];
  const unreadCount = messages.filter(m => m.status !== 'read').length;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060E24] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl">
          <div className="flex justify-center mb-6">
            <h1 className="text-3xl font-black text-nie-navy tracking-tighter">
              NIE<span className="text-nie-orange">TBI</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-center text-nie-navy mb-8">Admin Access</h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-nie-orange focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-nie-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'applications', label: 'Applications', component: <ApplicationsTab /> },
    { id: 'messages', label: 'Messages', component: <MessagesTab /> },
    { id: 'startups', label: 'Startups', component: <StartupsTab /> },
    { id: 'news', label: 'News', component: <NewsTab /> },
    { id: 'donations', label: 'Donations', component: <DonationsTab /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4 border-b border-slate-100">
            <h1 className="text-2xl font-black text-nie-navy tracking-tighter">
              NIE<span className="text-nie-orange">TBI</span> <span className="text-slate-400 font-medium text-lg ml-2">Dashboard</span>
            </h1>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-slate-500 hover:text-nie-navy font-medium"
            >
              Logout
            </button>
          </div>
          
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'border-nie-orange text-nie-navy' 
                    : 'border-transparent text-slate-500 hover:text-nie-navy'
                }`}
              >
                {tab.label}
                {tab.id === 'messages' && unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {tabs.find(t => t.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default Admin;
