const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  {
    file: 'src/pages/admin/AdminStartups.jsx',
    replacements: [
      { find: 'className="h-10 w-10 rounded-full object-cover"', add: 'loading="lazy" width="40" height="40"' },
      { find: 'className="h-12 w-12 rounded-full object-cover"', add: 'loading="lazy" width="48" height="48"' }
    ]
  },
  {
    file: 'src/pages/admin/AdminLeadership.jsx',
    replacements: [
      { find: 'className="h-10 w-10 rounded-full object-cover"', add: 'loading="lazy" width="40" height="40"' },
      { find: 'className="h-12 w-12 rounded-full object-cover"', add: 'loading="lazy" width="48" height="48"' }
    ]
  },
  {
    file: 'src/pages/admin/AdminInfrastructure.jsx',
    replacements: [
      { find: 'className="h-12 w-20 rounded object-cover"', add: 'loading="lazy" width="80" height="48"' },
      { find: 'className="h-32 w-full object-cover rounded"', add: 'loading="lazy" width="300" height="128"' }
    ]
  },
  {
    file: 'src/pages/admin/AdminEvents.jsx',
    replacements: [
      { find: 'className="h-10 w-16 rounded object-cover"', add: 'loading="lazy" width="64" height="40"' },
      { find: 'className="h-32 w-full object-cover rounded"', add: 'loading="lazy" width="300" height="128"' }
    ]
  },
  {
    file: 'src/pages/admin/AdminBlogs.jsx',
    replacements: [
      { find: 'className="h-10 w-16 rounded object-cover"', add: 'loading="lazy" width="64" height="40"' },
      { find: 'className="h-32 w-full object-cover rounded"', add: 'loading="lazy" width="300" height="128"' }
    ]
  }
];

filesToUpdate.forEach(({ file, replacements }) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  replacements.forEach(({ find, add }) => {
    // Only replace if it's an img tag that doesn't already have loading="lazy"
    // To keep it simple, just replace the find string with itself + the new attributes
    if (!content.includes('loading="lazy"')) {
      content = content.replaceAll(find, find + ' ' + add);
    }
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});

// Also update system/ImageFallback
const sysImgFallback = path.join(__dirname, 'src/components/system/ImageFallback.jsx');
if (fs.existsSync(sysImgFallback)) {
  let c = fs.readFileSync(sysImgFallback, 'utf8');
  if (!c.includes('loading="lazy"')) {
    c = c.replace('alt={alt}', 'alt={alt} loading="lazy"');
    fs.writeFileSync(sysImgFallback, c, 'utf8');
    console.log('Updated system ImageFallback');
  }
}
