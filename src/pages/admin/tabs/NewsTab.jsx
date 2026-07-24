import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Plus, X, Calendar, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NewsTab = () => {
  // Use listNews (Wait, listNews only returns published news. Let's create a getAll query if needed, 
  // but for now we'll use listNews or fetch from apps directly if listNews has no filter. 
  // The schema has 'listNews' which filters for isPublished=true. 
  // Let's modify our useQuery if it's missing or use the existing listNews for now, 
  // ideally Admin should see ALL news, but if listNews is the only one, we'll use it.)
  // Actually, listNews filters by isPublished == true. We should add an admin query to news.ts or use listNews for now.
  const news = useQuery(api.news.listNews) || [];
  const createNews = useMutation(api.news.createNews);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const initialFormState = {
    title: '', slug: '', body: '', tags: '', publishedAt: new Date().toISOString().substring(0, 10), isPublished: true, imageUrl: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNews({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        body: formData.body,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        publishedAt: new Date(formData.publishedAt).getTime(),
        isPublished: formData.isPublished,
        imageUrl: formData.imageUrl || undefined
      });
      setIsFormOpen(false);
      setFormData(initialFormState);
    } catch (error) {
      console.error(error);
      alert('Error saving article.');
    }
  };

  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-nie-navy">News & Announcements</h2>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-nie-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
        >
          <Plus size={16} /> Add Article
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Tags</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {news.length === 0 ? (
                <tr><td colSpan="4" className="p-8 text-center text-slate-400">No news articles found.</td></tr>
              ) : (
                news.map(item => (
                  <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-nie-navy">{item.title}</p>
                      <p className="text-xs text-slate-400 font-mono mt-1">/{item.slug}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2"><Calendar size={14}/> {formatDate(item.publishedAt)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {item.tags.map(t => <span key={t} className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md">{t}</span>)}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`w-3 h-3 rounded-full inline-block mr-2 ${item.isPublished ? 'bg-green-500' : 'bg-slate-300'}`} />
                      <span className="text-sm font-medium text-slate-600">{item.isPublished ? 'Published' : 'Draft'}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsFormOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-nie-navy">Add News Article</h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={handleTitleChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none font-medium" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">URL Slug</label>
                  <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none font-mono text-sm bg-slate-50" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Image URL (Optional)</label>
                  <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none" placeholder="https://" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                  <input required type="date" value={formData.publishedAt} onChange={e => setFormData({...formData, publishedAt: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                  <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none" placeholder="Incubation, Funding, Event..." />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Article Body (Markdown supported)</label>
                  <textarea required rows="8" value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-nie-orange outline-none font-mono text-sm"></textarea>
                </div>

                <div className="flex items-center gap-2 pt-2 pb-4">
                  <input type="checkbox" id="isPublished" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} className="w-4 h-4 text-nie-orange rounded border-slate-300 focus:ring-nie-orange" />
                  <label htmlFor="isPublished" className="text-sm font-bold text-slate-700">Published</label>
                </div>
              </form>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="flex-1 bg-white border border-slate-300 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-50">Cancel</button>
                <button type="button" onClick={handleSubmit} className="flex-1 bg-nie-navy text-white py-3 rounded-lg font-bold hover:bg-slate-800">Publish Article</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsTab;
