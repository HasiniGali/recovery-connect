package com.recoveryconnect.dto;

import java.util.List;
import java.util.Map;

public class AdminAnalyticsResponse {
    private long totalResources;
    private long activeResources;
    private long verifiedResources;
    private long pendingResources;
    private long underReviewResources;
    private long needsUpdateResources;
    private long openReports;
    private List<Map<String, Object>> byCategory;
    private List<Map<String, Object>> byCity;
    private List<Map<String, Object>> byLanguage;
    private List<Map<String, Object>> byVerificationStatus;
    private List<Map<String, Object>> byReportReason;

    public AdminAnalyticsResponse() {}

    public long getTotalResources() { return totalResources; }
    public void setTotalResources(long totalResources) { this.totalResources = totalResources; }

    public long getActiveResources() { return activeResources; }
    public void setActiveResources(long activeResources) { this.activeResources = activeResources; }

    public long getVerifiedResources() { return verifiedResources; }
    public void setVerifiedResources(long verifiedResources) { this.verifiedResources = verifiedResources; }

    public long getPendingResources() { return pendingResources; }
    public void setPendingResources(long pendingResources) { this.pendingResources = pendingResources; }

    public long getUnderReviewResources() { return underReviewResources; }
    public void setUnderReviewResources(long underReviewResources) { this.underReviewResources = underReviewResources; }

    public long getNeedsUpdateResources() { return needsUpdateResources; }
    public void setNeedsUpdateResources(long needsUpdateResources) { this.needsUpdateResources = needsUpdateResources; }

    public long getOpenReports() { return openReports; }
    public void setOpenReports(long openReports) { this.openReports = openReports; }

    public List<Map<String, Object>> getByCategory() { return byCategory; }
    public void setByCategory(List<Map<String, Object>> byCategory) { this.byCategory = byCategory; }

    public List<Map<String, Object>> getByCity() { return byCity; }
    public void setByCity(List<Map<String, Object>> byCity) { this.byCity = byCity; }

    public List<Map<String, Object>> getByLanguage() { return byLanguage; }
    public void setByLanguage(List<Map<String, Object>> byLanguage) { this.byLanguage = byLanguage; }

    public List<Map<String, Object>> getByVerificationStatus() { return byVerificationStatus; }
    public void setByVerificationStatus(List<Map<String, Object>> byVerificationStatus) { this.byVerificationStatus = byVerificationStatus; }

    public List<Map<String, Object>> getByReportReason() { return byReportReason; }
    public void setByReportReason(List<Map<String, Object>> byReportReason) { this.byReportReason = byReportReason; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private AdminAnalyticsResponse res = new AdminAnalyticsResponse();

        public Builder totalResources(long val) { res.setTotalResources(val); return this; }
        public Builder activeResources(long val) { res.setActiveResources(val); return this; }
        public Builder verifiedResources(long val) { res.setVerifiedResources(val); return this; }
        public Builder pendingResources(long val) { res.setPendingResources(val); return this; }
        public Builder underReviewResources(long val) { res.setUnderReviewResources(val); return this; }
        public Builder needsUpdateResources(long val) { res.setNeedsUpdateResources(val); return this; }
        public Builder openReports(long val) { res.setOpenReports(val); return this; }
        public Builder byCategory(List<Map<String, Object>> val) { res.setByCategory(val); return this; }
        public Builder byCity(List<Map<String, Object>> val) { res.setByCity(val); return this; }
        public Builder byLanguage(List<Map<String, Object>> val) { res.setByLanguage(val); return this; }
        public Builder byVerificationStatus(List<Map<String, Object>> val) { res.setByVerificationStatus(val); return this; }
        public Builder byReportReason(List<Map<String, Object>> val) { res.setByReportReason(val); return this; }

        public AdminAnalyticsResponse build() { return res; }
    }
}
