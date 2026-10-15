import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AdminStats, Resource, ReportItem } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Sparkles, PieChart as PieIcon, BarChart2, TrendingUp, ShieldCheck } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [res, rep, st] = await Promise.all([
        api.getAdminResources(),
        api.getReports(),
        api.getAdminStats()
      ]);
      setResources(res);
      setReports(rep);
      setStats(st);
    };
    fetchData();
  }, []);

  // 1. Verification Status Data
  const verificationData = [
    { name: 'Verified', value: resources.filter(r => r.verificationStatus === 'verified').length, color: '#DCE8DC', textColor: '#2D5A27' },
    { name: 'Needs Review', value: resources.filter(r => r.verificationStatus === 'needs_review').length, color: '#F6E2D2', textColor: '#8C4A1E' },
    { name: 'Reported', value: resources.filter(r => r.verificationStatus === 'reported').length, color: '#F4DDE2', textColor: '#8E283E' }
  ];

  // 2. Category Distribution Data
  const categoryCountMap: Record<string, number> = {};
  resources.forEach(r => {
    const cat = r.category.replace('_', ' ');
    categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
  });
  const categoryData = Object.entries(categoryCountMap).map(([cat, count]) => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    count
  }));

  // 3. Resource Freshness / Audits Timeline Data (Demo)
  const freshnessData = [
    { month: 'Apr 2026', verified: 12, reported: 1 },
    { month: 'May 2026', verified: 16, reported: 2 },
    { month: 'Jun 2026', verified: 19, reported: 2 },
    { month: 'Jul 2026', verified: 21, reported: 4 },
    { month: 'Aug 2026', verified: 23, reported: 3 },
    { month: 'Sep 2026', verified: resources.filter(r => r.verificationStatus === 'verified').length, reported: reports.length }
  ];

  // 4. Report Types Data
  const reasonCountMap: Record<string, number> = {};
  reports.forEach(r => {
    reasonCountMap[r.reasonLabel] = (reasonCountMap[r.reasonLabel] || 0) + 1;
  });
  const reportReasonData = Object.entries(reasonCountMap).map(([reason, count]) => ({
    reason: reason.length > 20 ? reason.slice(0, 18) + '...' : reason,
    count
  }));

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Quality & Verification Analytics"
        subtitle="Real-time monitoring of resource freshness, community accuracy reports, and category coverage"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Verification Status (Donut) */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]/70">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#4D396E]" />
              <h3 className="font-serif text-base font-bold text-[#34343B]">
                Verification Status Breakdown
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#6F6D76] uppercase">DEMO DATA</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#34343B" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF9F3',
                    borderColor: '#EADBCE',
                    borderRadius: '1rem',
                    fontSize: '12px'
                  }}
                />
                <Legend
                  formatter={val => <span className="text-xs text-[#34343B] font-medium">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Distribution (Bar) */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]/70">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#25526C]" />
              <h3 className="font-serif text-base font-bold text-[#34343B]">
                Resources by Discipline Category
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#6F6D76] uppercase">DEMO DATA</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 10, fill: '#6F6D76' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 10, fill: '#6F6D76' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF9F3',
                    borderColor: '#EADBCE',
                    borderRadius: '1rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#DDECF4" stroke="#34343B" strokeWidth={1} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Verification Freshness Trends (Area) */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]/70">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#2D5A27]" />
              <h3 className="font-serif text-base font-bold text-[#34343B]">
                Verification Freshness Over Time
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#6F6D76] uppercase">DEMO DATA</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={freshnessData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6F6D76' }} />
                <YAxis tick={{ fontSize: 10, fill: '#6F6D76' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF9F3',
                    borderColor: '#EADBCE',
                    borderRadius: '1rem',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="verified" stroke="#2D5A27" fill="#DCE8DC" fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Community Accuracy Feedback Reasons */}
        <div className="bg-white border border-[#EADBCE] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EADBCE]/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8E283E]" />
              <h3 className="font-serif text-base font-bold text-[#34343B]">
                Community Reports by Issue Category
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#6F6D76] uppercase">DEMO DATA</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportReasonData} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#6F6D76' }} allowDecimals={false} />
                <YAxis type="category" dataKey="reason" tick={{ fontSize: 10, fill: '#34343B' }} width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF9F3',
                    borderColor: '#EADBCE',
                    borderRadius: '1rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#F4DDE2" stroke="#34343B" strokeWidth={1} radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
