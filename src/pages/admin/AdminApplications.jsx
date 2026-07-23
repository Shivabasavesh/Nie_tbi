import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Eye, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useApplications, 
  useUpdateApplication 
} from '../../hooks/useApplications';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const AdminApplications = () => {
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const { data: applications, isLoading } = useApplications();
  const updateMutation = useUpdateApplication(closeDrawer);

  const openDrawer = (app) => {
    setSelectedApp(app);
    reset({
      status: app.status,
      admin_notes: app.admin_notes || '',
    });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedApp(null);
  };

  const onSubmit = (data) => {
    if (selectedApp) {
      updateMutation.mutate({
        id: selectedApp.id,
        status: data.status,
        admin_notes: data.admin_notes,
      });
    }
  };

  const columns = [
    {
      header: 'Startup',
      accessorKey: 'startup_name',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.startup_name}</div>
          <div className="text-gray-500 text-xs">by {row.founder_name}</div>
        </div>
      ),
    },
    {
      header: 'Sector',
      accessorKey: 'sector',
    },
    {
      header: 'Submitted',
      cell: (row) => new Date(row.submitted_at).toLocaleDateString(),
    },
    {
      header: 'Status',
      cell: (row) => {
        let colorClass = 'bg-gray-100 text-gray-800';
        if (row.status === 'Under Review') colorClass = 'bg-blue-100 text-blue-800';
        if (row.status === 'Accepted') colorClass = 'bg-green-100 text-green-800';
        if (row.status === 'Rejected') colorClass = 'bg-red-100 text-red-800';
        if (row.status === 'Pending') colorClass = 'bg-yellow-100 text-yellow-800';

        return (
          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${colorClass}`}>
            {row.status}
          </span>
        );
      },
    },
  ];

  const actions = (row) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => openDrawer(row)}
        className="text-nie-navy hover:text-nie-navy/80 p-1 flex items-center text-sm font-medium"
      >
        <Eye className="h-4 w-4 mr-1" /> View
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications Review</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage startup incubation applications.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={applications}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Application Details"
      >
        {selectedApp && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-3">
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Startup Name</h3>
                <p className="mt-1 text-sm text-gray-900 font-medium">{selectedApp.startup_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Founder</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedApp.founder_name}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedApp.startup_stage}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedApp.email}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedApp.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedApp.sector}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">City</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedApp.city}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Message/Pitch</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedApp.message}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pitch Deck</h3>
                <a 
                  href={selectedApp.pitch_deck_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center text-sm font-medium text-nie-orange hover:text-orange-600"
                >
                  View Document <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium text-gray-900">Review Actions</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Admin Notes (Internal)</label>
                <textarea
                  {...register('admin_notes')}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
                  placeholder="Private notes visible only to admins..."
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <Button variant="ghost" type="button" onClick={closeDrawer} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex items-center">
                  {isSubmitting && <LoadingSpinner className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        )}
      </SlideOverDrawer>
    </div>
  );
};

export default AdminApplications;
