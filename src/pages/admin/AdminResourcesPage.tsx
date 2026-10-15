import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Resource } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ResourceTable } from '../../components/admin/ResourceTable';
import { AddEditResourceModal } from '../../components/admin/AddEditResourceModal';
import { Search, Filter } from 'lucide-react';

export const AdminResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminResources();
      setResources(data);
    } catch (e) {
      console.error('Failed to load resources', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();

    const handleUpdate = () => fetchResources();
    window.addEventListener('recovery_connect_resources_updated', handleUpdate);
    return () => window.removeEventListener('recovery_connect_resources_updated', handleUpdate);
  }, []);

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingResource(null);
    setModalOpen(true);
  };

  const handleSave = async (data: any) => {
    if (editingResource) {
      await api.updateResource(editingResource.id, data);
    } else {
      await api.addResource(data);
    }
    fetchResources();
  };

  const handleVerify = async (id: string) => {
    await api.verifyResource(id, 'Verified by administrator.');
    fetchResources();
  };

  const handleArchive = async (id: string) => {
    if (window.confirm('Archive this resource from the directory?')) {
      const updated = resources.filter(r => r.id !== id);
      localStorage.setItem('recovery_connect_resources', JSON.stringify(updated));
      window.dispatchEvent(new Event('recovery_connect_resources_updated'));
      fetchResources();
    }
  };

  const filtered = resources.filter(r => {
    if (selectedStatus !== 'all' && r.verificationStatus !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Directory Management"
        subtitle="Manage resource entries, accreditation records, and verification status"
        onAddResource={handleAdd}
        onRefresh={fetchResources}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#EADBCE] text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6F6D76] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search resource, city, or source..."
            className="w-full bg-[#FFF9F3] border border-[#EADBCE] rounded-xl py-2 pl-9 pr-3 text-xs text-[#34343B] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[#6F6D76] font-medium">Status:</span>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-[#FFF9F3] border border-[#EADBCE] rounded-xl px-3 py-1.5 text-xs text-[#34343B] focus:outline-hidden"
          >
            <option value="all">All Statuses ({resources.length})</option>
            <option value="verified">Verified Only</option>
            <option value="needs_review">Needs Review Only</option>
            <option value="reported">Reported Only</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-xs text-[#6F6D76]">
          Loading directory records...
        </div>
      ) : (
        <ResourceTable
          resources={filtered}
          onEdit={handleEdit}
          onVerify={handleVerify}
          onArchive={handleArchive}
        />
      )}

      {/* Modal */}
      <AddEditResourceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingResource}
      />
    </div>
  );
};
