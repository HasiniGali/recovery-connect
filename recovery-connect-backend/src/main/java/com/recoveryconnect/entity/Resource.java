package com.recoveryconnect.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "resource_languages",
        joinColumns = @JoinColumn(name = "resource_id"),
        inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private Set<Language> languages = new HashSet<>();

    @Column(length = 50)
    private String phone;

    @Column(length = 500)
    private String website;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(nullable = false, length = 100)
    private String cost = "Free";

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @Column(length = 255)
    private String availability;

    @Column(columnDefinition = "TEXT")
    private String accessibility;

    @Column(name = "source_url", length = 500)
    private String sourceUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 50)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Column(name = "verification_date")
    private LocalDateTime verificationDate;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "is_synthetic", nullable = false)
    private Boolean isSynthetic = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Resource() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.lastUpdated = LocalDateTime.now();
        if (this.verificationStatus == null) this.verificationStatus = VerificationStatus.PENDING;
        if (this.isActive == null) this.isActive = true;
        if (this.isSynthetic == null) this.isSynthetic = true;
        if (this.cost == null) this.cost = "Free";
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Set<Language> getLanguages() { return languages; }
    public void setLanguages(Set<Language> languages) { this.languages = languages; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public String getCost() { return cost; }
    public void setCost(String cost) { this.cost = cost; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getAccessibility() { return accessibility; }
    public void setAccessibility(String accessibility) { this.accessibility = accessibility; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public LocalDateTime getVerificationDate() { return verificationDate; }
    public void setVerificationDate(LocalDateTime verificationDate) { this.verificationDate = verificationDate; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsSynthetic() { return isSynthetic; }
    public void setIsSynthetic(Boolean isSynthetic) { this.isSynthetic = isSynthetic; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String name;
        private String description;
        private Category category;
        private Set<Language> languages = new HashSet<>();
        private String phone;
        private String website;
        private String address;
        private String city;
        private String state;
        private String postalCode;
        private BigDecimal latitude;
        private BigDecimal longitude;
        private String cost = "Free";
        private String eligibility;
        private String availability;
        private String accessibility;
        private String sourceUrl;
        private VerificationStatus verificationStatus = VerificationStatus.PENDING;
        private LocalDateTime verificationDate;
        private LocalDateTime lastUpdated = LocalDateTime.now();
        private Boolean isActive = true;
        private Boolean isSynthetic = true;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder category(Category category) { this.category = category; return this; }
        public Builder languages(Set<Language> languages) { this.languages = languages; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder website(String website) { this.website = website; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder postalCode(String postalCode) { this.postalCode = postalCode; return this; }
        public Builder latitude(BigDecimal latitude) { this.latitude = latitude; return this; }
        public Builder longitude(BigDecimal longitude) { this.longitude = longitude; return this; }
        public Builder cost(String cost) { this.cost = cost; return this; }
        public Builder eligibility(String eligibility) { this.eligibility = eligibility; return this; }
        public Builder availability(String availability) { this.availability = availability; return this; }
        public Builder accessibility(String accessibility) { this.accessibility = accessibility; return this; }
        public Builder sourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; return this; }
        public Builder verificationStatus(VerificationStatus status) { this.verificationStatus = status; return this; }
        public Builder verificationDate(LocalDateTime date) { this.verificationDate = date; return this; }
        public Builder lastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; return this; }
        public Builder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public Builder isSynthetic(Boolean isSynthetic) { this.isSynthetic = isSynthetic; return this; }

        public Resource build() {
            Resource r = new Resource();
            r.setId(id);
            r.setName(name);
            r.setDescription(description);
            r.setCategory(category);
            r.setLanguages(languages != null ? languages : new HashSet<>());
            r.setPhone(phone);
            r.setWebsite(website);
            r.setAddress(address);
            r.setCity(city);
            r.setState(state);
            r.setPostalCode(postalCode);
            r.setLatitude(latitude);
            r.setLongitude(longitude);
            r.setCost(cost != null ? cost : "Free");
            r.setEligibility(eligibility);
            r.setAvailability(availability);
            r.setAccessibility(accessibility);
            r.setSourceUrl(sourceUrl);
            r.setVerificationStatus(verificationStatus != null ? verificationStatus : VerificationStatus.PENDING);
            r.setVerificationDate(verificationDate);
            r.setLastUpdated(lastUpdated != null ? lastUpdated : LocalDateTime.now());
            r.setIsActive(isActive != null ? isActive : true);
            r.setIsSynthetic(isSynthetic != null ? isSynthetic : true);
            return r;
        }
    }
}
