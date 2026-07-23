import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownEditor({ value, onChange, error }) {
  const [activeTab, setActiveTab] = useState('write');

  return (
    <div className={`border rounded-md shadow-sm overflow-hidden ${error ? 'border-red-300' : 'border-gray-300'}`}>
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex space-x-4">
        <button
          type="button"
          className={`text-sm font-medium ${activeTab === 'write' ? 'text-nie-navy' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('write')}
        >
          Write
        </button>
        <button
          type="button"
          className={`text-sm font-medium ${activeTab === 'preview' ? 'text-nie-navy' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className="p-0">
        {activeTab === 'write' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={15}
            className="block w-full p-3 focus:outline-none focus:ring-0 sm:text-sm resize-y"
            placeholder="Write your markdown content here..."
          />
        ) : (
          <div className="p-4 prose prose-sm sm:prose lg:prose-lg mx-auto max-w-none min-h-[350px]">
            {value ? (
              <ReactMarkdown
                allowedElements={[
                  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                  'strong', 'em', 'del', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'
                ]}
              >
                {value}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">Nothing to preview</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
