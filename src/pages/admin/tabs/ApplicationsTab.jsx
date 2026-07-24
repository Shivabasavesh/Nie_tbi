import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  shortlisted: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  onboarded: 'bg-green-100 text-green-800',
};

const ApplicationsTab = () => {
  const applications = useQuery(api.applications.list);
  const updateStatus = useMutation(api.applications.updateApplicationStatus);
  const [selectedApp, setSelectedApp] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    await updateStatus({ id, status: newStatus });
    if (selectedApp && selectedApp._id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
              <th className="p-4">Founder Name</th>
              <th className="p-4">Startup</th>
              <th className="p-4">Sector</th>
              <th className="p-4">Stage</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {!applications ? (
              <tr><td colSpan="6" className="p-8 text-center text-slate-400">Loading...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-slate-400">No applications found.</td></tr>
            ) : (
              applications.map(app => (
                <tr 
                  key={app._id} 
                  onClick={() => setSelectedApp(app)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-medium text-nie-navy">{app.founder_name}</td>
                  <td className="p-4">{app.startup_name}</td>
                  <td className="p-4 text-sm text-slate-500">{app.sector}</td>
                  <td className="p-4 text-sm text-slate-500 capitalize">{app.startup_stage}</td>
                  <td className="p-4 text-sm text-slate-500">{formatDate(app.submitted_at)}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColors[app.status] || 'bg-slate-100 text-slate-600'}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40" 
              onClick={() => setSelectedApp(null)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-nie-navy">Application Details</h3>
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Startup Info</h4>
                  <p className="text-2xl font-bold text-nie-navy">{selectedApp.startup_name}</p>
                  <p className="text-slate-600">{selectedApp.sector} &bull; <span className="capitalize">{selectedApp.startup_stage}</span></p>
                  <p className="text-slate-500 text-sm mt-1">{selectedApp.city}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Founder Info</h4>
                  <p className="font-medium text-nie-navy text-lg">{selectedApp.founder_name}</p>
                  <p className="text-slate-600">{selectedApp.email}</p>
                  <p className="text-slate-600">{selectedApp.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Message / Pitch</h4>
                  <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm">
                    {selectedApp.message || "No message provided."}
                  </p>
                </div>
                
                {selectedApp.pitch_deck_url && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Pitch Deck</h4>
                    <a href={selectedApp.pitch_deck_url} target="_blank" rel="noreferrer" className="text-nie-orange font-medium hover:underline break-all">
                      {selectedApp.pitch_deck_url}
                    </a>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Current Status</h4>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${statusColors[selectedApp.status] || 'bg-slate-100 text-slate-600'}`}>
                    {selectedApp.status}
                  </span>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Update Status</h4>
                <div className="flex gap-3">
                  <button onClick={() => handleStatusChange(selectedApp._id, 'shortlisted')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">Shortlist</button>
                  <button onClick={() => handleStatusChange(selectedApp._id, 'rejected')} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors text-sm">Reject</button>
                </div>
                <button onClick={() => handleStatusChange(selectedApp._id, 'onboarded')} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">Mark Onboarded</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplicationsTab;
