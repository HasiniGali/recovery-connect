import { Resource, ReportItem, FilterState, AdminStats, VerificationStatus } from '../types';
import { INITIAL_RESOURCES } from '../data/mockResources';
import { INITIAL_REPORTS } from '../data/mockReports';

const STORAGE_KEYS = {
  RESOURCES: 'recovery_connect_resources',
  REPORTS: 'recovery_connect_reports',
  SAVED: 'recovery_connect_saved_ids'
};

// Helper to get from storage with fallback
function getStoredResources(): Resource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
      return INITIAL_RESOURCES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_RESOURCES;
  }
}

function setStoredResources(resources: Resource[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
    // Dispatch custom event for cross-component reactive synchronization
    window.dispatchEvent(new Event('recovery_connect_resources_updated'));
  } catch (e) {
    console.error('Failed to save resources to localStorage', e);
  }
}

function getStoredReports(): ReportItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REPORTS;
  }
}

function setStoredReports(reports: ReportItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    window.dispatchEvent(new Event('recovery_connect_reports_updated'));
  } catch (e) {
    console.error('Failed to save reports to localStorage', e);
  }
}

function getStoredSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function setStoredSavedIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(ids));
    window.dispatchEvent(new Event('recovery_connect_saved_updated'));
  } catch (e) {
    console.error('Failed to save bookmark ids', e);
  }
}

/**
 * Service API Abstraction Layer
 * Structured for seamless replacement with Spring Boot REST endpoints.
 */
