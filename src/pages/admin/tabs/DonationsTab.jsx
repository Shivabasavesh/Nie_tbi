import React from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Users, IndianRupee } from 'lucide-react';

const DonationsTab = () => {
  const donations = useQuery(api.donations.listDonations) || [];
  const stats = useQuery(api.donations.getDonationStats) || { totalDonors: 0, totalAmount: 0 };
  const updateVerification = useMutation(api.donations.updateDonationVerified);

  const handleToggleVerified = async (id, currentStatus) => {
    await updateVerification({ id, isVerified: !currentStatus });
  };

  const formatDate = (ts) => {
    return new Date(ts).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-nie-orange/10 p-4 rounded-full text-nie-orange">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Verified Donors</p>
            <p className="text-3xl font-black text-nie-navy">{stats.totalDonors}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-full text-green-600">
            <IndianRupee size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Amount Raised</p>
            <p className="text-3xl font-black text-nie-navy">{formatCurrency(stats.totalAmount)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600">
                <th className="p-4">Donor Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Reference</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donations.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-400">No donations found.</td></tr>
              ) : (
                donations.map(donation => (
                  <tr key={donation._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-nie-navy">{donation.donorName}</td>
                    <td className="p-4 text-sm text-slate-600">
                      <div>{donation.email}</div>
                      {donation.phone && <div className="text-slate-400">{donation.phone}</div>}
                    </td>
                    <td className="p-4 font-bold text-nie-orange">{formatCurrency(donation.amount)}</td>
                    <td className="p-4 text-sm text-slate-500 font-mono">{donation.reference || '-'}</td>
                    <td className="p-4 text-sm text-slate-500">{formatDate(donation.donatedAt)}</td>
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        checked={donation.isVerified} 
                        onChange={() => handleToggleVerified(donation._id, donation.isVerified)}
                        className="w-5 h-5 text-nie-orange rounded border-slate-300 focus:ring-nie-orange cursor-pointer"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationsTab;
