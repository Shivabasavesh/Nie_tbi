import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StartupsTab = () => {
  const startups = useQuery(api.startups.getAll) || [];
  const createStartup = useMutation(api.startups.createStartup);
  const deleteStartup = useMutation(api.startups.deleteStartup);
  const updateStartup = useMutation(api.startups.update);

  const [activeSubTab, setActiveSubTab] = useState('incubated');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    name: '', sector: 'Software', stage: 'incubated', description: '', website: '', foundedYear: new Date().getFullYear(), isPublished: true
  };
  const [formData, setFormData] = useState(initialFormState);

  const filteredStartups = startups.filter(s => 
    activeSubTab === 'incubated' ? !s.is_graduated && s.stage !== 'graduated' : (s.is_graduated || s.stage === 'graduated')
  );

  const handleAddClick = () => {
    setFormData({ ...initialFormState, stage: activeSubTab });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (startup) => {
    setFormData({
      name: startup.name,
      sector: startup.sector,
      stage: startup.stage || (startup.is_graduated ? 'graduated' : 'incubated'),
      description: startup.description,
      website: startup.website || startup.website_link || '',
      foundedYear: startup.foundedYear || new Date().getFullYear(),
      isPublished: startup.isPublished ?? true,
    });
    setEditingId(startup._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this startup?')) {
      await deleteStartup({ id });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStartup({
          id: editingId,
          name: formData.name,
          sector: formData.sector,
          stage: formData.stage,
          description: formData.description,
          website: formData.website,
          foundedYear: Number(formData.foundedYear),
          isPublished: formData.isPublished,
          is_graduated: formData.stage === 'graduated'
        });
      } else {
        await createStartup({
          ...formData,
          foundedYear: Number(formData.foundedYear)
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
      alert('Error saving startup.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-slate-200 p-1 rounded-lg">
          <button 
            onClick={() => setActiveSubTab('incubated')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeSubTab === 'incubated' ? 'bg-white shadow-sm text-nie-navy' : 'text-slate-500 hover:text-nie-navy'}`}
          >
            Incubated
          </button>
          <button 
            onClick={() => setActiveSubTab('graduated')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeSubTab === 'graduated' ? 'bg-white shadow-sm text-nie-navy' : 'text-slate-500 hover:text-nie-navy'}`}
          >
            Graduated (Alumni)
          </button>
        </div>
        
        <button 
          onClick={handleAddClick}
          className="bg-nie-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
        >
          <Plus size={16} /> Add Startup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200">
            No {activeSubTab} startups found.
          </div>
        ) : (
          filteredStartups.map(s => (
            <div key={s._id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-nie-navy line-clamp-1">{s.name}</h3>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{s.sector}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${s.isPublished !== false ? 'bg-green-500' : 'bg-slate-300'}`} title={s.isPublished !== false ? 'Published' : 'Hidden'} />
              </div>
              <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-grow">{s.description}</p>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-50">
                <button onClick={() => handleEditClick(s)} className="p-2 text-slate-400 hover:text-nie-navy hover:bg-slate-100 rounded-md transition-colors"><Edit size={16} /></button>
                <button onClick={() => handleDelete(s._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsFormOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-nie-navy">{editingId ? 'Edit' : 'Add'} Startup</h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Sector</label>
                    <select value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none">
                      <option>Software</option>
                      <option>Hardware</option>
                      <option>EdTech</option>
                      <option>HealthTech</option>
                      <option>FinTech</option>
                      <option>IoT</option>
                      <option>Agritech</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Stage</label>
                    <select value={formData.stage} onChange={e => setFormData({...formData, stage: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none">
                      <option value="incubated">Incubated</option>
                      <option value="graduated">Graduated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Founded Year</label>
                    <input type="number" value={formData.foundedYear} onChange={e => setFormData({...formData, foundedYear: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Website</label>
                    <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none" placeholder="https://" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                  <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none"></textarea>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="isPublished" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} className="w-4 h-4 text-nie-orange rounded border-slate-300 focus:ring-nie-orange" />
                  <label htmlFor="isPublished" className="text-sm font-bold text-slate-700">Published (Visible on public site)</label>
                </div>
              </form>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 rounded-lg font-bold hover:bg-slate-50">Cancel</button>
                <button type="button" onClick={handleSubmit} className="flex-1 bg-nie-navy text-white py-2 rounded-lg font-bold hover:bg-slate-800">Save Startup</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StartupsTab;