export const api = {
  /**
   * Fetch all resources with optional multi-facet filtering
   */
  async getResources(filters?: Partial<FilterState>): Promise<Resource[]> {
    let list = getStoredResources();

    if (!filters) return list;

    if (filters.category && filters.category !== 'all') {
      list = list.filter(r => r.category === filters.category);
    }

    if (filters.cost && filters.cost !== 'all') {
      list = list.filter(r => r.cost === filters.cost);
    }

    if (filters.language && filters.language !== 'all') {
      list = list.filter(r => r.languages.includes(filters.language as any));
    }

    if (filters.availability && filters.availability !== 'all') {
      list = list.filter(r => r.availability === filters.availability);
    }

    if (filters.verifiedOnly) {
      list = list.filter(r => r.verificationStatus === 'verified');
    }

    if (filters.maxDistance && filters.maxDistance > 0) {
      list = list.filter(r => r.distanceKm <= filters.maxDistance!);
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  },

  /**
   * Get single resource by ID
   */
  async getResourceById(id: string): Promise<Resource | null> {
    const list = getStoredResources();
    return list.find(r => r.id === id) || null;
  },

  /**
   * Search resources by query
   */
  async searchResources(query: string): Promise<Resource[]> {
    return this.getResources({ search: query });
  },

  /**
   * Get resources near given coordinates
   */
  async getNearbyResources(lat: number = 12.9165, lng: number = 79.1325, radiusKm: number = 10): Promise<Resource[]> {
    const list = getStoredResources();
    // In our prototype, distanceKm is pre-calculated relative to Vellore center
    return list.filter(r => r.distanceKm <= radiusKm);
  },

  /**
   * Bookmark management
   */
  async getSavedResourceIds(): Promise<string[]> {
    return getStoredSavedIds();
  },

  async isResourceSaved(id: string): Promise<boolean> {
    const ids = getStoredSavedIds();
    return ids.includes(id);
  },

  async saveResource(id: string): Promise<boolean> {
    const ids = getStoredSavedIds();
    if (!ids.includes(id)) {
      setStoredSavedIds([...ids, id]);
    }
    return true;
  },

  async removeSavedResource(id: string): Promise<boolean> {
    const ids = getStoredSavedIds();
    setStoredSavedIds(ids.filter(savedId => savedId !== id));
    return true;
  },

  async getSavedResources(): Promise<Resource[]> {
    const ids = getStoredSavedIds();
    const all = getStoredResources();
    return all.filter(r => ids.includes(r.id));
  },

  /**
   * Community Report Submission
   */
  async reportResource(report: {
    resourceId: string;
    resourceName: string;
    reason: ReportItem['reason'];
    reasonLabel: string;
    description: string;
  }): Promise<ReportItem> {
    const reports = getStoredReports();
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      resourceId: report.resourceId,
      resourceName: report.resourceName,
      reason: report.reason,
      reasonLabel: report.reasonLabel,
      description: report.description,
      submittedAt: 'Just now',
      status: 'pending'
    };

    setStoredReports([newReport, ...reports]);

    // Also update resource status to 'reported' and log audit entry
    const resources = getStoredResources();
    const updated = resources.map(r => {
      if (r.id === report.resourceId) {
        return {
          ...r,
          verificationStatus: 'reported' as VerificationStatus,
          verificationNotes: `Reported by user: ${report.reasonLabel}. Flagged for review.`,
          auditHistory: [
            {
              id: `aud-${Date.now()}`,
              date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              actor: 'Community Report' as const,
              action: 'Report Submitted',
              note: `${report.reasonLabel}: ${report.description.slice(0, 80)}...`
            },
            ...r.auditHistory
          ]
        };
      }
      return r;
    });
    setStoredResources(updated);

    return newReport;
  },

  /**
   * Admin: Get all resources
   */
  async getAdminResources(): Promise<Resource[]> {
    return getStoredResources();
  },

  /**
   * Admin: Add new resource
   */
  async addResource(resource: Omit<Resource, 'id'>): Promise<Resource> {
    const resources = getStoredResources();
    const newId = `res-${Date.now()}`;
    const newResource: Resource = {
      ...resource,
      id: newId,
      auditHistory: [
        {
          id: `aud-${Date.now()}`,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          actor: 'Admin',
          action: 'Created',
          note: 'Resource created via administrative dashboard.'
        }
      ]
    };

    setStoredResources([newResource, ...resources]);
    return newResource;
  },

  /**
   * Admin: Update resource
   */
  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource> {
    const resources = getStoredResources();
    let updatedResource: Resource | null = null;

    const newList = resources.map(r => {
      if (r.id === id) {
        updatedResource = {
          ...r,
          ...updates,
          lastUpdated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        return updatedResource;
      }
      return r;
    });

    if (!updatedResource) throw new Error(`Resource ${id} not found`);
    setStoredResources(newList);
    return updatedResource;
  },

  /**
   * Admin: Verify resource
   */
  async verifyResource(id: string, notes: string = 'Official source verified by administrator.'): Promise<Resource> {
    return this.updateVerificationStatus(id, 'verified', notes);
  },

  /**
   * Admin: Update verification status
   */
  async updateVerificationStatus(id: string, status: VerificationStatus, note: string): Promise<Resource> {
    const resources = getStoredResources();
    let updatedResource: Resource | null = null;

    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newList = resources.map(r => {
      if (r.id === id) {
        updatedResource = {
          ...r,
          verificationStatus: status,
          verificationDate: status === 'verified' ? today : r.verificationDate,
          lastUpdated: today,
          verificationNotes: note,
          auditHistory: [
            {
              id: `aud-${Date.now()}`,
              date: today,
              actor: 'Admin',
              action: status === 'verified' ? 'Verified' : status === 'needs_review' ? 'Flagged Review' : 'Reported',
              note
            },
            ...r.auditHistory
          ]
        };
        return updatedResource;
      }
      return r;
    });

    if (!updatedResource) throw new Error(`Resource ${id} not found`);
    setStoredResources(newList);
    return updatedResource;
  },

  /**
   * Admin: Get all community reports
   */
  async getReports(): Promise<ReportItem[]> {
    return getStoredReports();
  },

  /**
   * Admin: Resolve a community report and update associated resource
   */
  async resolveReport(reportId: string, resolutionNotes: string = 'Verified and resolved by admin.'): Promise<boolean> {
    const reports = getStoredReports();
    const targetReport = reports.find(r => r.id === reportId);
    if (!targetReport) return false;

    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const updatedReports = reports.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'resolved' as const,
          resolvedAt: today,
          resolutionNotes
        };
      }
      return r;
    });
    setStoredReports(updatedReports);

    // If resource was marked 'reported', mark it back to 'verified' with audit log
    const resources = getStoredResources();
    const updatedResources = resources.map(r => {
      if (r.id === targetReport.resourceId) {
        return {
          ...r,
          verificationStatus: 'verified' as VerificationStatus,
          verificationNotes: `Report resolved: ${resolutionNotes}`,
          lastUpdated: today,
          auditHistory: [
            {
              id: `aud-${Date.now()}`,
              date: today,
              actor: 'Admin' as const,
              action: 'Report Resolved',
              note: `Resolved user report regarding ${targetReport.reasonLabel}. ${resolutionNotes}`
            },
            ...r.auditHistory
          ]
        };
      }
      return r;
    });
    setStoredResources(updatedResources);

    return true;
  },

  /**
   * Admin: Compute aggregate dashboard metrics
   */
  async getAdminStats(): Promise<AdminStats> {
    const resources = getStoredResources();
    const reports = getStoredReports();

    return {
      totalResources: resources.length,
      verifiedResources: resources.filter(r => r.verificationStatus === 'verified').length,
      needsReviewResources: resources.filter(r => r.verificationStatus === 'needs_review').length,
      reportedResources: resources.filter(r => r.verificationStatus === 'reported').length,
      syntheticCount: resources.filter(r => r.isSynthetic).length,
      openReportsCount: reports.filter(r => r.status === 'pending').length
    };
  },

  /**
   * Reset local storage state to clean defaults (useful for testing)
   */
  async resetToDefaults(): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify([]));
    window.dispatchEvent(new Event('recovery_connect_resources_updated'));
    window.dispatchEvent(new Event('recovery_connect_reports_updated'));
    window.dispatchEvent(new Event('recovery_connect_saved_updated'));
  }
};
