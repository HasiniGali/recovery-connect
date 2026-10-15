package com.recoveryconnect.dto;

import com.recoveryconnect.entity.ReportReason;
import com.recoveryconnect.entity.ReportStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ReportDto {

    public static class Create {
        @NotNull(message = "Resource ID is required")
        private Long resourceId;

        @NotNull(message = "Report reason is required")
        private ReportReason reason;

        private String description;

        public Create() {}

        public Long getResourceId() { return resourceId; }
        public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

        public ReportReason getReason() { return reason; }
        public void setReason(ReportReason reason) { this.reason = reason; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Create c = new Create();
            public Builder resourceId(Long id) { c.setResourceId(id); return this; }
            public Builder reason(ReportReason r) { c.setReason(r); return this; }
            public Builder description(String d) { c.setDescription(d); return this; }
            public Create build() { return c; }
        }
    }

    public static class Resolve {
        @NotNull(message = "Report status is required (RESOLVED or REJECTED)")
        private ReportStatus status;

        @NotBlank(message = "Resolution notes are required")
        private String resolutionNotes;

        public Resolve() {}

        public ReportStatus getStatus() { return status; }
        public void setStatus(ReportStatus status) { this.status = status; }

        public String getResolutionNotes() { return resolutionNotes; }
        public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Resolve r = new Resolve();
            public Builder status(ReportStatus status) { r.setStatus(status); return this; }
            public Builder resolutionNotes(String notes) { r.setResolutionNotes(notes); return this; }
            public Resolve build() { return r; }
        }
    }

    public static class Response {
        private Long id;
        private Long resourceId;
        private String resourceName;
        private ReportReason reason;
        private String description;
        private ReportStatus status;
        private LocalDateTime createdAt;
        private LocalDateTime resolvedAt;
        private String resolvedBy;
        private String resolutionNotes;

        public Response() {}

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public Long getResourceId() { return resourceId; }
        public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

        public String getResourceName() { return resourceName; }
        public void setResourceName(String resourceName) { this.resourceName = resourceName; }

        public ReportReason getReason() { return reason; }
        public void setReason(ReportReason reason) { this.reason = reason; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public ReportStatus getStatus() { return status; }
        public void setStatus(ReportStatus status) { this.status = status; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public LocalDateTime getResolvedAt() { return resolvedAt; }
        public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

        public String getResolvedBy() { return resolvedBy; }
        public void setResolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; }

        public String getResolutionNotes() { return resolutionNotes; }
        public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Response res = new Response();
            public Builder id(Long id) { res.setId(id); return this; }
            public Builder resourceId(Long id) { res.setResourceId(id); return this; }
            public Builder resourceName(String n) { res.setResourceName(n); return this; }
            public Builder reason(ReportReason r) { res.setReason(r); return this; }
            public Builder description(String d) { res.setDescription(d); return this; }
            public Builder status(ReportStatus s) { res.setStatus(s); return this; }
            public Builder createdAt(LocalDateTime d) { res.setCreatedAt(d); return this; }
            public Builder resolvedAt(LocalDateTime d) { res.setResolvedAt(d); return this; }
            public Builder resolvedBy(String b) { res.setResolvedBy(b); return this; }
            public Builder resolutionNotes(String n) { res.setResolutionNotes(n); return this; }
            public Response build() { return res; }
        }
    }
}
