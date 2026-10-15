package com.recoveryconnect.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.recoveryconnect.entity.VerificationStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResourceResponseDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Long categoryId;
    private List<String> languages;
    private String phone;
    private String website;
    private String address;
    private String city;
    private String state;
    private String postalCode;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String cost;
    private String eligibility;
    private String availability;
    private String accessibility;
    private String sourceUrl;
    private VerificationStatus verificationStatus;
    private LocalDateTime verificationDate;
    private LocalDateTime lastUpdated;
    private Boolean isActive;
    private Boolean isSynthetic;
    private Double distanceKm;

    public ResourceResponseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }

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

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private ResourceResponseDto dto = new ResourceResponseDto();

        public Builder id(Long id) { dto.setId(id); return this; }
        public Builder name(String name) { dto.setName(name); return this; }
        public Builder description(String description) { dto.setDescription(description); return this; }
        public Builder category(String category) { dto.setCategory(category); return this; }
        public Builder categoryId(Long categoryId) { dto.setCategoryId(categoryId); return this; }
        public Builder languages(List<String> languages) { dto.setLanguages(languages); return this; }
        public Builder phone(String phone) { dto.setPhone(phone); return this; }
        public Builder website(String website) { dto.setWebsite(website); return this; }
        public Builder address(String address) { dto.setAddress(address); return this; }
        public Builder city(String city) { dto.setCity(city); return this; }
        public Builder state(String state) { dto.setState(state); return this; }
        public Builder postalCode(String postalCode) { dto.setPostalCode(postalCode); return this; }
        public Builder latitude(BigDecimal latitude) { dto.setLatitude(latitude); return this; }
        public Builder longitude(BigDecimal longitude) { dto.setLongitude(longitude); return this; }
        public Builder cost(String cost) { dto.setCost(cost); return this; }
        public Builder eligibility(String eligibility) { dto.setEligibility(eligibility); return this; }
        public Builder availability(String availability) { dto.setAvailability(availability); return this; }
        public Builder accessibility(String accessibility) { dto.setAccessibility(accessibility); return this; }
        public Builder sourceUrl(String sourceUrl) { dto.setSourceUrl(sourceUrl); return this; }
        public Builder verificationStatus(VerificationStatus status) { dto.setVerificationStatus(status); return this; }
        public Builder verificationDate(LocalDateTime date) { dto.setVerificationDate(date); return this; }
        public Builder lastUpdated(LocalDateTime date) { dto.setLastUpdated(date); return this; }
        public Builder isActive(Boolean isActive) { dto.setIsActive(isActive); return this; }
        public Builder isSynthetic(Boolean isSynthetic) { dto.setIsSynthetic(isSynthetic); return this; }
        public Builder distanceKm(Double distanceKm) { dto.setDistanceKm(distanceKm); return this; }

        public ResourceResponseDto build() { return dto; }
    }
}
