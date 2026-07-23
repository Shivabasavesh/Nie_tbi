import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStats } from '../../hooks/useDashboard';
import StatCard from '../../components/ui/StatCard';
import { Building2, CalendarDays, FileText, FileDown, ClipboardList, PlusCircle } from 'lucide-react';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of the NIETBI platform content.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <LoadingSpinner className="h-8 w-8 text-nie-orange" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Startups"
            value={stats?.startups}
            icon={<Building2 className="h-6 w-6 text-nie-orange" />}
          />
          <StatCard
            title="Total Events"
            value={stats?.events}
            icon={<CalendarDays className="h-6 w-6 text-blue-500" />}
          />
          <StatCard
            title="Total Blogs"
            value={stats?.blogs}
            icon={<FileText className="h-6 w-6 text-green-500" />}
          />
          <StatCard
            title="Total Documents"
            value={stats?.documents}
            icon={<FileDown className="h-6 w-6 text-purple-500" />}
          />
          <StatCard
            title="Pending Applications"
            value={stats?.pendingApplications}
            icon={<ClipboardList className="h-6 w-6 text-red-500" />}
          />
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/startups"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <PlusCircle className="h-5 w-5 text-nie-navy mr-3" />
            <span className="font-medium text-gray-900">Add Startup</span>
          </Link>
          <Link
            to="/admin/events"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <PlusCircle className="h-5 w-5 text-nie-navy mr-3" />
            <span className="font-medium text-gray-900">Add Event</span>
          </Link>
          <Link
            to="/admin/blogs"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <PlusCircle className="h-5 w-5 text-nie-navy mr-3" />
            <span className="font-medium text-gray-900">Publish Blog</span>
          </Link>
          <Link
            to="/admin/documents"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <PlusCircle className="h-5 w-5 text-nie-navy mr-3" />
            <span className="font-medium text-gray-900">Upload Document</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
