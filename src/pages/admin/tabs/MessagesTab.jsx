import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessagesTab = () => {
  const messages = useQuery(api.messages.list);
  const markAsRead = useMutation(api.messages.updateMessageRead);
  const [expandedId, setExpandedId] = useState(null);

  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    await markAsRead({ id });
  };

  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {!messages ? (
        <div className="text-center p-12 text-slate-400 bg-white rounded-xl border border-slate-200">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center p-12 text-slate-400 bg-white rounded-xl border border-slate-200">No messages found.</div>
      ) : (
        messages.map(msg => {
          const isExpanded = expandedId === msg._id;
          const isUnread = msg.status !== 'read';
          
          return (
            <div key={msg._id} className={`bg-white rounded-xl border transition-all ${isUnread ? 'border-nie-orange shadow-sm' : 'border-slate-200'}`}>
              <div 
                onClick={() => setExpandedId(isExpanded ? null : msg._id)}
                className="p-6 cursor-pointer flex items-center gap-6"
              >
                <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-1">
                    <p className={`font-bold ${isUnread ? 'text-nie-navy' : 'text-slate-600'}`}>{msg.name}</p>
                    <p className="text-xs text-slate-500">{formatDate(msg.submitted_at)}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className={`text-sm ${isExpanded ? 'text-slate-500' : isUnread ? 'text-slate-800 font-medium' : 'text-slate-600'} truncate`}>
                      {isExpanded ? msg.email : (msg.message.length > 80 ? msg.message.substring(0, 80) + '...' : msg.message)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {isUnread && (
                    <button 
                      onClick={(e) => handleMarkRead(msg._id, e)}
                      className="text-xs bg-nie-orange/10 text-nie-orange hover:bg-nie-orange hover:text-white px-3 py-1.5 rounded-full font-bold transition-colors flex items-center gap-1"
                    >
                      <CheckCircle size={14} /> Mark Read
                    </button>
                  )}
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50 rounded-b-xl">
                      <div className="mb-4 pt-4 flex gap-8 text-sm text-slate-600">
                        <p><strong>Email:</strong> {msg.email}</p>
                        {msg.phone && <p><strong>Phone:</strong> {msg.phone}</p>}
                      </div>
                      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-inner">
                        <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessagesTab;
