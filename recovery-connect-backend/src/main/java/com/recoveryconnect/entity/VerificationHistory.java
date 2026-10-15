package com.recoveryconnect.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_history")
public class VerificationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private VerificationStatus status;

    @Column(length = 255)
    private String source;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    private User verifiedBy;

    @Column(name = "verified_at", nullable = false, updatable = false)
    private LocalDateTime verifiedAt;

    public VerificationHistory() {}

    public VerificationHistory(Long id, Resource resource, VerificationStatus status, String source, String notes, User verifiedBy, LocalDateTime verifiedAt) {
        this.id = id;
        this.resource = resource;
        this.status = status;
        this.source = source;
        this.notes = notes;
        this.verifiedBy = verifiedBy;
        this.verifiedAt = verifiedAt != null ? verifiedAt : LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.verifiedAt == null) {
            this.verifiedAt = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Resource getResource() { return resource; }
    public void setResource(Resource resource) { this.resource = resource; }

    public VerificationStatus getStatus() { return status; }
    public void setStatus(VerificationStatus status) { this.status = status; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public User getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(User verifiedBy) { this.verifiedBy = verifiedBy; }

    public LocalDateTime getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Resource resource;
        private VerificationStatus status;
        private String source;
        private String notes;
        private User verifiedBy;
        private LocalDateTime verifiedAt = LocalDateTime.now();

        public Builder id(Long id) { this.id = id; return this; }
        public Builder resource(Resource resource) { this.resource = resource; return this; }
        public Builder status(VerificationStatus status) { this.status = status; return this; }
        public Builder source(String source) { this.source = source; return this; }
        public Builder notes(String notes) { this.notes = notes; return this; }
        public Builder verifiedBy(User verifiedBy) { this.verifiedBy = verifiedBy; return this; }
        public Builder verifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; return this; }

        public VerificationHistory build() {
            return new VerificationHistory(id, resource, status, source, notes, verifiedBy, verifiedAt);
        }
    }
}
