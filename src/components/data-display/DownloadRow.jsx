import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '../ui/Button';

const DownloadRow = ({ title, description, category, fileUrl }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white border border-slate-100 rounded-lg hover:border-nie-orange/30 transition-colors group">
      <div className="flex items-start mb-4 sm:mb-0">
        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-nie-orange mr-4 group-hover:bg-orange-50 transition-colors">
          <FileText size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-nie-navy mb-1">{title}</h3>
          <p className="text-sm text-text-body line-clamp-1">{description}</p>
          <span className="inline-block mt-2 text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            {category}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-3 w-full sm:w-auto mt-4 sm:mt-0">
        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => window.open(fileUrl, '_blank')}>
          <Eye size={16} className="mr-2" /> Preview
        </Button>
        <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={() => window.open(fileUrl, '_blank')}>
          <Download size={16} className="mr-2" /> Download
        </Button>
      </div>
    </div>
  );
};

export default DownloadRow;
