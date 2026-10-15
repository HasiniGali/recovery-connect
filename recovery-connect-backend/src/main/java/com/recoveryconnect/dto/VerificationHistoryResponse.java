package com.recoveryconnect.dto;

import com.recoveryconnect.entity.VerificationStatus;
import java.time.LocalDateTime;

public class VerificationHistoryResponse {
    private Long id;
    private Long resourceId;
    private String resourceName;
    private VerificationStatus status;
    private String source;
    private String notes;
    private String verifiedBy;
    private LocalDateTime verifiedAt;

    public VerificationHistoryResponse() {}

    public VerificationHistoryResponse(Long id, Long resourceId, String resourceName, VerificationStatus status, String source, String notes, String verifiedBy, LocalDateTime verifiedAt) {
        this.id = id;
        this.resourceId = resourceId;
        this.resourceName = resourceName;
        this.status = status;
        this.source = source;
        this.notes = notes;
        this.verifiedBy = verifiedBy;
        this.verifiedAt = verifiedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getResourceId() { return resourceId; }
    public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

    public String getResourceName() { return resourceName; }
    public void setResourceName(String resourceName) { this.resourceName = resourceName; }

    public VerificationStatus getStatus() { return status; }
    public void setStatus(VerificationStatus status) { this.status = status; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(String verifiedBy) { this.verifiedBy = verifiedBy; }

    public LocalDateTime getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private VerificationHistoryResponse res = new VerificationHistoryResponse();
        public Builder id(Long id) { res.setId(id); return this; }
        public Builder resourceId(Long id) { res.setResourceId(id); return this; }
        public Builder resourceName(String n) { res.setResourceName(n); return this; }
        public Builder status(VerificationStatus s) { res.setStatus(s); return this; }
        public Builder source(String s) { res.setSource(s); return this; }
        public Builder notes(String n) { res.setNotes(n); return this; }
        public Builder verifiedBy(String b) { res.setVerifiedBy(b); return this; }
        public Builder verifiedAt(LocalDateTime d) { res.setVerifiedAt(d); return this; }
        public VerificationHistoryResponse build() { return res; }
    }
}
